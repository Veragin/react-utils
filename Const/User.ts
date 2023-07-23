import { TUserInfo } from 'react-utils/API/UserApi';

export type TUser = {
    id: number;
    name: string;
    roles: TUserRole[];
    token: string | null;
    imageUrl: string | null;
};

export type TUserRole = 'ADMIN' | 'CONTRIBUTOR' | 'USER' | 'VISITOR';

export const DEFAULT_USER: TUserInfo = {
    accountDetails: {
        email: 'unknown',
        image: null,
        language: 'EN',
        name: 'unknown',
        profession: 'unkown',
        roles: ['USER'],
    },
    accountId: 0,
    billingInfo: null,
    contributorInfo: null,
    researchDetails: null,
    lastLogin: '0.0.0000',
};
