import { APIGetUser, APISignIn } from "../models/Auth";
import { useAPI } from "./api"
import { APIGetPermissions } from "../models/Permission";
import { APIGetGroup, APIGetGroups } from "../models/Group";
import { APIGetEmployee, APIGetEmployees } from "../models/Employee";
import { APIGetTask, APIGetTasks } from "../models/Task";

// Authentication
const signIn = async ({ email, password }: { email: string, password: string }) => {
    const response = await useAPI<APISignIn>('auth/signin', 'POST', { email, password }, false);
    return response;
}

const getUser = async () => {
    const response = await useAPI<APIGetUser>('auth/user');
    return response;
}


// Groups / Permissions
const getPermissions = async () => {
    const response = await useAPI<APIGetPermissions>('companies/permissions');
    return response;
}

const getGroups = async () => {
    const response = await useAPI<APIGetGroups>('companies/groups');
    return response;
}

const getAnGroup = async (id: number) => {
    const response = await useAPI<APIGetGroup>(`companies/groups/${id}`);
    return response;
}

const addGroup = async ({ name, permissions }: { name: string, permissions: string }) => {
    const response = await useAPI('companies/groups', 'POST', { name, permissions });
    return response;
}

const editGroup = async (id: number, { name, permissions }: { name?: string, permissions?: string }) => {
    const response = await useAPI(`companies/groups/${id}`, 'PUT', { name, permissions });
    return response;
}

const deleteGroup = async (id: number) => {
    const response = await useAPI(`companies/groups/${id}`, 'DELETE');
    return response;
}

// Employees
const getEmployees = async (with_owner=false) => {
    const response = await useAPI<APIGetEmployees>('companies/employees', 'GET', { with_owner });
    return response;
}


const getAnEmployee = async (id: number) => {
    const response = await useAPI<APIGetEmployee>(`companies/employees/${id}`);
    return response;
}

const addEmployee = async ({ name, email, password, group_id }: { name: string, email: string, password: string, group_id:number }) => {
    const response = await useAPI('companies/employees', 'POST', { name, email, password, group_id });
    return response;
}

const editEmployee = async (id: number, { name, email, group_id }: { name?: string, email?: string, group_id: number }) => {
    const response = await useAPI(`companies/employees/${id}`, 'PUT', { name, email, group_id });
    return response;
}

const deleteEmployee = async (id: number) => {
    const response = await useAPI(`companies/employees/${id}`, 'DELETE');
    return response;
}

// Tasks
const getTasks = async () => {
    const response = await useAPI<APIGetTasks>('companies/tasks');
    return response;
}
const getTasksCreated = async () => {
    const response = await useAPI<APIGetTasks>('companies/tasks/created');
    return response;
}

const getAnTask = async (id: number) => {
    const response = await useAPI<APIGetTask>(`companies/tasks/${id}`);
    return response;
}

const addTask = async(
    { title, description, due_date, employee_id, status_id }: { title: string, description?: string, due_date?: string, employee_id: number, status_id: number }
) => {
    const response = await useAPI<APIGetTask>('companies/tasks', 'POST', { title, description, due_date, employee_id, status_id });
    return response;
}

const editTask = async (
    id: number,
    { title, description, due_date, employee_id, status_id }: { title?: string, description?: string, due_date?: string, employee_id?: number, status_id?: number }
) => {
    const response = await useAPI<APIGetTask>(`companies/tasks/${id}`, 'PUT', { title, description, due_date, employee_id, status_id });
    return response;
}

const deleteTask = async (id: number) => {
    const response = await useAPI(`companies/tasks/${id}`, 'DELETE');
    return response;
}


// Exporting all requests
export const useRequests = () => ({
    // Auth
    signIn,
    getUser,

    // Groups/ Permissions
    getPermissions,
    getGroups,
    getAnGroup,
    addGroup,
    editGroup,
    deleteGroup,

    // Employees
    getEmployees,
    getAnEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee,

    // Tasks
    getTasks,
    getTasksCreated,
    getAnTask,
    addTask,
    editTask,
    deleteTask
});