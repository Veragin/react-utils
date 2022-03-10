import { parseErrorResponse } from './Errors';

class BaseApi {
    constructor(public baseUrl: string) {}

    send(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        url: string,
        data?: any,
        contentType?: string,
        responseType?: XMLHttpRequestResponseType
    ): Promise<any> {
        const realUrl = method !== 'GET' ? url : `${url}?${this.paramToUrl(data)}`;
        const realData = method !== 'GET' ? data : undefined;

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, this.baseUrl + realUrl, true);

            if (contentType) xhr.setRequestHeader('Content-Type', contentType);
            if (responseType) xhr.responseType = responseType;

            const token = localStorage.getItem('token');
            if (token) xhr.setRequestHeader('x-auth-token', token);

            xhr.onloadend = () => {
                if (Math.floor(xhr.status / 100) !== 2) {
                    reject(parseErrorResponse(xhr.response));
                } else {
                    resolve(xhr.response);
                }
            };

            xhr.send(realData);
        });
    }

    /**
     * A method that converts object parametrs into url string as &name=value.
     *
     * Example:
     *
     * paramToUrl( { name1: value1, name2: value2, name3: value3 } )
     *
     * return "name1=value1&name2=value2&name3=value3"
     */
    protected paramToUrl(params?: Record<string, string | number | undefined>): string {
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
    }

    /**
     * A method that converts array into url string as value,.
     *
     * Example:
     *
     * arrayToUrl( [value1, value2, value3] )
     *
     * return "value1,value2,value3"
     */
    protected arrayToUrl(arr: string | string[]): string {
        if (Array.isArray(arr)) return arr.join(',');
        return arr;
    }
}

export default BaseApi;
