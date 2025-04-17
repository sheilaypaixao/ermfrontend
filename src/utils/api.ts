const BASE_URL = import.meta.env.VITE_BASE_URL_API
import axios, { AxiosError } from "axios"
import { APIError } from "../models/Api"
import {handleGetAccessToken} from "./auth"
//import { useNavigate } from "react-router"

export const useAPI = async <TypeDateResponse>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: object,
    withAuth: boolean = true
): Promise<{
    data?: TypeDateResponse | null,
    detail: string | null
}> => {

    const access_token = handleGetAccessToken();
    //let navigate = useNavigate();
    let headers:any = {};

    if(access_token && withAuth){
        headers['Authorization'] = `Bearer ${access_token}`;
    }
    
    try {
        const request = await axios(`${BASE_URL}/${endpoint}`, {
            method,
            data: method!='GET' && data,
            params: method=='GET' && data,
            headers:headers
        })

        if(request.status == 401){
            //navigate("/signin");
        }

        return {
            data: request.data,
            detail: null
        }

    }catch (e){
        const error = e as AxiosError<APIError>;

        console.log(error);

        return {
            data: null,
            detail: error.response?.data.detail || error.message
        }
    }
}