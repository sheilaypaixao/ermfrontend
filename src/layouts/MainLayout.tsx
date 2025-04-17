import { Link, Outlet } from "react-router";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { useAuth } from "../utils/auth";
import { useEffect, useState } from "react";

import '../assets/css/mainlyouts.css'

export default function MainLayout() {
    const { handleInitUser, handlePermissionExist } = useAuth();
    const [loading, setLoading] = useState(true);

    const authenticatedUser = async ()=>{
        await handleInitUser();
        setLoading(false);
    }

    useEffect(()=>{
        authenticatedUser();
    }, [])

    return (
        <>

        {loading ? <h3>Carregando</h3> :
        
        <div className="container grid grid-cols-[290px_auto]">

            <div className="sidebar p-[9px] mr-[1px]">
                <h1>Sistema de tarefas</h1>
                
                <h5>Tarefas</h5>
                <ul>
                    {handlePermissionExist("view_task") && <li><Link to="/tasks">Minhas tarefas</Link></li>}
                    {(handlePermissionExist("add_task") && handlePermissionExist("view_task")) && <li><Link to="/tasks/created">Tarefas criadas</Link></li>}
                    {handlePermissionExist("add_task") && <li><Link to="/tasks/add">Adicionar</Link></li>}
                </ul>

                <h5>Cargos</h5>
                <ul>
                    {handlePermissionExist("view_grouping") && <li><Link to="/groups">Listar (Excluir/Editar)</Link></li>}
                    {handlePermissionExist("add_grouping") && <li><Link to="/groups/add">Adicionar</Link></li>}
                </ul>

                <h5>Funcionários</h5>
                <ul>
                    {handlePermissionExist("view_employee") && <li><Link to="/employees">Listar (Excluir/Editar)</Link></li>}
                    {handlePermissionExist("add_employee") && <li><Link to="/employees/add">Adicionar</Link></li>}
                </ul>
                
            </div>
            
            <div className="content">
                <header className="h-[80px] flex items-center">
                    <nav>
                        <ul className="flex flex-row gap-8 pl-[30px]">
                            <li className="inline">Buttons</li>
                            <li className="inline">Buttons</li>
                            <li className="inline">Buttons</li>
                        </ul>
                    </nav>

                </header>

                <div className="p-[30px]">
                    <AuthMiddleware>
                        <Outlet />
                    </AuthMiddleware>
                </div>
            </div>
        </div>
            
        }

        
        </>
    );
}