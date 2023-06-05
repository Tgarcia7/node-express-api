module.exports = {
  env: {
    'mocha': true,
    'node': true
  },
  parserOptions: {
    'ecmaVersion': 2022,
    'sourceType': 'module'
  },
  rules: {
    'arrow-spacing': ['warn', { before: true, after: true }],
    'comma-spacing': ['warn', { before: false, after: true }],
    'eol-last': ['warn', 'always'],
    'eqeqeq': ['error'],
    'func-call-spacing': ['warn', 'never'],
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
    'no-console': ['warn', { 'allow': ['warn', 'error', 'info'] }],
    'no-mixed-spaces-and-tabs': 'warn',
    'no-multi-spaces': ['warn', { ignoreEOLComments: false }],
    'no-multiple-empty-lines': ['warn', { 'max': 1 }],
    'no-tabs': 'warn',
    'no-unused-vars': ['error', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_', 'caughtErrorsIgnorePattern': '^_'
    }],
    'object-curly-spacing': ['warn', 'always'],
    'prefer-const': ['error'],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'never'],
    'space-before-blocks': ['warn', 'always'],
    // 'space-before-function-paren': ['warn', 'never'],
    'spaced-comment': ['warn', 'always'],
    'strict': ['error', 'global']
  }
}
