import { Employee } from "../models/Employee";
import { useAuth } from "../utils/auth";

type Props = {
    lstRender?: Employee[],
    handleDeleteEmployee:(id:number)=>void,
    handleEditEmployee:(id:number)=>void
}

export default function EmployeesList({lstRender, handleDeleteEmployee, handleEditEmployee}: Props){
    const {handlePermissionExist} = useAuth();

    return (
        <>
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
            {lstRender!.map((employee:Employee)=> (
                            
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
        </>
    );
}