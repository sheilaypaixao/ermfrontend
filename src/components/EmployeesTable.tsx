import { useEffect, useState } from "react";
import { useRequests } from "../utils/requests";
import { useNavigate } from "react-router";
import { Employee } from "../models/Employee";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "../utils/auth";

export default function EmployeesTable(){
    var [loading, setLoading] = useState(true);
    const {handlePermissionExist} = useAuth();
    var [errorMessage, setErrorMessage] = useState('');
    var [lstEmployees, setLstEmployees] = useState<Employee[]>();
    var {getEmployees, deleteEmployee} = useRequests();
    var navigate = useNavigate();

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

                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Grupo</td>
                            <td>Ações</td>
                        </tr>
                    </thead>

                    <tbody>

                        {lstEmployees && lstEmployees!.map((employee)=> (
                        
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>
                                    {handlePermissionExist("change_employee") && <button className="mr-2" onClick={()=> handleEditEmployee(employee.id)}>Editar</button>}
                                    {handlePermissionExist("delete_employee") && <button onClick={()=> handleDeleteEmployee(employee.id)}>Deletar</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}