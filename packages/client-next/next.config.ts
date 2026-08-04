import type { NextConfig } from "next";

type TMode = "development" | "production" | "testing";

interface AppEnv {
  NEXT_PUBLIC_ENV: TMode;
  NEXT_PUBLIC_SENTRY_DSN?: string;
}

const validateEnv = (env: Record<string, string | undefined>): AppEnv => {
  const requiredVars: (keyof AppEnv)[] = ["NEXT_PUBLIC_ENV"];

  for (const key of requiredVars) {
    if (!env[key]) {
      throw new Error(
        `❌ Missing required environment variable: ${key}`
      );
    }
  }

  return {
    NEXT_PUBLIC_ENV: env.NEXT_PUBLIC_ENV as TMode,
    NEXT_PUBLIC_SENTRY_DSN: env.NEXT_PUBLIC_SENTRY_DSN,
  };
};

// Validate environment variables on startup / build
validateEnv(process.env);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* other Next.js config options here */
};

export default nextConfig;