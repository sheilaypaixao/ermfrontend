import React, { useEffect, useRef, useState } from "react";
import { useRequests } from "../utils/requests";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { Task, TaskStatus } from "../models/Task";
import DateUtils from "../utils/date";
import { APIGetTasks } from "../models/Task";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "../utils/auth";
import TasksList from "./TasksList";
import PaginationBlock from "./utils/PaginationsBlock";

type Props ={
    handleGet: (option:object)=> Promise<{ data?: APIGetTasks | null | undefined; detail: string | null; }>
}

export default function TasksTable({handleGet}: Props){
    var [loading, setLoading] = useState(true);
    var [errorMessage, setErrorMessage] = useState('');

    let date = new Date();
    var [dateEnd, setDateEnd] = useState(date.toLocaleDateString("en-CA"));

    date.setDate(date.getDate() - 30);
    var [dateStart, setDateStart] = useState(date.toLocaleDateString("en-CA"));

    var [lstTasks, setLstTasks] = useState<Task[]>([]);
    var [lstTaskStatus, setLstTaskStatus] = useState<TaskStatus[]>([]);
    var {deleteTask, getTasktatus} = useRequests();
    var lstTasksConst = useRef<Task[]>([]);
    var refInputStatus = useRef<HTMLSelectElement>(null);
    var navigate = useNavigate();
    var refPagBlock = useRef(null);

    const handleGetTasks = async (date_start?:string, date_end?:string)=>{
        //console.log(date_start, date_end);

        date_start = date_start || dateStart;
        date_end = date_end || dateEnd;

        let response = await handleGet({date_start:date_start, date_end: date_end});

        if(response.data){
            lstTasksConst.current = response.data?.tasks;
            setLstTasks(response.data?.tasks);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }

        refInputStatus.current!.value = "0";
        setLoading(false);
    }

    const handleGetTaskStatus = async ()=>{
        let response = await getTasktatus();

        if(response.data){
            setLstTaskStatus(response.data?.status);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
    }

    useEffect(()=>{
        handleGetTasks();
        handleGetTaskStatus();
    },[])

    const handleDeleteTask = async (id:number)=> {
        setLoading(true);
        await deleteTask(id);

        handleGetTasks();
    }

    function handleEditTask(id:number){
        navigate(`/tasks/${id}`);
    }


    /* Filtros */

    function handleFilterStatus(e:React.ChangeEvent){
        let target = e.target as HTMLSelectElement;

        setLstTasks( lstTasksConst.current.filter((task)=> task.status.id == Number(target.value) || Number(target.value) == 0) );
    }

    function handleChangeDateStart(e:React.ChangeEvent){
        let inputDate = e.target as HTMLInputElement;
        setDateStart(inputDate.value);

        setLoading(true);
        handleGetTasks(inputDate.value, dateEnd);
    }

    function handleChangeDateEnd(e:React.ChangeEvent){
        let inputDate = e.target as HTMLInputElement;

        setDateEnd(inputDate.value);

        setLoading(true);
        handleGetTasks(dateStart, inputDate.value);
    }

    return(
        <>
            <div className="relative">

                {loading && <Loading/>}

                <ErrorMessage message={errorMessage} />

                <section className="card">
                    <h3>Filtros</h3>

                    <div className="grid grid-cols-2">
                        <div>
                            <p>Data de criação:</p>
                            <label>Início: </label><input value={dateStart} type="date" onChange={(e)=> handleChangeDateStart(e)} />
                            <label className="pl-5">Fim: </label><input value={dateEnd} type="date" onChange={(e)=> handleChangeDateEnd(e)} />    
                        </div>

                        <div>
                            <p>Status: </p>
                            <select ref={refInputStatus} onChange={(e)=>handleFilterStatus(e)}>
                                <option value="0">Todos</option>
                            {lstTaskStatus && lstTaskStatus!.map((status)=> (
                                <option key={status.id} value={status.id}>{status.name}</option>
                            ))}
                            </select>
                        </div>
                    </div>
                </section>

                
                <PaginationBlock<Task> ref={refPagBlock} list={lstTasks} numberPages={3} numberItens={5}>
                                                    
                    <TasksList handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask}/>

                </PaginationBlock>

            </div>
        </>
    );
}