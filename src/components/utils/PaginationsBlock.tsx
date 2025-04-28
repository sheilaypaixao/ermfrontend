import { useEffect, useState } from 'react';
import { useRef, useImperativeHandle } from 'react';
import { cloneElement } from 'react';

import Pagination from "./Pagination";
import '../../assets/css/pagination.css'

type Props<TypeList> = {
	ref:any,
	children: any,
	list: TypeList[],
	numberPages: number,
	numberItens: number
}

export default function PaginationBlock<TypeList>({ref, children, list, numberPages, numberItens}: Props<TypeList>) {
  let [currentPage, setCurrentPage] = useState(1);
  var refPagination = useRef<any>(null);

useEffect(()=>{

  return() =>{
    setCurrentPage(1);
  }
},[list])

function lstRender(){

    let initial = numberItens * (currentPage-1);
    let final = initial + numberItens;

    final = list.length < final ? list.length : final;
    let lst = list.slice(initial, final);

    return lst;
  }

  function goToPage(page:number){
    refPagination.current!.goToPage(page);
  }
  function goToLastPage(totalItens:number){
  	refPagination.current!.goToLastPage(totalItens);
  }

  useImperativeHandle(ref, () =>{
  	return{
  		goToLastPage(totalItens:number){
			  goToLastPage.bind(totalItens);
		  },
      goToPage(page:number){
			  goToPage.bind(page);
		  }
  	}
  })

return(
		<>

		    {cloneElement(children, {
          lstRender: lstRender()
        })}

	        <Pagination ref={refPagination} list={list} numberPages={numberPages} numberItens={numberItens} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            
        </>
	);

}