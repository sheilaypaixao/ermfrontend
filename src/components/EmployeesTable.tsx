import { useEffect, useRef, useState } from "react";
import { useRequests } from "../utils/requests";
import { useNavigate } from "react-router";
import { Employee } from "../models/Employee";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import PaginationBlock from "./utils/PaginationsBlock";
import EmployeesList from "./EmployeesList";

export default function EmployeesTable(){
    var [loading, setLoading] = useState(true);
    var [errorMessage, setErrorMessage] = useState('');
    var [lstEmployees, setLstEmployees] = useState<Employee[]>([]);
    var {getEmployees, deleteEmployee} = useRequests();
    var navigate = useNavigate();
    var refPagBlock = useRef<any>(null);

    const handleGetEmployees = async ()=>{
        setLoading(true);
        let response = await getEmployees();

        if(response.data){
            setLstEmployees(response.data?.employees);
        }else if(response.detail){
            setErrorMessage(response.detail);
        }
        setLoading(false);
    }

    useEffect(()=>{
        handleGetEmployees();
    },[])

    const handleDeleteEmployee = async (id:number)=> {
        setLoading(true);
        await deleteEmployee(id);

        handleGetEmployees();
        setLoading(false);
    }

    function handleEditEmployee(id:number){
        navigate(`${id}`);
    }

    return(
        <>
            <div className="relative">

                {loading && <Loading/>}

                <ErrorMessage message={errorMessage} />

                <PaginationBlock<Employee> ref={refPagBlock} list={lstEmployees} numberPages={3} numberItens={5}>
                    
                    <EmployeesList handleDeleteEmployee={handleDeleteEmployee} handleEditEmployee={handleEditEmployee}/>

                </PaginationBlock>

                    
            </div>
        </>
    );
}