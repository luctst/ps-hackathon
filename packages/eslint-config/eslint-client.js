const config = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@intlify/vue-i18n/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:storybook/recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: {
      js: "espree",
      ts: "@typescript-eslint/parser",
      "<template>": "espree",
    },
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "no-console": "warn",
  },
  ignorePatterns: ["**/*.js", "node_modules", ".turbo", "dist", "coverage"],
  root: true,
  settings: {
    "vue-i18n": {
      localeDir: "../../apps/client/src/assets/translations/*.json",
    },
  },
};

module.exports = config;
