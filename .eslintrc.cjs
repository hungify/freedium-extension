require('@so1ve/prettier-config')

const inProductionEnv = process.env.NODE_ENV === 'production'
const rulesSeverityOff = inProductionEnv ? 'warn' : 'off'

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: '@so1ve',
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@so1ve/function-style': 'off',

    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    '@typescript-eslint/no-explicit-any': rulesSeverityOff,
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^(_|Cypress)' },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^(_|Cypress)' },
    ],
    'no-console': rulesSeverityOff,
    'no-debugger': rulesSeverityOff,
    'no-unused-expressions': 'off',
    'quote-props': ['error', 'as-needed'],
    // Delegates import sorting order to import-sort plugin
    'import/order': 'off',
    // Delegates curly brace spacing to prettier
    'object-curly-spacing': 'off',

    'vue/first-attribute-linebreak': 'off',
    'vue/html-closing-bracket-newline': 'off',
  },
}
