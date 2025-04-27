import { Group } from "../models/Group";
import { useAuth } from "../utils/auth";

type Props = {
    lstRender?:Group[],
    handleDeleteGroup:(id:number)=>void,
    handleEditGroup:(id:number)=>void
}

export default function GroupsList({lstRender, handleDeleteGroup, handleEditGroup}:Props){
    const {handlePermissionExist} = useAuth();

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nome</td>
                        <td>Ações</td>
                    </tr>
                </thead>

                <tbody>

                    {lstRender!.map((group:Group)=> (
                    
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
        </>

    );
}