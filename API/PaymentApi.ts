import { getDownloadTokenFromLocalStorage } from 'react-utils/downloadToken';
import { BaseApi } from './BaseApi';
export class PaymentApi extends BaseApi {
    constructor() {
        super('https://sizefire.eu/editor/v1');
    }

    async createPayment(setId: number): Promise<TPaymentOrder> {
        const data = {
            setId,
            language: 'EN',
            currency: 'USD',
        };

        const res = await this.send('POST', '/payments/create', JSON.stringify(data), 'application/json');
        return JSON.parse(res);
    }

    async checkPayment(setId: number): Promise<TPaymentStatus> {
        const data = {
            token: getDownloadTokenFromLocalStorage(setId),
        };

        const res = await this.send('GET', `/payments/status/${setId}`, JSON.stringify(data));
        return JSON.parse(res);
    }

    private getIp = async (): Promise<string> => {
        const res = await fetch('https://api.ipify.org?format=json');
        return (await res.json()).ip;
    };
}

type TPaymentOrder = {
    redirectUrl: string;
    token: string;
};

type TPaymentStatus = {
    state: TPaymentStatusType;
};

export type TPaymentStatusType =
    | 'CREATED'
    | 'PAID'
    | 'CANCELED'
    | 'PAYMENT_METHOD_CHOSEN'
    | 'TIMEOUTED'
    | 'AUTHORIZED'
    | 'REFUNDED'
    | 'PARTIALLY_REFUNDED';
