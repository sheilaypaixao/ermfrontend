import { useEffect, useState } from "react";
import { useRequests } from "../utils/requests";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { Task } from "../models/Task";
import DateUtils from "../utils/date";
import { APIGetTasks } from "../models/Task";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "../utils/auth";

type Props ={
    handleGet: ()=> Promise<{ data?: APIGetTasks | null | undefined; detail: string | null; }>
}

export default function TasksTable({handleGet}:Props){
    var [loading, setLoading] = useState(true);
    const {handlePermissionExist} = useAuth();
    var [errorMessage, setErrorMessage] = useState('');
    var [lstTasks, setLstTasks] = useState<Task[]>();
    var {deleteTask} = useRequests();
    var navigate = useNavigate();

    const handleGetEmployees = async ()=>{
        //let response = await getTasks();
        let response = await handleGet();

        if(response.data){
            setLstTasks(response.data?.tasks);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
        setLoading(false);
    }

    useEffect(()=>{
        handleGetEmployees();
    },[])

    const handleDeleteTask = async (id:number)=> {
        setLoading(true);
        await deleteTask(id);

        handleGetEmployees();
    }

    function handleEditTask(id:number){
        navigate(`/tasks/${id}`);
    }

    return(
        <>
            <div className="relative">

                {loading && <Loading/>}

                <ErrorMessage message={errorMessage} />

                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Título</td>
                            <td>Data de criação</td>
                            <td>Data de validade</td>
                            <td>Status</td>
                            <td>Responsável</td>
                            <td>Criador</td>
                            <td>Ações</td>
                        </tr>
                    </thead>

                    <tbody>

                        {lstTasks && lstTasks!.map((task)=> (
                        
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{DateUtils.formatDateToView(task.created_at)}</td>
                                <td>{DateUtils.formatDateToView(task.due_date)}</td>
                                <td>{task.status.name}</td>
                                <td>{task.employee.name}</td>
                                <td>{task.creator_employee.name}</td>
                                <td>
                                    {handlePermissionExist("change_task") && <button className="mr-2" onClick={()=> handleEditTask(task.id)}>Editar</button>}
                                    {handlePermissionExist("delete_task") && <button onClick={()=> handleDeleteTask(task.id)}>Deletar</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}