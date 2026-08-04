import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

type TMode = "development" | "production" | "testing";

interface AppEnv {
  NEXT_PUBLIC_ENV: TMode;
  NEXT_PUBLIC_SENTRY_DSN?: string;
  SENTRY_AUTH_TOKEN?: string;
}

const validateEnv = (env: Record<string, string | undefined>): AppEnv => {
  const requiredVars: (keyof AppEnv)[] = ["NEXT_PUBLIC_ENV"];

  for (const key of requiredVars) {
    if (!env[key]) {
      throw new Error(`❌ Missing required environment variable: ${key}`);
    }
  }

  return {
    NEXT_PUBLIC_ENV: env.NEXT_PUBLIC_ENV as TMode,
    NEXT_PUBLIC_SENTRY_DSN: env.NEXT_PUBLIC_SENTRY_DSN,
    SENTRY_AUTH_TOKEN: env.SENTRY_AUTH_TOKEN
  };
};

// Validate environment variables on startup / build
validateEnv(process.env);

const nextConfig: NextConfig = {
  reactStrictMode: true
  /* other Next.js config options here */
};

// Sentry configuration options
const sentryOptions = {
  org: "example-org",
  project: "example-project",

  // Pass Sentry Auth Token from environment variables for sourcemap uploads
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Suppress Sentry build logs unless running in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces
  widenClientFileUpload: true,

  // Automatically annotate React components to show in Sentry breadcrumbs
  webpack: {
    reactComponentAnnotation: {
      enabled: true
    }
  },

  // Hides source maps from visitors in production browser bundles
  sourcemaps: {
    deleteSourcemapsAfterUpload: true
  }
};

export default withSentryConfig(nextConfig, sentryOptions);
