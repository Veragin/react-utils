export const parseErrorResponse = (response: string) => {
    const data = JSON.parse(response);

    if (data.error === 'Unauthorized') {
        return new UnauthorizedError(data.path);
    }

    return new StatusError(data.status, data.path, data.message);
};

export const parseErrorStatus = (status: number) => {
    if (status === 401) return new UnauthorizedError('unknown');

    return new StatusError(status, 'unknown', 'unknown');
};

export class UnauthorizedError extends Error {
    constructor(url: string) {
        super(`Unauthorized Error: ${url}`);
    }
}

export class StatusError extends Error {
    constructor(public status: number, public url: string, public msg: string) {
        super(`StatusError: ${status} ${msg}`);
    }
}
