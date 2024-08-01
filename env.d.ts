declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_ENV: "development" | "stage" | "production";
    readonly NEXT_PUBLIC_BASE_DOMAIN: string;
  }
}
