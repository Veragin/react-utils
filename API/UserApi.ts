import { BaseApi } from './BaseApi';
import { TUserInfo } from 'react-utils/Const/User';

export class UserApi extends BaseApi {
    constructor() {
        super('https://sizefire.eu/user/v1/');
    }

    getUserInfo = async (): Promise<TUserInfo> => {
        const res = await this.send('GET', 'users');
        return JSON.parse(res);
    };

    setUserInfo = async (info: TUserInfo): Promise<void> => {
        const res = await this.send('PUT', 'users', info);
        return JSON.parse(res);
    };

    deleteUser = async (): Promise<void> => {
        await this.send('DELETE', 'users');
    };

    changePassword = async (pass: TUserPassword): Promise<void> => {
        await this.send('PATCH', 'users/password', pass);
    };

    loginUser = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://sizefire.eu/user/login', true);
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

    resetPassword = async (email: string): Promise<void> => {
        await this.send('PATCH', 'users/resetPassword', { email });
    };
}

export type TUserPassword = {
    newPassword: string;
    oldPassword: string;
};
