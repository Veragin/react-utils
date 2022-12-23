import { TBannerSetInfo, TBannerSetType } from "react-utils/Const/BannerSet";
import { BaseApi } from "./BaseApi";
import { TSubscriptionPlan, TUserInfo } from "./UserApi";

export class AdminApi extends BaseApi {
    constructor() {
        super("https://sizefire.eu/");
    }

    getUserList = async (): Promise<TUserShortInfo> => {
        const res = await this.send("GET", `user/v1/admin/users`);
        return JSON.parse(res);
    };

    deleteUser = async (userId: number): Promise<void> => {
        await this.send("DELETE", `user/v1/admin/users/${userId}`);
    };

    getUserInfo = async (userId: number): Promise<TUserInfo> => {
        const res = await this.send("GET", `user/v1/admin/users/${userId}`);
        return JSON.parse(res);
    };

    setUserInfo = async (userId: number, info: TUserInfo): Promise<void> => {
        await this.send("PUT", `user/v1/admin/users/${userId}`, info);
    };

    approveDraft = async (setId: number) => {
        await this.send("PUT", `sets/confirm/${setId}`);
    };

    returnDraft = async (setId: number, msg: string) => {
        await this.send("PUT", `sets/confirm/${setId}`, msg);
    };

    deleteSet = async (setId: number) => {
        await this.send("DELETE", `editor/v1/admin/sets/${setId}`);
    };

    clearCache = async () => {
        await this.send("GET", `editor/v1/admin/cache/clearAll`);
    };

    getSetsOverview = async (page: number): Promise<TSetInfo[]> => {
        const res = await this.send("GET", `editor/v1/admin/sets`, { page });
        return JSON.parse(res);
    };

    getSetsCount = async (type?: TBannerSetType): Promise<number> => {
        const res = await this.send("GET", `editor/v1/admin/sets/count`, { type });
        return JSON.parse(res).count;
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

export type TSetInfo = TBannerSetInfo & {
    userId: number;
    visible: boolean;
};
