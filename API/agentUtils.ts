export type TClientSendParam = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    data?: any;
    contentType?: string;
    headers?: Record<string, string>;
    responseType?: XMLHttpRequestResponseType;
};

export class HttpError extends Error {
    constructor(public status: number, public msg: string) {
        super(msg);
    }
}

export type TGetParams = Record<string, string | number | undefined>;

/**
 * A method that converts object parametrs into url string as &name=value.
 *
 * Example:
 *
 * paramToUrl( { name1: value1, name2: value2, name3: value3 } )
 *
 * return "name1=value1&name2=value2&name3=value3"
 */
export const paramToUrl = (params?: TGetParams) => {
    let output = '';
    if (params) {
        let reducer = (res: string, key: string) => {
            if (params[key] !== undefined) return `${res}${key}=${encodeURIComponent(String(params[key]))}&`;
            return res;
        };
        output = Object.keys(params).reduce(reducer, '');
        output = output.slice(0, output.length - 1);
    }
    return output;
};

/**
 * A method that converts array into url string as value,.
 *
 * Example:
 *
 * arrayToUrl( [value1, value2, value3] )
 *
 * return "value1,value2,value3"
 */
export const arrayToUrl = (arr: string | string[]) => {
    if (Array.isArray(arr)) return arr.join(',');
    return arr;
};
