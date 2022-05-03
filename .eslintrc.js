module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    indent: [2, 4],
    'no-empty-function': [0],
    'import/prefer-default-export': [0],
    'import/no-unresolved': [0],
    'no-useless-constructor': [0],
    'import/extensions': [0]
  },
};
