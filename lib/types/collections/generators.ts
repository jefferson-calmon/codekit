import { IsArray } from "./is";

export type DeepTypeOf<T, K extends string> = K extends `${infer FirstKey}.${infer RestKeys}`
  ? FirstKey extends keyof T
    ? DeepTypeOf<T[FirstKey], RestKeys>
    : never
  : K extends keyof T
    ? T[K]
    : never;

export type GenerateType<T extends string, V> = T extends `${infer FirstKey}.${infer RestKeys}`
  ? { [K in FirstKey]: GenerateType<RestKeys, V> }
  : { [K in T]: V };

export type WithoutArrayProps<T> = {
  [K in keyof T as IsArray<T[K]> extends true ? never : K]: T[K] extends object
    ? WithoutArrayProps<T[K]>
    : T[K];
};
