# codekit

[![npm](https://img.shields.io/npm/v/codekit.svg)](https://www.npmjs.com/package/codekit)
[![bundle size](https://img.shields.io/bundlephobia/min/codekit)](https://bundlephobia.com/package/codekit)
[![downloads](https://img.shields.io/npm/dm/codekit.svg)](https://www.npmjs.com/package/codekit)
[![license](https://img.shields.io/github/license/jefferson-calmon/codekit.svg)](LICENSE)

Toolkit TypeScript para o dia a dia: formatters, validators, hooks React e helpers para Next.js. Tipagem forte, tree-shakeable, defaults pt-BR.

**[Documentação →](https://codekit-b671b654.mintlify.site/)**

## Instalação

```bash
pnpm add codekit
```

## Uso

```ts
import { format, is } from 'codekit';

format.cpf('12345678909');       // '123.456.789-09'
format.currency(1500);           // 'R$ 1.500,00'
format.relativeTime(date);       // 'há 3 minutos'
format.cpf(null);                // 'N/A' (null-safe por padrão)

is.email('dev@example.com');     // true
is.cpf('123.456.789-09');        // true
```

```tsx
import { useDebounce, useControlledState } from 'codekit/react';
import { useServerAction } from 'codekit/next';
import { createSafeAction } from 'codekit/next/server';
```

## Módulos

| Import | Conteúdo |
| --- | --- |
| `codekit` | `format`, `is`, `async`, `random`, `browser`, `file` + namespaces `array`, `date`, `number`, `object`, `text`, `color` |
| `codekit/format` | 23 formatters (`cpf`, `currency`, `relativeTime`, `count`...) |
| `codekit/is` | Validators (`email`, `cpf`, `phone`, `createIs`...) |
| `codekit/react` | 24 hooks client-side |
| `codekit/next` | Hooks para App Router (`useServerAction`, `useHydrated`...) |
| `codekit/next/server` | `createSafeAction` com Standard Schema (zod, valibot, arktype) |
| `codekit/crypto` | `aes`, `hashify`, `Password` |
| `codekit/extend` | Extensões de prototype (opt-in) |

ESM + CJS, `sideEffects: false`. React, Next e crypto-js são peer dependencies opcionais: o core roda em Node, browser e edge sem nenhuma delas.

## Licença

[MIT](LICENSE) © [Jefferson Calmon](https://jeffersoncalmon.dev)
