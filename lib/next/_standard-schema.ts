export interface StandardSchemaV1<Input = unknown, Output = Input> {
    readonly '~standard': StandardSchemaProps<Input, Output>;
}

export interface StandardSchemaProps<Input, Output> {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (
        value: unknown,
    ) => StandardSchemaResult<Output> | Promise<StandardSchemaResult<Output>>;
    readonly types?: { readonly input: Input; readonly output: Output };
}

export type StandardSchemaResult<Output> =
    | { readonly value: Output; readonly issues?: undefined }
    | { readonly value?: undefined; readonly issues: readonly StandardSchemaIssue[] };

export interface StandardSchemaIssue {
    readonly message: string;
    readonly path?: readonly (PropertyKey | { readonly key: PropertyKey })[];
}

export type InferInput<T extends StandardSchemaV1> = NonNullable<
    T['~standard']['types']
>['input'];

export type InferOutput<T extends StandardSchemaV1> = NonNullable<
    T['~standard']['types']
>['output'];
