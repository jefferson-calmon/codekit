export type IsEqual<T1, T2> =
  T1 extends T2
    ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
      ? true
      : false
    : false;

export type IsAnyEqual<T1, T2> = T1 extends T2
  ? IsEqual<T1, T2> extends true
    ? true
    : never
  : never;

export type IsArray<T> = T extends any[] ? true : false;
export type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;
