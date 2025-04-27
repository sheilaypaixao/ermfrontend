import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useRequests } from "./requests";
import { setUser, setUserEnterprise } from "./redux/reducers/auth";

const LOCAL_STORAGE_KEY = 'AUTH_ACCESS';

export const handleGetAccessToken = () => localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';

export function useAuth(){
    const auth = useSelector((state:RootState)=> state.auth);
    const dispacth = useDispatch();

    const {signIn, getUser} = useRequests();

    const user = {
        user: auth.user,
        enterprise: auth.enterprise
    }

    const handleInitUser = async () => {
        const accessToken = handleGetAccessToken();
        
        if(!accessToken) return;

        const response = await getUser();

        if(!response.detail){
            dispacth(setUser(response.data!.user));
            dispacth(setUserEnterprise(response.data!.enterprise));
        }
    }

    const handlePermissionExist = (permissionCodename:string)=>{
        //console.log(auth, auth.enterprise!.is_owner);
        if(!auth.enterprise) return false;
        if(auth.enterprise!.is_owner) return true;

        return auth.enterprise!.permissions.some((p) => p.codename = permissionCodename)

    }

    const handleSignIn = async (email:string, password:string)=>{
        const response = await signIn({email: email, password: password});

        if(response.data != null){
            dispacth(setUser(response.data!.user));
            dispacth(setUserEnterprise(response.data!.enterprise));

            localStorage.setItem(LOCAL_STORAGE_KEY, response.data!.access);
        }

        return response;
    }

    const handleSignOut = ()=>{
        dispacth(setUser(null));
        dispacth(setUserEnterprise(null));

        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    return {
        user,
        isLogged: auth.user != null,
        handleInitUser,
        handlePermissionExist,
        handleSignIn,
        handleSignOut
    }
}


