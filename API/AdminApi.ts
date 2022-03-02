import BaseApi from './BaseApi';

class AdminApi extends BaseApi {
    constructor() {
        super('https://resaizer.eu/editor/v1/admin/');
    }

    clearCache = async () => {
        await this.send('GET', `cache/clearAll`);
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

export default AdminApi;
