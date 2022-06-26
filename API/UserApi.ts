import BaseApi from './BaseApi';
import { TLanguage } from 'react-utils/LanguageStore';
import { TUserRole } from 'react-utils/Const/User';

class UserApi extends BaseApi {
    constructor() {
        super('https://resaizer.eu/user/v1/');
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

    loginUser = async (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://resaizer.eu/user/login', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.withCredentials = true;

            xhr.onloadend = () => {
                if (Math.floor(xhr.status / 100) !== 2) {
                    reject(xhr.response);
                } else {
                    const authToken = xhr.getResponseHeader('x-auth-token');
                    if (authToken) {
                        // save autToken to localStorage
                        localStorage.setItem('token', authToken);
                        resolve(true);
                    } else {
                        reject('No auth token found in headers.');
                    }
                }
            };

            xhr.send(JSON.stringify({ username: email, password }));
        });
    };
}

export type TUserInfo = {
    accountId: number;
    accountDetails: TAccountDetails;
    billingInfo: TBillingInfo;
    contributorInfo: TContributorInfo | null;
    researchDetails: null;
};

export type TAccountDetails = {
    name: string | null;
    email: string;
    roles: TUserRole[];
    image: string | null;
    language: TLanguage;

    profession: string;
};

export type TBillingInfo = {
    subscriptionPlan: TSubscriptionPlan;
    billilngFrequency: TBillilngFrequency;
    paymentState: TPaymentState;
    expirationDate: number;
};

export type TContributorInfo = {
    bankNumber: number;
};

export type TSubscriptionPlan = 'free' | 'vip';
export type TBillilngFrequency = 'monthly' | 'yearly';
export type TPaymentState = 'waitingForPayment' | 'paid';

export type TUserPassword = {
    newPassword: string;
    oldPassword: string;
};

export default UserApi;
