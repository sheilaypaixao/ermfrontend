import React, { useState } from "react";
import SelectedGroups from "../../components/SelectedGroups";
import { useRequests } from "../../utils/requests";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import ErrorMessage from "../../components/ErrorMessage";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";

export default function EmployeesAdd(){
    var [loading, setLoading] = useState(false);
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    var { addEmployee } = useRequests();


    const handleAddEmployee = async (e:React.FormEvent) =>{
        e.preventDefault();

        let name = document.querySelector("#name") as HTMLInputElement;
        let email = document.querySelector("#email") as HTMLInputElement;
        let password = document.querySelector("#password") as HTMLInputElement;
        let group = document.querySelector("#group") as HTMLInputElement;

        setLoading(true);
        let response = await addEmployee({name: name.value, email: email.value, password: password.value, group_id: parseInt(group.value)});
        setLoading(false);

        if(response.data){
            navigate("/employees");
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
    }

    return(
        <PermissionMiddleware codename="add_employee">
            <div className="card">
                <h3>Funcionários</h3>
                <p>Adicione um Funcionario</p>
            </div>

            <form className="card relative" onSubmit={(e)=>handleAddEmployee(e)}>
                { loading && <Loading/>}

                <ErrorMessage message={errorMessage} />

                <fieldset className="text">
                    <label>Nome:</label>
                    <input type="text" name="name" id="name" required />
                </fieldset>

                <fieldset className="text">
                    <label>Email:</label>
                    <input type="text" name="email" id="email" required />
                </fieldset>

                <fieldset className="text">
                    <label>Senha:</label>
                    <input type="password" name="password" id="password" required />
                </fieldset>

                <fieldset className="text">
                    <label>Cargo:</label>
                    <SelectedGroups nameField="group" />
                </fieldset>
                
                <p><button type="submit">Adicionar</button></p>
            </form>
        </PermissionMiddleware>
        
    );
}