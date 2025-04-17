import { useEffect, useState } from "react";
import { useRequests } from "../utils/requests";
import { GroupDetail } from "../models/Group";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "../utils/auth";

export default function GroupsTable(){
    var [loading, setLoading] = useState(true);
    const {handlePermissionExist} = useAuth();
    var [errorMessage, setErrorMessage] = useState('');
    var [lstGroups, setLstGroups] = useState<GroupDetail[]>();
    var {getGroups, deleteGroup} = useRequests();
    var navigate = useNavigate();

    const handleGetGroups = async ()=>{
        let response = await getGroups();

        if(response.data){
            setLstGroups(response.data?.groups);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
        
        setLoading(false);
    }

    useEffect(()=>{
        handleGetGroups();
    },[])

    const handleDeleteGroup = async (id:number)=> {
        setLoading(true);
        await deleteGroup(id);

        handleGetGroups();
    }

    function handleEditGroup(id:number){
        navigate(`${id}`);
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
                            <td>Nome</td>
                            <td>Ações</td>
                        </tr>
                    </thead>

                    <tbody>

                        {lstGroups && lstGroups!.map((group)=> (
                        
                            <tr key={group.id}>
                                <td>{group.id}</td>
                                <td>{group.name}</td>
                                <td>
                                    {handlePermissionExist("change_grouping") && <button className="mr-2" onClick={()=> handleEditGroup(group.id)}>Editar</button> }
                                    {handlePermissionExist("delete_grouping") && <button onClick={()=> handleDeleteGroup(group.id)}>Deletar</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}