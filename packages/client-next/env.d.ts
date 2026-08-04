declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server-Side Variables
      CLIENT_PORT?: string;
      SENTRY_AUTH_TOKEN?: string;

      // Client-Side Variables
      NEXT_PUBLIC_ENV: "development" | "production" | "testing";
      NEXT_PUBLIC_SENTRY_DSN?: string;
    }
  }
}

export {};
