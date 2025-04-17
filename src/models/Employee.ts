import { Group } from "./Group";

export type Employee = {
    id: number;
    name: string;
    email: string;
}

export type EmployeeDetail = Employee & {
    group: Group
}

export type APIGetEmployees= {
    employees: Employee[]
}

export type APIGetEmployee = {
    employee: EmployeeDetail
}