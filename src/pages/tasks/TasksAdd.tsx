
import React, { useState } from "react";
import Loading from "../../components/Loading";
import SelectedEmployees from "../../components/SelectedEmployee";
import SelectedStatus from "../../components/SelectedStatus";
import { useRequests } from "../../utils/requests";
import { useNavigate } from "react-router";
import DateUtils from "../../utils/date";
import ErrorMessage from "../../components/ErrorMessage";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";

export default function TaskAdd(){
    var [loading, setLoading] = useState(false);
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    var { addTask } = useRequests();

    const handleAddTask = async (e:React.FormEvent) =>{
        e.preventDefault();

        let title = document.querySelector("#title") as HTMLInputElement;
        let description = document.querySelector("#description") as HTMLInputElement;
        let due_date = document.querySelector("#due_date") as HTMLInputElement;
        let employee_id = document.querySelector("#employee") as HTMLInputElement;
        let status_id = document.querySelector("#status") as HTMLInputElement;

        setLoading(true);
        let response = await addTask({title: title.value, description: description.value, due_date: DateUtils.formatDateToAPI(due_date.value), employee_id: parseInt(employee_id.value), status_id: parseInt(status_id.value)});
        setLoading(false);

        if(response.data){
            navigate("/tasks/created");
        }else if(response.detail){
            setErrorMessage(response.detail);
        }

    }

    return(
        
        <PermissionMiddleware codename="add_task">
            <div className="card">
                <h3>Tarefas</h3>
                <p>Lista de tarefas, edite ou delete um tarefa:</p>
            </div>
            
            <form className="card relative" onSubmit={(e)=>handleAddTask(e)}>
                { loading && <Loading/>}

                <ErrorMessage message={errorMessage} />

                <fieldset className="text">
                    <label>Título:</label>
                    <input type="text" name="title" id="title" required />
                </fieldset>

                <fieldset className="text">
                    <label>Descrição:</label>
                    <input type="text" name="description" id="description" />
                </fieldset>

                <fieldset className="text">
                    <label>Data de validade:</label>
                    <input type="datetime-local" name="due_date" id="due_date" />
                </fieldset>

                <fieldset className="text">
                    <label>Status da Tarefa:</label>
                    <SelectedStatus nameField="status" />
                </fieldset>

                <fieldset className="text">
                    <label>Responsável pela tarefa:</label>
                    <SelectedEmployees nameField="employee" />
                </fieldset>
                
                <p><button type="submit">Adicionar</button></p>
            </form>
        </PermissionMiddleware>
        
    );
}