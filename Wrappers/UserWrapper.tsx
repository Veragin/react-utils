import { TUser } from "../Const/User";
import { createSafeContext } from "../basic/createSafeContext";
import { useEffect, useState } from "react";
import UserApi from "../API/UserApi";

export const [userContext, useUser] = createSafeContext<TUser>("user");

type Props = {
    children: React.ReactNode;
};

export const UserWrapper = ({ children }: Props) => {
    const [user, setUser] = useState<null | TUser>(null);

    useEffect(() => {
        const load = async () => {
            const user = await loadUser();
            currentUser.user = user;
            setUser(user);
        };

        window.updateUser = load;
        load();
    }, [setUser]);

    if (user === null) return null;

    return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

const loadUser = async (): Promise<TUser> => {
    const token = localStorage.getItem("token");

    if (!token) return visitorUser;

    try {
        const api = new UserApi();
        const info = await api.getUserInfo();

        return {
            id: info.accountId,
            name: info.accountDetails.name ?? "",
            roles: info.accountDetails.roles,
            token,
            imageUrl: info.accountDetails.image,
        };
    } catch {
        return adminUser;
    }
};

const visitorUser: TUser = {
    id: 0,
    name: "Visitor",
    roles: ["VISITOR"],
    token: "",
    imageUrl: "",
};

const adminUser: TUser = {
    id: 1,
    name: "Admin",
    roles: ["ADMIN"],
    token: "",
    imageUrl: "",
};

export const currentUser = { user: visitorUser };
