import BaseApi from './BaseApi';
import { TSubscriptionPlan, TUserInfo } from './UserApi';

class AdminApi extends BaseApi {
    constructor() {
        super('https://resaizer.eu/');
    }

    clearCache = async () => {
        await this.send('GET', `editor/v1/admin/cache/clearAll`);
    };

    getUserList = async (): Promise<TUserShortInfo> => {
        const res = await this.send('GET', `user/v1/admin/users`);
        return JSON.parse(res);
    };

    deleteUser = async (userId: number): Promise<void> => {
        await this.send('DELETE', `user/v1/admin/users/${userId}`);
    };

    getUserInfo = async (userId: number): Promise<TUserInfo> => {
        const res = await this.send('GET', `user/v1/admin/users/${userId}`);
        return JSON.parse(res);
    };

    setUserInfo = async (userId: number, info: TUserInfo): Promise<void> => {
        await this.send('PUT', `user/v1/admin/users/${userId}`, info);
    };

    approveDraft = async (setId: number) => {
        await this.send('PUT', `sets/confirm/${setId}`);
    };

    returnDraft = async (setId: number, msg: string) => {
        await this.send('PUT', `sets/confirm/${setId}`, msg);
    };

    deleteSet = async (setId: number) => {
        await this.send('DELETE', `sets/${setId}`);
    };
}

export type TUserShortInfo = {
    image: string;
    username: string;
    email: string;
    subscriptionPlan: TSubscriptionPlan;
    expirationDate: number;
    templatesUsed: number;
    publicUsed: number;
    privateExported: number;
};

export default AdminApi;
