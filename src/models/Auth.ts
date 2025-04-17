import { Permission } from "./Permission";

export type User = {
    name: string;
    email: string;
    password: string
}

export type UserEnterpriseDetail = {
    is_owner: boolean;
    permissions: Permission[]
}

export type APIGetUser = {
    user: User
    enterprise: UserEnterpriseDetail
}

export type APISignIn = {
    user: User;
    enterprise: UserEnterpriseDetail;
    refresh: string;
    access: string;
}
