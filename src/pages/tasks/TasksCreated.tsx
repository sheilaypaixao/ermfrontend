import TasksTable from "../../components/TasksTable";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";
import { useRequests } from "../../utils/requests";

export default function TasksCreated(){
    var { getTasksCreated } = useRequests();

    return(
        <>
            <PermissionMiddleware codename="view_task">
                <div className="card">
                    <h3>Tarefas</h3>
                    <p>Lista de tarefas, edite ou delete uma tarefa:</p>
                </div>

                <TasksTable handleGet={async ()=>{return await getTasksCreated()}}/>
            </PermissionMiddleware>

        </>
    );
}