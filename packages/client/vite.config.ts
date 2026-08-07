/// <reference types="vitest"/>
import path from "path";
import { defineConfig, loadEnv, type ServerOptions } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

type TMode = "development" | "production" | "testing";
interface AppEnv {
  VITE_ENV: TMode;
  CLIENT_PORT: string;
  VITE_SENTRY_DSN: string;
  SENTRY_AUTH_TOKEN: string;
}

const validateEnv = (mode: TMode, env: AppEnv) => {
  const requiredVars: (keyof AppEnv)[] = [
    "CLIENT_PORT",
    "VITE_ENV",
    "VITE_SENTRY_DSN",
    "SENTRY_AUTH_TOKEN"
  ];

  for (const key of requiredVars) {
    //skip checking sentry dsn if not in production
    if (
      (key === "VITE_SENTRY_DSN" || key === "SENTRY_AUTH_TOKEN") &&
      mode !== "production"
    )
      continue;

    if (!env[key]) {
      throw new Error(
        `${key} is missing! Please define it in your .env.${mode}`
      );
    }
  }
};

const normalizePort = (port: string) => {
  const normalizedPort = parseInt(port);
  if (isNaN(normalizedPort)) {
    throw new Error(`Invalid port value : ${port}`);
  }

  return normalizedPort;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envMode = mode as TMode;

  // Load env file based on the current mode
  const env = loadEnv(envMode, process.cwd(), "") as unknown as AppEnv;

  validateEnv(envMode, env);
  const port = normalizePort(env.CLIENT_PORT);

  const config: ServerOptions = {
    port,
    open: true
  };

  return {
    plugins: [
      react(),
      tailwindcss(),
      env.VITE_ENV === "production" &&
        sentryVitePlugin({
          org: "convergence-2i",
          project: "react-node-starter-client",
          authToken: env.SENTRY_AUTH_TOKEN,
          sourcemaps: {
            filesToDeleteAfterUpload: "dist/assets/**/*.map"
          }
        })
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/__tests__/setupTests.ts",
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      coverage: {
        reporter: ["json", "html"],
        include: ["src/**/*.ts", "src/**/*.tsx"],
        exclude: [
          "coverage",
          "dist",
          "build",
          "src/__tests__/setupTests.ts",
          "src/**/*.{test,spec}.{ts,tsx}"
        ],
        thresholds: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@shared": path.resolve(__dirname, "./src/shared")
      }
    },
    server: config,
    preview: config,
    build: {
      minify: true,
      sourcemap: env.VITE_ENV === "production",
      rollupOptions: {
        external: [/.*\.(test|spec)\.(ts|tsx)$/],
        treeShake: true
      }
    }
  };
});
