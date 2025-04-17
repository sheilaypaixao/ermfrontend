import EmployeesTable from "../../components/EmployeesTable";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";

export default function Employees(){
    return(
    
        <PermissionMiddleware codename="view_employee">
            <div className="card">
                <h3>Funcionários</h3>
                <p>Lista de funcionários, edite ou delete um funcionário:</p>
            </div>

            <EmployeesTable/>
        </PermissionMiddleware>
    
    );
}