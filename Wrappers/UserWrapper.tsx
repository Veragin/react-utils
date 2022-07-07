import { TUser } from "../Const/User";
import { createSafeContext } from "../basic/createSafeContext";
import { useEffect, useState } from "react";

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

const loadUser = (): TUser => {
    const token = localStorage.getItem("token");

    return {
        id: Math.random(),
        name: "Visitor",
        role: "VISITOR",
        token,
        imageUrl: undefined,
    };
};
