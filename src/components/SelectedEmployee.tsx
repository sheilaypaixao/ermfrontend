import { useEffect, useState } from "react";
import SelectedList from "./SelectedList";
import { useRequests } from "../utils/requests";
import { Employee } from "../models/Employee";


type Props = {
    nameField: string,
    value?: Employee | undefined,
    setValue?: (value:any)=> void
}

export default function SelectedEmployees({nameField, value, setValue }: Props){
    var [loading, setLoading] = useState(true);
    var [employees, setEmployees] = useState<Employee[]>([]);
    var { getEmployees } = useRequests();

    const handleGetEmployees = async() =>{
        let response = await getEmployees(true);
        setLoading(false);

        if(response.data){
            setEmployees(response.data.employees);
        }
    }

    useEffect(()=>{
        handleGetEmployees();
    },[]);

    return(
        <>  
            {loading && <p>Carregando funcionários...</p>}
            {!loading && <SelectedList<Employee> nameField={nameField} selectedList={employees} value={value} setValue={setValue} />}
        </>
    );
}