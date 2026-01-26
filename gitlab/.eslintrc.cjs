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
    'no-console': 'error', // Error for console statements (use logger instead)
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
    'import/prefer-default-export': 'off', // Allow named exports
    'import/no-unresolved': 'off', // Imports work fine at runtime with ES modules

    // ---- Style ----
    'arrow-body-style': 'off', // Allow both arrow function styles
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
