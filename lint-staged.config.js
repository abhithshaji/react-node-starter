const config = {
  // Client specific rules
  "packages/client/**/*.{js,ts,tsx}": [
    "pnpm --filter client lint:eslint-fix",
    "pnpm run format:fix"
  ],
  "packages/client/**/*.css": [
    "pnpm --filter client lint:stylelint-fix",
    "pnpm run format:fix"
  ],

  // Server specific rules
  "packages/server/**/*.{js,ts}": [
    "pnpm --filter server lint:eslint-fix",
    "pnpm run format:fix"
  ],

  // Root and global configurations
  "*.{json,html,yaml,yml,md}": ["pnpm run format:fix"]
};

export default config;
