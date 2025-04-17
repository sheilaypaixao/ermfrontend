import React, { useEffect, useState } from "react";
import { Group } from "../models/Group";
import SelectedList from "./SelectedList";
import { useRequests } from "../utils/requests";


type Props = {
    nameField: string,
    value?: Group | undefined,
    setValue?: (value:any)=> void,
}

export default function SelectedGroups({nameField, value , setValue}: Props){
    var [loading, setLoading] = useState(true);
    var [groups, setGroups] = useState<Group[]>([]);
    var { getGroups } = useRequests();

    const handleGetGroups = async() =>{
        let response = await getGroups();
        setLoading(false);

        if(response.data){
            setGroups(response.data.groups);
        }
    }

    useEffect(()=>{
        handleGetGroups();
    },[]);

    return(
        <>  
            {loading && <p>Carregando cargos...</p>}
            {!loading && <SelectedList<Group> nameField={nameField} selectedList={groups} value={value} setValue={setValue} />}
        </>
    );
}