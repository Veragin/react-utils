import BaseApi from './BaseApi';
import { TLanguage } from 'react-utils/LanguageStore';

class UserApi extends BaseApi {
    constructor() {
        super('https://resaizer.eu/editor/v1/');
    }

    getUserInfo = async (): Promise<TUserInfo> => {
        const res = await this.send('GET', 'users');
        return JSON.parse(res);
    };

    deleteUser = async (): Promise<void> => {
        await this.send('DELETE', 'users');
    };

    changePassword = async (pass: TUserPassword): Promise<void> => {
        await this.send('PATCH', 'users/password', pass);
    };
}

export type TUserInfo = {
    accountDetails: TAccountDetails;
    billingInfo: TBillingInfo;
};

export type TAccountDetails = {
    name: string;
    email: string;
    profession: string;
    userRole: TUserRole;
    image?: string;
    language: TLanguage;
};

export type TBillingInfo = {
    subscriptionType: TSubscriptionType;
    billilngFrequency: TBillilngFrequency;
    paymentState: TPaymentState;
    expire: number;
    accountId: number;
};

export type TUserRole = 'admin' | 'contributor' | 'user' | 'visitor';
export type TSubscriptionType = 'free' | 'vip';
export type TBillilngFrequency = 'monthly' | 'yearly';
export type TPaymentState = 'waitingForPayment' | 'paid';

export type TUserPassword = {
    newPassword: string;
    oldPassword: string;
};

export default UserApi;
