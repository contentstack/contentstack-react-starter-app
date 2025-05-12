import { Config, Region, LivePreview, Stack } from "contentstack";

// Extract environment variables for easier access and maintenance
export const ENV = {
  API_KEY: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
  DELIVERY_TOKEN: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
  ENVIRONMENT: import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT as string,
  REGION: import.meta.env.VITE_CONTENTSTACK_REGION as string,
  BRANCH: import.meta.env.VITE_CONTENTSTACK_BRANCH as string || "main",
  LIVE_PREVIEW: import.meta.env.VITE_CONTENTSTACK_LIVE_PREVIEW as string,
  PREVIEW_TOKEN: import.meta.env.VITE_CONTENTSTACK_PREVIEW_TOKEN as string,
  PREVIEW_HOST: import.meta.env.VITE_CONTENTSTACK_PREVIEW_HOST as string,
  APP_HOST: import.meta.env.VITE_CONTENTSTACK_APP_HOST as string,
  API_HOST: import.meta.env.VITE_CONTENTSTACK_API_HOST as string,
  LIVE_EDIT_TAGS: import.meta.env.VITE_CONTENTSTACK_LIVE_EDIT_TAGS as string,
};

// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!ENV.API_KEY &&
    !!ENV.DELIVERY_TOKEN &&
    !!ENV.ENVIRONMENT
  );
};

// Live preview config validation
export const isLpConfigValid = () => {
  return (
    !!ENV.LIVE_PREVIEW &&
    !!ENV.PREVIEW_TOKEN &&
    !!ENV.PREVIEW_HOST &&
    !!ENV.APP_HOST
  );
};

// set region
const setRegion = (): Region => {
  let region = "US" as keyof typeof Region;
  if (!!ENV.REGION && ENV.REGION !== "us") {
    region = ENV.REGION.toLocaleUpperCase().replace(
      "-",
      "_"
    ) as keyof typeof Region;
  }
  return Region[region];
};

// set LivePreview config
const setLivePreviewConfig = (): LivePreview => {
  if (!isLpConfigValid())
    throw new Error("Your LP config is set to true. Please make you have set all required LP config in .env");
  return {
    preview_token: ENV.PREVIEW_TOKEN,
    enable: ENV.LIVE_PREVIEW === "true",
    host: ENV.PREVIEW_HOST,
  } as LivePreview;
};

// contentstack sdk initialization
export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error("Please set your .env file before running starter app");
  const stackConfig: Config = {
    api_key: ENV.API_KEY,
    delivery_token: ENV.DELIVERY_TOKEN,
    environment: ENV.ENVIRONMENT,
    region: setRegion(),
    branch: ENV.BRANCH || "main",
  };
  if (ENV.LIVE_PREVIEW === "true") {
    stackConfig.live_preview = setLivePreviewConfig();
  }
  return Stack(stackConfig);
};

// api host url
export const customHostUrl = (baseUrl=''): string => {
  return baseUrl.replace("api", "cdn");
};

// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === "US") {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};

// prod url validation for custom host
export const isValidCustomHostUrl = (url: string): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};
