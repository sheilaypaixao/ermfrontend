
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import SelectedEmployees from "../../components/SelectedEmployee";
import SelectedStatus from "../../components/SelectedStatus";
import { useRequests } from "../../utils/requests";
import { useNavigate, useParams } from "react-router";
import DateUtils from "../../utils/date";
import { Employee } from "../../models/Employee";
import ErrorMessage from "../../components/ErrorMessage";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";

export default function TaskEdit(){
    var [loading, setLoading] = useState(false);
    var [errorMessage, setErrorMessage] = useState('');
    var { getAnTask, editTask } = useRequests();
    var {id_task}:any = useParams();
    var navigate = useNavigate();
    var [titleInput, setTitleInput] = useState("");
    var [descriptionInput, setDescriptionInput] = useState("");
    var [dueDateInput, setDueDateInput] = useState("");
    var [employeeInput, setEmployeeInput] = useState<Employee>();
    var [statusInput, setStatusInput] = useState<number>();
    

    const handleGetAnTask = async ()=> {
        setLoading(true);
        let response = await getAnTask(parseInt(id_task));

        console.log(response, response.data?.task.due_date.slice(0,-4));

        if(response.data){
            setTitleInput(response.data?.task.title);
            setDescriptionInput(response.data?.task.description);
            setDueDateInput(response.data?.task.due_date.slice(0,-4));
            setEmployeeInput(response.data?.task.employee);
            setStatusInput(response.data?.task.status.id);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
        
        setLoading(false);
    }

    useEffect(()=>{
        handleGetAnTask();
    },[]);

    const handleAddTask = async (e:React.FormEvent) =>{
        e.preventDefault();

        let title = document.querySelector("#title") as HTMLInputElement;
        let description = document.querySelector("#description") as HTMLInputElement;
        let due_date = document.querySelector("#due_date") as HTMLInputElement;
        let employee_id = document.querySelector("#employee") as HTMLInputElement;
        let status_id = document.querySelector("#status") as HTMLInputElement;

        setLoading(true);
        let response = await editTask(id_task, {title: title.value, description: description.value, due_date: DateUtils.formatDateToAPI(due_date.value), employee_id: parseInt(employee_id.value), status_id: parseInt(status_id.value)});
        setLoading(false);

        if(response.data){
            navigate("/tasks/created");
        }else if(response.detail){
            setErrorMessage(response.detail);
        }

    }

    return(
        
        <PermissionMiddleware codename="change_task">
            <div className="card">
                <h3>Tarefas</h3>
                <p>Lista de tarefas, edite ou delete um tarefa:</p>
            </div>
            
            <form className="card relative" onSubmit={(e)=>handleAddTask(e)}>
                { loading && <Loading/>}

                <ErrorMessage message={errorMessage} />

                <fieldset className="text">
                    <label>Título:</label>
                    <input type="text" name="title" id="title" value={titleInput} onChange={(e)=> setTitleInput(e.target.value)} required />
                </fieldset>

                <fieldset className="text">
                    <label>Descrição:</label>
                    <input type="text" name="description" id="description" value={descriptionInput} onChange={(e)=> setDescriptionInput(e.target.value)} />
                </fieldset>

                <fieldset className="text">
                    <label>Data de validade:</label>
                    <input type="datetime-local" name="due_date" id="due_date" value={dueDateInput} onChange={(e)=> setDueDateInput(e.target.value)} />
                </fieldset>

                <fieldset className="text">
                    <label>Status da Tarefa:</label>
                    <SelectedStatus nameField="status" value={statusInput} setValue={setStatusInput} />
                </fieldset>

                <fieldset className="text">
                    <label>Responsável pela tarefa:</label>
                    <SelectedEmployees nameField="employee" value={employeeInput} setValue={setEmployeeInput} />
                </fieldset>
                
                <p><button type="submit">Adicionar</button></p>
            </form>
        </PermissionMiddleware>

    );
}