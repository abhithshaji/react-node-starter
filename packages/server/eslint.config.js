import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores([
    "dist/**",
    "node_modules/**",
    "build/**",
    "coverage/**",
    "eslint.config.js"
  ]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended", eslintConfigPrettier],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname
      }
    },

    rules: {
      "no-console": "error",
      "no-useless-catch": 0
    }
  },
  tseslint.configs.recommended
]);
