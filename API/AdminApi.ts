import BaseApi from './BaseApi';
import { TBannerSetType } from '../../Service/Soft/Const/BannerSet';

class AdminApi extends BaseApi {
    constructor() {
        super('https://resaizer.eu/editor/v1/admin/');
    }

    getSetsInfo = async (): Promise<TBannerSetInfo[]> => {
        const res = await this.send('GET', 'sets/info');
        return JSON.parse(res);
    };

    getSetsInfoByType = async (type: TBannerSetType): Promise<TBannerSetInfo[]> => {
        const res = await this.send('GET', `sets/info/${type}`);
        return JSON.parse(res);
    };

    getSet = async (setId: number): Promise<TBannerSetExport> => {
        const res = await this.send('GET', `sets/${setId}`);
        return JSON.parse(res);
    };

    approveTemplate = async (setId: number) => {
        await this.send('PUT', `sets/confirm/${setId}`);
    };

    returnTemplate = async (setId: number, msg: string) => {
        await this.send('PUT', `sets/confirm/${setId}`, msg);
    };

    clearCache = async () => {
        await this.send('GET', `cache/clearAll`);
    };
}

export default AdminApi;
