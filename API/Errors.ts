export const parseErrorResponse = (response: string) => {
    const data = JSON.parse(response);

    if (data.error === 'Unauthorized') {
        throw new UnauthorizedError(data.path);
    }

    throw new StatusError(data.status, data.path, data.message);
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
