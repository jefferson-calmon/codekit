export function transform<Result>(
    value: string,
    transformer: (value: string) => Result,
) {
    return transformer(value.toString());
}
