
import imgLoading from "../assets/img/loading.gif"

export default function Loading(){
    return(
        <>
            <div className="loading w-full grid justify-center">
                <img src={imgLoading} />
            </div>
        </>
    );
}