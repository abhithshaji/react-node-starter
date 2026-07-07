const config = {
  // Client specific rules
  "packages/client/**/*.{js,ts,tsx}": [
    "pnpm --filter client lint:eslint-fix",
    "prettier --write"
  ],
  "packages/client/**/*.css": [
    "pnpm --filter client lint:stylelint-fix",
    "prettier --write"
  ],

  // Server specific rules
  "packages/server/**/*.{js,ts}": [
    "pnpm --filter server lint:eslint-fix",
    "prettier --write"
  ],

  // Root and global configurations
  "*.{json,html,yaml,yml,md}": ["prettier --write"]
};

export default config;
