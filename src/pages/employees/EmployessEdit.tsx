import React, { useEffect, useState } from "react";
import SelectedGroups from "../../components/SelectedGroups";
import { useRequests } from "../../utils/requests";
import Loading from "../../components/Loading";
import { useNavigate, useParams } from "react-router";
import { Group } from "../../models/Group";
import ErrorMessage from "../../components/ErrorMessage";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";

export default function EmployeesEdit(){
    var [loading, setLoading] = useState(false);
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    var { editEmployee, getAnEmployee } = useRequests();
    var {id_employee}:any = useParams();
    var [nameInput, setNameInput] = useState('');
    var [emailInput, setEmailInput] = useState('');
    var [groupInput, setGroupInput] = useState<Group | undefined>(undefined);

    const handleGetAnEmployee = async ()=> {
        setLoading(true);
        let response = await getAnEmployee(parseInt(id_employee));

        if(response.data){
            setNameInput(response.data?.employee.name);
            setEmailInput(response.data?.employee.email);
            setGroupInput(response.data?.employee.group);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
        
        setLoading(false);
    }

    useEffect(()=>{
        handleGetAnEmployee();
    },[]);

    const handleAddEmployee = async (e:React.FormEvent) =>{
        e.preventDefault();

        let name = document.querySelector("#name") as HTMLInputElement;
        let email = document.querySelector("#email") as HTMLInputElement;
        let group = document.querySelector("#group") as HTMLInputElement;

        setLoading(true);
        let response = await editEmployee(id_employee, {name: name.value, email: email.value, group_id: parseInt(group.value)});
        setLoading(false);

        if(response.data){
            navigate("/employees");
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
    }

    return(
        
        <PermissionMiddleware codename="change_employee">
            <div className="card">
                <h3>Funcionários</h3>
                <p>Edite um Funcionario</p>
            </div>

            <form className="card relative" onSubmit={(e)=>handleAddEmployee(e)}>
                { loading && <Loading/>}

                <ErrorMessage message={errorMessage} />

                <fieldset className="text">
                    <label>Nome:</label>
                    <input type="text" name="name" id="name" required value={nameInput} onChange={(e)=> setNameInput(e.target.value)} />
                </fieldset>

                <fieldset className="text">
                    <label>Email:</label>
                    <input type="text" name="email" id="email" required value={emailInput} onChange={(e)=> setEmailInput(e.target.value)} />
                </fieldset>

                <fieldset className="text">
                    <label>Cargo:</label>
                    <SelectedGroups nameField="group" value={groupInput} setValue={setGroupInput} />
                </fieldset>
                
                <p><button type="submit">Adicionar</button></p>
            </form>
        </PermissionMiddleware>
        
    );
}