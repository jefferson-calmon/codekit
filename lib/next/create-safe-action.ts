import {
    InferInput,
    InferOutput,
    StandardSchemaIssue,
    StandardSchemaV1,
} from './_standard-schema';

export class SafeActionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SafeActionError';
    }
}

export type SafeActionResult<TData> =
    | { success: true; data: TData; error?: undefined; fieldErrors?: undefined }
    | {
          success: false;
          data?: undefined;
          error: string;
          fieldErrors: Record<string, string[]>;
      };

export type SafeAction<TSchema extends StandardSchemaV1, TData> = (
    input: InferInput<TSchema>,
) => Promise<SafeActionResult<TData>>;

const UNEXPECTED_ERROR = 'Something went wrong. Please try again.';

const isNextControlFlow = (error: unknown): boolean => {
    if (typeof error !== 'object' || error === null || !('digest' in error)) {
        return false;
    }

    const { digest } = error as { digest?: unknown };

    return typeof digest === 'string' && digest.startsWith('NEXT_');
};

const toFieldErrors = (
    issues: readonly StandardSchemaIssue[],
): Record<string, string[]> => {
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of issues) {
        const path = (issue.path ?? [])
            .map((segment) =>
                typeof segment === 'object'
                    ? String(segment.key)
                    : String(segment),
            )
            .join('.');

        const field = path || '_root';

        fieldErrors[field] = [...(fieldErrors[field] ?? []), issue.message];
    }

    return fieldErrors;
};

export function createSafeAction<TSchema extends StandardSchemaV1, TData>(
    schema: TSchema,
    handler: (input: InferOutput<TSchema>) => Promise<TData>,
): SafeAction<TSchema, TData> {
    return async (input) => {
        const validation = await schema['~standard'].validate(input);

        if (validation.issues) {
            return {
                success: false,
                error: 'Validation failed.',
                fieldErrors: toFieldErrors(validation.issues),
            };
        }

        try {
            const data = await handler(validation.value);

            return { success: true, data };
        } catch (thrown) {
            if (isNextControlFlow(thrown)) throw thrown;

            if (thrown instanceof SafeActionError) {
                return { success: false, error: thrown.message, fieldErrors: {} };
            }

            return { success: false, error: UNEXPECTED_ERROR, fieldErrors: {} };
        }
    };
}
