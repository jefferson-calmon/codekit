export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export type BrowserNativeObject = Date | FileList | File;
export type ArrayKey = number;
export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
export type TypeOf =
  | 'undefined'
  | 'boolean'
  | 'number'
  | 'string'
  | 'object'
  | 'function'
  | 'symbol'
  | 'bigint';
