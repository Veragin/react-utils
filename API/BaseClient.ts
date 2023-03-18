import { HttpError, paramToUrl, TClientSendParam, TGetParams } from './agentUtils';

export class BaseClient {
    sendPOSTUrlEncoded = (url: string, data?: TGetParams, headers?: Record<string, string>) => {
        return this.realSend({
            method: 'POST',
            url: this.createAddress(url),
            data: paramToUrl(data),
            contentType: 'application/x-www-form-urlencoded',
            headers,
        });
    };

    sendPOSTJson = (url: string, data?: any, headers?: Record<string, string>) => {
        return this.realSend({
            method: 'POST',
            url: this.createAddress(url),
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers,
        });
    };

    sendGet = (url: string, data?: TGetParams, headers?: Record<string, string>) => {
        return this.realSend({
            method: 'GET',
            url: this.createAddress(url, data),
            headers,
        });
    };

    async send({ url, ...rest }: TClientSendParam): Promise<any> {
        return this.realSend({
            ...rest,
            url: this.createAddress(url),
        });
    }

    private async realSend({ method, url, contentType, responseType, headers, data }: TClientSendParam): Promise<any> {
        return await new Promise((resolve: (res: any) => void, reject: (httpError: HttpError) => void) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            if (headers) {
                Object.keys(headers).forEach((h) => xhr.setRequestHeader(h, headers[h]));
            }
            if (contentType) xhr.setRequestHeader('Content-Type', contentType);
            if (responseType) xhr.responseType = responseType;

            xhr.onloadend = function () {
                if (Math.floor(this.status / 100) !== 2) {
                    reject(new HttpError(this.status, this.response));
                } else resolve(this.response);
            };

            xhr.send(data);
        });
    }

    createAddress(url: string, paramsGet: TGetParams = {}): string {
        if (Object.keys(paramsGet).length === 0) return url;

        const params = paramToUrl(paramsGet);
        return `${url}?${params}`;
    }
}
