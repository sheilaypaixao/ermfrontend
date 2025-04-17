import React, { useEffect, useState } from "react";
import { useRequests } from "../../utils/requests";
import { PermissionDetail } from "../../models/Permission";
import PermissionsList from "../../components/PermissionsList";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";

export default function GroupAdd(){
    var [loading, setLoading] = useState(true);
    var [errorMessage, setErrorMessage] = useState('');
    let {getPermissions, addGroup} = useRequests();
    var [permissions, setPermissions] = useState<PermissionDetail[]>([]);
    var [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    var navigate = useNavigate();

    const getPermissionsList = async ()=>{
        let response = await getPermissions();

        if(response.data){
            setPermissions(response.data.permissions);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        getPermissionsList();
    }, []);

    const handleAddGroup = async(e: React.FormEvent)=>{
        e.preventDefault();

        let inputsPermissions = document.querySelectorAll("input[name=permission]:checked");
        let name:any = document.querySelector("#name");

        let values:string = Array.from(inputsPermissions).map((permission:any)=> permission.value).join(",");

        setLoading(true);
        let response = await addGroup({name: name!.value, permissions: values});
        setLoading(false);

        if(response.data){
            navigate("/groups");
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
    }

    return(

        <PermissionMiddleware codename="add_grouping">
            <div className="card">
                <h3>Grupos</h3>
                <p>Adicione um Grupo</p>
            </div>

            <form className="card relative" onSubmit={(e) => handleAddGroup(e)}>
                { loading && <Loading/>}

                <ErrorMessage message={errorMessage} />

                <fieldset className="text">
                    <label>Nome:</label>
                    <input type="text" name="name" id="name" required />
                </fieldset>

                <PermissionsList permissions={permissions} selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions} />
                
                <p><button type="submit">Salvar</button></p>
            </form>
        </PermissionMiddleware>
    
    );
}