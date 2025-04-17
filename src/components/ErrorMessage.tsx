type Props = {
    message: string;
}

export default function ErrorMessage({message}:Props){
    return(
        <>
            {message!='' && <p className="message-error">{message}</p>}
        </>
    );
}