import React, { useEffect, useState } from "react";
import { Group } from "../models/Group";
import SelectedList from "./SelectedList";
import { useRequests } from "../utils/requests";


type Props = {
    nameField: string,
    value?: number | undefined,
    setValue?: (value:any)=> void
}

export default function SelectedStatus({nameField, value , setValue}: Props){
    return(
        <>  
            <select name={nameField} id={nameField} value={value} onChange={(e)=>setValue && setValue(e.target.value)}>
                <option value={1}>Não iniciado</option>
                <option value={2}>Em progresso</option>
                <option value={3}>Feito</option>
            </select>
        </>
    );
}