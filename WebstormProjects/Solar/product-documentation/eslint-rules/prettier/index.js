module.exports = {
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        printWidth: 140,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        trailingComma: 'all',
        endOfLine: 'lf',
        importOrder: ['^rxjs/(.*)$', '^@core/(.*)$', '^@ui-kit/(.*)$', '^shared/(.*)$', '^[./]'],
        importOrderSeparation: true,
      },
    ],
    'lines-around-comment': ['warn', { beforeBlockComment: true, allowBlockStart: true }],
  },
};
