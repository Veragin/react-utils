import { TUser } from '../Const/User';
import { createSafeContext } from '../basic/createSafeContext';
import { useEffect, useState } from 'react';
import UserApi from '../API/UserApi';

export const [userContext, useUser] = createSafeContext<TUser>('user');

type Props = {
    children: React.ReactNode;
};

export const UserWrapper = ({ children }: Props) => {
    const [user, setUser] = useState<null | TUser>(null);

    useEffect(() => {
        const load = async () => {
            setUser(await loadUser());
        };

        window.updateUser = load;
        load();
    }, [setUser]);

    if (user === null) return null;

    return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

const loadUser = async (): Promise<TUser> => {
    const token = localStorage.getItem('token');

    if (!token) return visitorUser;

    try {
        const api = new UserApi();
        const info = await api.getUserInfo();

        return {
            id: info.accountId,
            name: info.accountDetails.name ?? '',
            roles: info.accountDetails.roles,
            token,
            imageUrl: info.accountDetails.image,
        };
    } catch {
        return visitorUser;
    }
};

const visitorUser: TUser = {
    id: 0,
    name: 'Visitor',
    roles: ['VISITOR'],
    token: '',
    imageUrl: '',
};
