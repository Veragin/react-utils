import { TUser } from "../Const/User";
import { createSafeContext } from "../basic/createSafeContext";
import UserApi from "../API/UserApi";
import { useQuery } from "react-query";

export const [userContext, useUser] = createSafeContext<TUser>("user");

type Props = {
    children: React.ReactNode;
};

export const UserWrapper = ({ children }: Props) => {
    const { isLoading, refetch, data: user } = useQuery<TUser>("loadUser", updateUser);

    window.updateUser = async () => {
        refetch();
    };

    if (isLoading) return null;

    return <userContext.Provider value={user ?? visitorUser}>{children}</userContext.Provider>;
};

const updateUser = async (): Promise<TUser> => {
    const user = await loadUser();
    currentUser.user = user;
    return user;
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
