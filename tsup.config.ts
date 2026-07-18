import { readFile, writeFile } from 'fs/promises';
import { Options } from 'tsup';

const CLIENT_ENTRIES = ['next'];

const preserveUseClientDirective = async () => {
    const files = CLIENT_ENTRIES.flatMap((entry) => [
        `dist/${entry}.js`,
        `dist/${entry}.mjs`,
    ]);

    await Promise.all(
        files.map(async (file) => {
            const content = await readFile(file, 'utf8');

            if (/^['"]use client['"]/.test(content)) return;

            await writeFile(file, `'use client';\n${content}`);
        }),
    );
};

export const tsup: Options = {
    target: 'esnext',
    clean: true,
    dts: true,
    entry: {
        index: 'lib/index.ts',
        format: 'lib/format/index.ts',
        is: 'lib/validations/index.ts',
        text: 'lib/text/index.ts',
        number: 'lib/number/index.ts',
        date: 'lib/date/index.ts',
        array: 'lib/array/index.ts',
        object: 'lib/object/index.ts',
        color: 'lib/color/index.ts',
        file: 'lib/file/index.ts',
        async: 'lib/async/index.ts',
        random: 'lib/random/index.ts',
        browser: 'lib/browser/index.ts',
        crypto: 'lib/crypto/index.ts',
        react: 'lib/react/index.ts',
        next: 'lib/next/index.ts',
        'next-server': 'lib/next/server.ts',
        extend: 'lib/extend/index.ts',
        edge: 'lib/edge.ts',
    },
    keepNames: true,
    minify: true,
    sourcemap: true,
    format: ['esm', 'cjs'],
    external: ['react', 'react-dom', 'crypto-js', 'next'],
    onSuccess: preserveUseClientDirective,
};
