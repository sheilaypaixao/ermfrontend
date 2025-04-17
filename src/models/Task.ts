import { Employee } from "./Employee";

export type TaskStatus = {
    id:number;
    name: string;
    codename: string;
}

export type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    created_at: string;
    status: TaskStatus;
    employee: Employee,
    creator_employee: Employee;
}

export type TaskDetail = Task & {
    
}

export type APIGetTasks = {
    tasks: Task[]
}

export type APIGetTask = {
    task: TaskDetail
}