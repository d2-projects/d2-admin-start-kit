module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
