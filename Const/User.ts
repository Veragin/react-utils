import { createSafeContext } from 'react-utils/basic/createSafeContext';

export type TUser = {
    id: number;
    name: string;
    role: TUserRole;
    token: string | null;
};

export type TUserRole = 'ADMIN' | 'CONTRIBUTOR' | 'USER' | 'VISITOR';

export const [userContext, useUser] = createSafeContext<TUser>('user');

export const loadUser = (): TUser => {
    const token = localStorage.getItem('token');

    return {
        id: Math.random(),
        name: 'Visitor',
        role: 'ADMIN',
        token,
    };
};
