export type TUser = {
    id: number;
    name: string;
    role: TUserRole;
    token: string | null;
    imageUrl?: string;
};

export type TUserRole = "ADMIN" | "CONTRIBUTOR" | "USER" | "VISITOR";
