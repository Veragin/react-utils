import { BaseApi } from './BaseApi';
export class PayUApi extends BaseApi {
    constructor() {
        super('https://sizefire.eu/editor/v1');
    }

    async createPayment(setId: number, email: string): Promise<string> {
        const ip = await this.getIp();

        const data = {
            setId,
            customerIp: ip,
            buyerInfo: {
                email,
            },
        };

        const res = await this.send('POST', '/payments', JSON.stringify(data));
        return JSON.parse(res).redirectUrl;
    }

    async createPaymentSandbox(setId: number, email: string): Promise<string> {
        const ip = await this.getIp();

        const data = {
            setId,
            customerIp: ip,
            buyerInfo: {
                email,
            },
        };

        const res = await this.send('POST', '/payments/sandbox', JSON.stringify(data));
        return JSON.parse(res).redirectUrl;
    }

    private getIp = async (): Promise<string> => {
        const res = await fetch('https://api.ipify.org?format=json');
        return (await res.json()).ip;
    };
}
