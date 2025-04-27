import { useEffect, useState } from "react";
import { useRequests } from "../../utils/requests";
import { PermissionDetail } from "../../models/Permission";
import PermissionsList from "../../components/PermissionsList";
import { useNavigate, useParams } from "react-router";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";

export default function GroupEdit(){
    var [loading, setLoading] = useState(true);
    var [errorMessage, setErrorMessage] = useState('');
    let {getPermissions, editGroup, getAnGroup} = useRequests();
    var [permissions, setPermissions] = useState<PermissionDetail[]>([]);
    var [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    var [inputName, setInputName] = useState('');
    var {id_group} = useParams();
    var navigate = useNavigate();

    const getPermissionsList = async ()=>{
        let response = await getPermissions();

        if(response.data){
            setPermissions(response.data.permissions);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
    }

    const handleGetAnGroup = async()=>{

        if(id_group){
            let response = await getAnGroup(parseInt(id_group));

            if(response.data){
                setInputName(response.data.group.name);
                setSelectedPermissions(response.data.group.permissions.map((permission:any)=> permission.id));
            }else if(response.detail){
                setErrorMessage(response.detail);
            }
        }
    }
    
    useEffect(() => {
        Promise.all([getPermissionsList(), handleGetAnGroup()]).finally(()=>{
            setLoading(false);
        });
    }, []);

    const handleAddGroup = async(e:any)=>{
        e.preventDefault();

        let inputsPermissions = document.querySelectorAll("input[name=permission]:checked");
        let name:any = document.querySelector("#name");

        let values:string = Array.from(inputsPermissions).map((permission:any)=> permission.value).join(",");

        if(id_group){
            setLoading(true);
            let response = await editGroup(parseInt(id_group), {name: name!.value, permissions: values});
            setLoading(false);

            if(response.data){
                navigate("/groups");
            }else if(response.detail){
                setErrorMessage(response.detail);
            }
        }
    }

    return(
        <PermissionMiddleware codename="change_grouping">
            <div className="card">
                <h3>Grupos</h3>
                <p>Edit um Grupo</p>
            </div>

            <form className="card relative" onSubmit={(e)=>handleAddGroup(e)}>
                {loading && <Loading/>}

                <ErrorMessage message={errorMessage} />
                
                <fieldset className="text">
                    <label>Nome:</label>
                    <input type="text" name="name" id="name" value={inputName} required onChange={(e)=> setInputName(e.target.value)} />
                </fieldset>

                <PermissionsList permissions={permissions} selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions} />
                
                <p><button className="mt-4" type="submit">Salvar</button></p>
            </form>
        </PermissionMiddleware>
    );
}