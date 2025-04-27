import { Task } from "../models/Task";
import { useAuth } from "../utils/auth";
import DateUtils from "../utils/date";

type Props = {
    lstRender?:Task[],
    handleDeleteTask:(id:number)=>void,
    handleEditTask:(id:number)=>void,
}

export default function TasksList({lstRender, handleDeleteTask, handleEditTask}:Props){
    const {handlePermissionExist} = useAuth();

    return(
        <>
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

                {lstRender!.map((task)=> (
                
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
        </>
    );
}