import { PermissionDetail } from "../models/Permission";

type Props = {
    permissions?: PermissionDetail[],
    selectedPermissions: number[],
    setSelectedPermissions:(value: number[]) => void,
}

export default function PermissionsList({permissions, selectedPermissions, setSelectedPermissions}: Props){
    
    function isChecked(permission_id: number): boolean | undefined{
        return selectedPermissions?.some((id)=>  id == permission_id);
    }

    function handleChange(e: any, id:number){
        let checked = e.target.checked;

        if(checked){
            setSelectedPermissions([...selectedPermissions, id]);
        }else{
            setSelectedPermissions(selectedPermissions.filter((idPermission)=> idPermission!=id));
        }
    }

    return(
        <>
            <p>Adicione permissões:</p>

            {permissions?.map((permission)=>(
                <label htmlFor={"permission" + permission.id} key={permission.id}>
                    <br/><input type="checkbox" onChange={(e)=>handleChange(e, permission.id)} checked={isChecked(permission.id)} id={"permission" + permission.id} name="permission" value={permission.id} /> {permission.name}
                </label>
            ))}

        </>
    );
}