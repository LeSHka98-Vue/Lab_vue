module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: 0,
    'comma-dangle': 0,
    quotes: 'warn',
    'max-classes-per-file': 0,
    'linebreak-style': 0,
    'class-methods-use-this': 0,
    'no-trailing-spaces': 0,
    'lines-between-class-members': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-param-reassign': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
