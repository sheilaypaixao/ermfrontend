import React, { useEffect, useRef, useState } from "react";

interface Props<TypeSelectedList>  {
    nameField: string,
    selectedList: TypeSelectedList[],
    value: any | undefined,
    setValue?: (value:any)=>void | undefined
}

export default function SelectedList<TypeSelectedList extends {id:number, name: string}>({nameField, selectedList, value, setValue}:Props<TypeSelectedList>){
    var [lstSearch, setLstSearch] = useState<TypeSelectedList[]>(selectedList);
    var refList = useRef<HTMLDivElement>(null);
    var refInput = useRef<HTMLInputElement>(null);
    var refInputHidden = useRef<HTMLInputElement>(null);
    //var [field, setField] = useState<any | undefined>(fieldValue);

    console.log(selectedList, lstSearch);

    function handleSearch(e:React.KeyboardEvent){
        let target = e.target as HTMLInputElement;
        let value = target.value;

        setLstSearch(selectedList.filter((group) => group.name.toLowerCase().includes(value.toLowerCase())));
    }

    function handleClickOption(e:React.MouseEvent, id:number, name:string){
        e.preventDefault();
        
        refInputHidden.current!.value = String(id);
        refInput.current!.value = name;
    }

    function handleFocus(){
        refList.current!.style.display = "block";
    }

    function handleBlur(){
        setTimeout(function(){
            refList.current!.style.display = "none";
        }, 150);
    }

    return(
        <>
            <div className="selectedList">
                <input ref={refInput} type="text" placeholder="Selecione uma opção" onKeyUp={(e)=>handleSearch(e)} onFocus={handleFocus} onBlur={handleBlur} value={value && value.name} onChange={(e)=> setValue && setValue({...value, name:e.target.value})} />
                <input ref={refInputHidden} type="hidden" name={nameField} id={nameField} value={value && value.id} />

                <div ref={refList} className="wrapList">
                    <ul>
                        {lstSearch.map((el)=>(
                            <li key={el.id}><a onClick={(e)=>handleClickOption(e, el.id, el.name)} href="#">{el.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    );
}