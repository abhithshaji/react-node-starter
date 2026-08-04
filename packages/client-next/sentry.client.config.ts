import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Enable Sentry only in production
  enabled: process.env.NEXT_PUBLIC_ENV === "production",

  // Adjust trace sampling rates as needed
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while debugging.
  debug: false,
});