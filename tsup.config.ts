import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['lib/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist',
    minify: true,
    clean: true,
    target: 'es2020',
    esbuildOptions(options) {
        options.minifyIdentifiers = true;
    },
    external: ['react', 'react-dom', 'crypto-js'],
    env: {
        NODE_ENV: 'production',
    },
});
