module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-template-shadow': 'off',
    'no-useless-escape': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        mocha: true,
      },
    },
  ],
}
