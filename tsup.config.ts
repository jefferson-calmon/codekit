import { Options } from 'tsup';

export const tsup: Options = {
    target: 'esnext',
    clean: true,
    dts: true,
    entry: ['lib/index.ts', 'lib/crypto.ts'],
    keepNames: true,
    minify: true,
    sourcemap: true,
    format: ['cjs'],
    external: ['react', 'react-dom', 'crypto-js'],
};
