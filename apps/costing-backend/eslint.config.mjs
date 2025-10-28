import { FlatCompat } from '@eslint/eslintrc';
import nxEslintPlugin from '@nx/eslint-plugin';

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.config({ extends: ['plugin:@nx/typescript'] }),
  ...nxEslintPlugin({
    projectRoot: __dirname,
    tsConfigPath: './tsconfig.json',
  }),
];
