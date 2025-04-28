import { useRef, useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

export default function Login(){
    var [loading, setLoading] = useState(false);
    var [errorMessage, setErrorMessage] = useState('');

    var refEmail:any = useRef(null);
    var refpassword:any = useRef(null);
    const {handleSignIn} = useAuth();
    let navigate = useNavigate();


    function handleLogin(e:any){
        e.preventDefault();

        const signIn = async () =>{
            let email = refEmail.current!.value;
            let password = refpassword.current!.value;
            
            setLoading(true);
            let response = await handleSignIn(email, password);
            setLoading(false);

            if(response.detail) {
                setErrorMessage(response.detail);
            }else if(!response.detail){
                navigate("/tasks");
            }
        }

        signIn();

    }

    return(
        <>
            <div className="grid h-[100%] justify-center content-center">
                <form id="form-login relative" className="card w-md" onSubmit={(e) => handleLogin(e)}>
                    { loading && <Loading/>}
                    
                    <ErrorMessage message={errorMessage} />

                    <fieldset>
                        <input className="w-[100%]" ref={refEmail} type="text" name="login-email" placeholder="Email" />
                    </fieldset>

                    <fieldset>
                        <input className="w-[100%]" ref={refpassword} type="text" name="login-password" placeholder="Senha" />
                    </fieldset>

                    <button type="submit" className="w-[100%] mt-1">Login</button>

                    <p className="mt-10">Usuário para login:</p>
                    <p>Email: sheila@gmail.com</p>
                    <p>Senha: 12345</p>
                </form>
            </div>
        </>
    );
}