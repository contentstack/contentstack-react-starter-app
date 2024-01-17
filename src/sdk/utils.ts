import { Config, Region, LivePreview, Stack } from "contentstack";
const {
  REACT_APP_CONTENTSTACK_API_KEY,
  REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
  REACT_APP_CONTENTSTACK_ENVIRONMENT,
  REACT_APP_CONTENTSTACK_BRANCH,
  REACT_APP_CONTENTSTACK_REGION,
  REACT_APP_CONTENTSTACK_PREVIEW_TOKEN,
  REACT_APP_CONTENTSTACK_APP_HOST,
  REACT_APP_CONTENTSTACK_LIVE_PREVIEW,
  REACT_APP_CONTENTSTACK_PREVIEW_HOST
} = process.env;

// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!REACT_APP_CONTENTSTACK_API_KEY &&
    !!REACT_APP_CONTENTSTACK_DELIVERY_TOKEN &&
    !!REACT_APP_CONTENTSTACK_ENVIRONMENT
  );
};
// Live preview config validation
export const isLpConfigValid = () => {
  return (
    !!REACT_APP_CONTENTSTACK_LIVE_PREVIEW &&
    !!REACT_APP_CONTENTSTACK_PREVIEW_TOKEN &&
    !!REACT_APP_CONTENTSTACK_PREVIEW_HOST &&
    !!REACT_APP_CONTENTSTACK_APP_HOST
  );
};
// set region
const setRegion = (): Region => {
  let region = "US" as keyof typeof Region;
  if (!!REACT_APP_CONTENTSTACK_REGION && REACT_APP_CONTENTSTACK_REGION !== "us") {
    region = REACT_APP_CONTENTSTACK_REGION.toLocaleUpperCase().replace(
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
    preview_token: REACT_APP_CONTENTSTACK_PREVIEW_TOKEN as string,
    enable: REACT_APP_CONTENTSTACK_LIVE_PREVIEW as string === "true",
    host: REACT_APP_CONTENTSTACK_PREVIEW_HOST as string,
  } as LivePreview;
};
// contentstack sdk initialization
export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error("Please set you .env file before running starter app");
  const stackConfig: Config = {
    api_key: REACT_APP_CONTENTSTACK_API_KEY as string,
    delivery_token: REACT_APP_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: REACT_APP_CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: REACT_APP_CONTENTSTACK_BRANCH || "main",
  };
  if (REACT_APP_CONTENTSTACK_LIVE_PREVIEW === "true") {
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
