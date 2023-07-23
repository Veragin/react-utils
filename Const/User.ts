import { TLanguage } from 'react-utils/LanguageStore';

export type TUser = {
    id: number;
    name: string;
    roles: TUserRole[];
    token: string | null;
    imageUrl: string | null;
};

export type TUserShortInfo = {
    id: number;
    image: string | null;
    username: string;
    email: string;
    subscriptionPlan: TSubscriptionPlan;
    expirationDate: number;
    templatesUsed: number;
    publicUsed: number;
    privateExported: number;
    state: TUserState;
};

export type TUserInfo = {
    accountId: number;
    accountDetails: TAccountDetails;
    billingInfo: TBillingInfo | null;
    contributorInfo: TContributorInfo | null;
    researchDetails: TResearchDetails | null;
    lastLogin: string;
};

export type TAccountDetails = {
    name: string | null;
    email: string;
    roles: TUserRole[];
    image: string | null;
    language: TLanguage;
    profession: string;
    state: TUserState;
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

type TResearchDetails = {
    banned: boolean;
};

export type TUserState = 'active' | 'removed' | 'no_mail' | 'banned';
export type TUserRole = 'ADMIN' | 'CONTRIBUTOR' | 'USER' | 'VISITOR';

export type TSubscriptionPlan = 'free' | 'vip';
export type TBillilngFrequency = 'monthly' | 'yearly';
export type TPaymentState = 'waitingForPayment' | 'paid';

export const DEFAULT_USER: TUserInfo = {
    accountDetails: {
        email: 'unknown',
        image: null,
        language: 'EN',
        name: 'unknown',
        profession: 'unkown',
        roles: ['USER'],
        state: 'active',
    },
    accountId: 0,
    billingInfo: {
        subscriptionPlan: 'free',
        billilngFrequency: 'monthly',
        paymentState: 'waitingForPayment',
        expirationDate: 0,
    },
    contributorInfo: null,
    researchDetails: null,
    lastLogin: '0.0.0000',
};
