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
            type: 'user',
        };
    };
}

export type TUserInfo = {
    name: string;
    email: string;
    type: TUserType;
};

export type TUserType = 'admin' | 'contributor' | 'user' | 'unknown';

export default UserApi;
