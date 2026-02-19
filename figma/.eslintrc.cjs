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
    'no-console': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'no-shadow': 'warn',
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
    'class-methods-use-this': 'warn',
    'consistent-return': 'warn',

    // ---- Async / Await ----
    'no-return-await': 'warn',
    'no-await-in-loop': 'warn',

    // ---- Best Practices ----
    'no-param-reassign': 'warn',
    'no-use-before-define': 'warn',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
};
