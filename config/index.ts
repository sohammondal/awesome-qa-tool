export const config = {
  baseDomain: process.env.NEXT_PUBLIC_BASE_DOMAIN,

  env: process.env.NEXT_PUBLIC_ENV,
  isStage: process.env.NEXT_PUBLIC_ENV === "stage",
  isProd: process.env.NEXT_PUBLIC_ENV === "production",
  isDevelopment: process.env.NEXT_PUBLIC_ENV === "development",

  nodeEnv: process.env.NODE_ENV,
};
