module.exports = {
  extends: [
    require.resolve('@mhc/fabric/lib/ts-eslint'),
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    '@typescript-eslint/naming-convention': 0,
    'no-underscore-dangle': 0,
    // '@typescript-eslint/no-unused-vars': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'consistent-return': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-redeclare': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/no-loop-func': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': 0
  },
}
