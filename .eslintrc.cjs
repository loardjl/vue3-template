/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
