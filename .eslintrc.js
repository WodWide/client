module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:vue/recommended",
    "@nuxtjs/eslint-config-typescript",
    "plugin:prettier/recommended",
  ],
  plugins: ["vue", "prettier"],
  rules: {
    "vue/no-v-html": "off",
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
  },
};
