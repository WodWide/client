module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:vue/recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': [
      'error',
      {
        htmlWhitespaceSensitivity: 'ignore',
        semi: true,
        singleQuote: true,
        printWidth: 80,
      },
    ],
  },
};
