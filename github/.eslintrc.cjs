/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true,
    es2022: true,
  },

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier'
  ],

  rules: {
    // ---- Code Quality ----
    'no-console': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'no-shadow': 'off',
    'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],

    // ---- Imports ----
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always'
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',

    // ---- Style ----
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',

    // ---- Async / Await ----
    'no-return-await': 'off',
    'no-await-in-loop': 'off',

    // ---- Best Practices ----
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
};