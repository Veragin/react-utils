import { TUser } from "../Const/User";
import { createSafeContext } from "../basic/createSafeContext";
import { useEffect, useState } from "react";
import UserApi from "../API/UserApi";

export const [userContext, useUser] = createSafeContext<TUser>("user");

type Props = {
    children: React.ReactNode;
};

export const UserWrapper = ({ children }: Props) => {
    const [user, setUser] = useState(loadUser());

    useEffect(() => {
        window.updateUser = () => setUser(loadUser);
    }, [setUser]);

    return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

const loadUser = async (): Promise<TUser> => {
    const token = localStorage.getItem("token");

    const api = new UserApi();
    const info = await api.getUserInfo();

    return {
        id: info.accountId,
        name: info.accountDetails.name ?? "",
        roles: info.accountDetails.roles,
        token,
        imageUrl: info.accountDetails.image,
    };
};
