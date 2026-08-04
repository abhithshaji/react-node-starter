// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setupTests.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["json", "html"],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        "coverage",
        ".next",
        "src/__tests__/setupTests.ts",
        "node_modules",
        "src/**/*.{test,spec}.{ts,tsx}",
        "src/app/layout.tsx" // Optional: exclude root layout
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
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils")
    }
  }
});
