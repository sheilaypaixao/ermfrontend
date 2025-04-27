import { useEffect, useRef, useState } from "react";
import { useRequests } from "../utils/requests";
import { GroupDetail } from "../models/Group";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import PaginationBlock from "./utils/PaginationsBlock";
import GroupsList from "./GroupsList";

export default function GroupsTable(){
    var [loading, setLoading] = useState(true);
    var [errorMessage, setErrorMessage] = useState('');
    var [lstGroups, setLstGroups] = useState<GroupDetail[]>([]);
    var {getGroups, deleteGroup} = useRequests();
    var navigate = useNavigate();
    var refPagBlock = useRef(null);

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

                <PaginationBlock<GroupDetail> ref={refPagBlock} list={lstGroups} numberPages={3} numberItens={5}>
                                    
                    <GroupsList handleDeleteGroup={handleDeleteGroup} handleEditGroup={handleEditGroup}/>

                </PaginationBlock>
                
            </div>
        </>
    );
}