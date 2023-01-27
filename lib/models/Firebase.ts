export type FirebaseErrors = Record<string, string>;

export interface FirebaseError {
    name: string;
    code: keyof FirebaseErrors;
    message: string;
    stack?: string;
}
