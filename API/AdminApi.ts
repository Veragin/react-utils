import { TBannerSetInfo, TBannerSetType } from 'react-utils/Const/BannerSet';
import { BaseApi } from './BaseApi';
import { TSubscriptionPlan, TUserInfo } from './UserApi';
import { TUserRole } from 'react-utils/Const/User';

export class AdminApi extends BaseApi {
    constructor() {
        super('https://sizefire.eu/');
    }

    /************************************************
     ********  User
     ************************************************/

    getUserList = async (page: number, role?: TUserRole): Promise<TUserShortInfo[]> => {
        const res = await this.send('GET', `user/v1/admin/users`, {
            page,
            role: role?.toLowerCase(),
        });
        return JSON.parse(res);
    };

    getUserCount = async (role?: TUserRole): Promise<number> => {
        const res = await this.send('GET', `editor/v1/admin/users/count`, { role });
        return JSON.parse(res).count;
    };

    deleteUser = async (userId: number): Promise<void> => {
        await this.send('DELETE', `user/v1/admin/users/${userId}`);
    };

    banUser = async (userId: number, ban: boolean): Promise<void> => {
        await this.send('PUT', `user/v1/admin/users/${userId}/ban`, { ban });
    };

    getUserInfo = async (userId: number): Promise<TUserInfo> => {
        const res = await this.send('GET', `user/v1/admin/users/${userId}`);
        return JSON.parse(res);
    };

    setUserInfo = async (userId: number, info: TUserInfo): Promise<void> => {
        await this.send('PUT', `user/v1/admin/users/${userId}`, info);
    };

    /************************************************
     ********  Set
     ************************************************/

    approveDraft = async (setId: number) => {
        await this.send('PUT', `sets/confirm/${setId}`);
    };

    returnDraft = async (setId: number, msg: string) => {
        await this.send('PUT', `sets/confirm/${setId}`, msg);
    };

    deleteSet = async (setId: number) => {
        await this.send('DELETE', `editor/v1/admin/sets/${setId}`);
    };

    clearCache = async () => {
        await this.send('GET', `editor/v1/admin/cache/clearAll`);
    };

    getSetsOverview = async (page: number, type?: TBannerSetType): Promise<TSetInfo[]> => {
        const res = await this.send('GET', `editor/v1/admin/sets`, { page, type });
        return JSON.parse(res);
    };

    getSetsCount = async (type?: TBannerSetType): Promise<number> => {
        const res = await this.send('GET', `editor/v1/admin/sets/count`, { type });
        return JSON.parse(res).count;
    };
}

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

type TUserState = 'active' | 'removed' | 'no_mail' | 'banned';

type TSetState =
    | 'private_paid'
    | 'private_not_paid'
    | 'before_review'
    | 'in_review'
    | 'returned'
    | 'template_published'
    | 'template_hidden'
    | 'public_published'
    | 'public_hidden'
    | 'taken_review'
    | 'taken_hidden';

export type TSetInfo = TBannerSetInfo & {
    state?: TSetState;
    userId: number;
    visible: boolean;
};
