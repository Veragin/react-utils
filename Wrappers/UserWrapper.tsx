import { TUser } from "../Const/User";
import { createSafeContext } from "../basic/createSafeContext";
import { UserApi } from "../API/UserApi";
import { useQuery } from "react-query";
import { Spinner } from "react-utils/Components/Spinner";

export const [userContext, useUser] = createSafeContext<TUser>("user");

type Props = {
    children: React.ReactNode;
};

export const UserWrapper = ({ children }: Props) => {
    const { isLoading, refetch, data: user } = useQuery<TUser>("loadUser", updateUser);

    window.updateUser = async () => {
        console.log("global update user");
        refetch();
    };

    if (isLoading) return <Spinner msg={_("Logging in")} />;

    return <userContext.Provider value={user ?? visitorUser}>{children}</userContext.Provider>;
};

let loadUserLock = false;
const updateUser = async (): Promise<TUser> => {
    if (loadUserLock) return currentUser.user;
    loadUserLock = true;

    const user = await loadUser();
    currentUser.user = user;

    loadUserLock = false;
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
    } catch (e) {
        console.error(e);
        return visitorUser;
    }
};

const visitorUser: TUser = {
    id: 0,
    name: "Visitor",
    roles: ["VISITOR"],
    token: "",
    imageUrl: "",
};

export const currentUser = { user: visitorUser };
