import BaseApi from './BaseApi';

class UserApi extends BaseApi {
    constructor() {
        super('https://resaizer.eu/editor/v1/user/');
    }

    getUserInfo = async (): Promise<TUserInfo> => {
        /*const res = await this.send('GET', 'user/info');
        return JSON.parse(res);*/
        return {
            name: 'František Malý',
            email: 'franta@seznam.cz',
            profession: 'uklízečka',
            userType: 'user',
            image: '',
        };
    };

    getBillingInfo = async (): Promise<TBillingInfo> => {
        /*const res = await this.send('GET', 'user/info');
        return JSON.parse(res);*/
        return {
            subscriptionType: 'vip',
            billilngFrequency: 'monthly',
            paymentState: 'waitingForPayment',
            expire: Date.now(),
            accountId: 11111,
        };
    };
}

export type TUserInfo = {
    name: string;
    email: string;
    profession: string;
    userType: TUserType;
    image?: string;
};

export type TBillingInfo = {
    subscriptionType: TSubscriptionType;
    billilngFrequency: TBillilngFrequency;
    paymentState: TPaymentState;
    expire: number;
    accountId: number;
};

export type TUserType = 'admin' | 'contributor' | 'user' | 'visitor';
export type TSubscriptionType = 'free' | 'vip';
export type TBillilngFrequency = 'monthly' | 'yearly';
export type TPaymentState = 'waitingForPayment' | 'paid';

export default UserApi;
