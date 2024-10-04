export interface CreateInstanceProps {
    baseUrl: string;
    onBeforeRequest?: (
        options: RequestInit,
    ) => Promise<Partial<RequestInit>> | RequestInit;
    onResponse?: (
        response: Response,
        refetch: () => Promise<Response>,
    ) => Promise<Response> | Response;
}

type Options = Omit<RequestInit, 'method' | 'body'>;

const url = (...paths: string[]) => paths.join('/').replaceAll('//', '/');
const error = (data: any) => data?.message ?? data.error ?? data.detail;

export function createFetchInstance(props: CreateInstanceProps) {
    async function get<T>(endpoint: string, options?: Options) {
        return await request<T>(endpoint, {
            method: 'GET',
            ...(options ?? {}),
        });
    }

    async function post<T>(endpoint: string, data: any, options?: Options) {
        return await request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...(options ?? {}),
        });
    }

    async function del<T>(endpoint: string, data: any, options?: Options) {
        return await request<T>(endpoint, {
            method: 'DELETE',
            body: JSON.stringify(data),
            ...(options ?? {}),
        });
    }

    async function put<T>(endpoint: string, data: any, options?: Options) {
        return await request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...(options ?? {}),
        });
    }

    async function patch<T>(endpoint: string, data: any, options?: Options) {
        return await request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
            ...(options ?? {}),
        });
    }

    async function request<T>(endpoint: string, options: RequestInit) {
        if (props.onBeforeRequest) {
            options = await props.onBeforeRequest(options);
        }

        let response = await fetch(url(props.baseUrl, endpoint), options);

        if (props.onResponse) {
            response = await props.onResponse(response, () =>
                request(endpoint, options),
            );
        }

        if (!response.ok) throw new Error(error(await response.json()));

        return response.json() as T;
    }

    return { get, post, put, patch, delete: del };
}
