import { Permission } from "./Permission";

export type Group ={
    id: number;
    name: string;
}

export type GroupDetail = Group & {
    permissions: Permission[]
}

export type APIGetGroups = {
    groups: GroupDetail[]
}

export type APIGetGroup = {
    group: GroupDetail
}