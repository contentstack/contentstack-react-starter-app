/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly VITE_CONTENTSTACK_API_KEY: string;
  readonly VITE_CONTENTSTACK_DELIVERY_TOKEN: string;
  readonly VITE_CONTENTSTACK_ENVIRONMENT: string;
  readonly VITE_CONTENTSTACK_BRANCH?: string;
  readonly VITE_CONTENTSTACK_REGION?: string;
  readonly VITE_CONTENTSTACK_PREVIEW_TOKEN?: string;
  readonly VITE_CONTENTSTACK_APP_HOST?: string;
  readonly VITE_CONTENTSTACK_LIVE_PREVIEW?: string;
  readonly VITE_CONTENTSTACK_PREVIEW_HOST?: string;
  readonly VITE_CONTENTSTACK_API_HOST?: string;
  readonly VITE_CONTENTSTACK_LIVE_EDIT_TAGS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
