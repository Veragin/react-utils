export type TUser = {
    id: number;
    name: string;
    roles: TUserRole[];
    token: string | null;
    imageUrl: string | null;
};

export type TUserRole = "ADMIN" | "CONTRIBUTOR" | "USER" | "VISITOR";
