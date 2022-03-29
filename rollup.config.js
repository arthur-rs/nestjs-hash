import alias from '@rollup/plugin-alias'
import typescript from 'rollup-plugin-typescript2'
import { terser } from "rollup-plugin-terser";
import ttypescript from 'ttypescript'

import path from 'path'

import pkg from './package.json'

export default {
  input: './lib/index.ts',
  output: [
    { file: pkg.main, format: 'cjs'},
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    alias({
      entries: [
        { find: '@lib', replacement: path.resolve(__dirname, 'dist') },
      ]
    }),
    typescript({
      tsconfigOverride: { compilerOptions : { module: "es2015" } },
      tsconfig: './tsconfig.build.json',
      typescript: ttypescript
    }),
    terser()
  ],
}