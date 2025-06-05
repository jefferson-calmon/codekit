import { IsAnyEqual, IsTuple } from "./is";
import { ArrayKey, TupleKeys, BrowserNativeObject, Primitive } from "./primitives";

export type DeprecatedKeyOf<
  T,
  Prefix extends string = '',
  Separator extends string = '.',
> = T extends object
  ? {
      [K in keyof T]-?:
        | `${Prefix & string}${K & string}`
        | DeprecatedKeyOf<
            T[K],
            `${Prefix & string}${K & string}${Separator & string}`
          >;
    }[keyof T]
  : '';

type KeyOfImpl<K extends string | number, V, TraversedTypes> =
  V extends Primitive | BrowserNativeObject
    ? `${K}`
    : true extends IsAnyEqual<TraversedTypes, V>
      ? `${K}`
      : `${K}` | `${K}.${KeyOfInternal<V, TraversedTypes | V>}`;

type KeyOfInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: KeyOfImpl<K & string, T[K], TraversedTypes>;
      }[TupleKeys<T>]
    : KeyOfImpl<ArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: KeyOfImpl<K & string, T[K], TraversedTypes>;
    }[keyof T];

/**
 * Type which eagerly collects all paths through a type
 * @example
 * KeyOf<{foo: {bar: string}}> = 'foo' | 'foo.bar'
 */
export type KeyOf<T> = T extends any ? KeyOfInternal<T> : never;
