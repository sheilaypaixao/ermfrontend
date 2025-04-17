import GroupsTable from "../../components/GroupsTable";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";

export default function Groups(){
    return(

        <PermissionMiddleware codename="view_grouping">

           <div className="card">
                <h3>Grupos</h3>
                <p>Lista de grupos, edite ou delete um grupo:</p>
            </div>

            <GroupsTable/>
            
        </PermissionMiddleware>
        
    );
}