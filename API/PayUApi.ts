import { BaseApi } from './BaseApi';
export class PayUApi extends BaseApi {
    constructor() {
        super('https://sizefire.eu/editor/v1');
    }

    async createPayment(setId: number): Promise<string> {
        const data = {
            setId,
            language: 'EN',
            currency: 'USD',
        };

        const res = await this.send('POST', '/payments/create', JSON.stringify(data), 'application/json');
        return JSON.parse(res).redirectUrl;
    }

    private getIp = async (): Promise<string> => {
        const res = await fetch('https://api.ipify.org?format=json');
        return (await res.json()).ip;
    };
}
