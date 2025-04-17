import { ReactNode } from "react";
import { useAuth } from "../utils/auth";

type Props = {
    children: ReactNode,
    codename: string,
}

export function PermissionMiddleware({children, codename}: Props){

    const {handlePermissionExist} = useAuth();

    if(!handlePermissionExist(codename)){
        return(
            <>
                <h2>Usuário não tem permissão para acessar essa área</h2>
            </>
        );
    }

    return(
        <>
            {children}
        </>
    );
}