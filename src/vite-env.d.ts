/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_DEPLOYED_API_URL: string;
  VITE_LOCAL_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
