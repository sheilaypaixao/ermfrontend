import React, { useRef, useImperativeHandle } from 'react';
import { useState } from 'react';

type Props = {
    ref: any,
    list: any,
    numberPages: number,
    numberItens: number,
    currentPage: number,
    setCurrentPage: (value:any)=> void
}

function Pagination({ref, list, numberPages, numberItens, currentPage, setCurrentPage}: Props) {
    var totalPages = getTotalPages();
    //console.log(lstUser.length, "itens", totalPages);

    function goToPage(current:number){
        //console.log(current, "current", totalPages);
        current = (current < 1) ? 1 : current;
        setCurrentPage(current);
    }

    function getTotalPages(totalItens?:number){
        let totalItens2 = totalItens || list.length;
        var nPagesTotal =  Math.floor(totalItens2/numberItens);
        console.log(totalItens2, numberItens, nPagesTotal, totalItens2/numberItens);
        return (totalItens2%numberItens==0)? nPagesTotal : nPagesTotal + 1;
    }

    function handleClickPag(page:number, e: React.MouseEvent){
        e.preventDefault();

        goToPage(page);
    }

    useImperativeHandle(ref, () => {
        return {
            goToPage(page:number){
                 goToPage.bind(page);
            },
            goToLastPage(totalItens:number){
                goToPage(getTotalPages(totalItens));
            }
        };
    }, [totalPages, list]);

    function lstPages(){
        let halfNumberPages = numberPages/2;
        let initial = currentPage - halfNumberPages;
        initial = ( initial < 1 ) ? 1 : initial;
        let final = initial + numberPages - 1;

        if(final > totalPages){
            final = totalPages;
            
            let newInitial = final - numberPages + 1;
            initial = (initial == 1 || newInitial < 1)? 1 : newInitial;
        }

        let pages = [];

        if(currentPage != 1){
            pages.push(<li key="-1"><a key="-1" href="#" onClick={(e) => {handleClickPag(currentPage - 1 , e)}}> anterior </a></li>);
        }

        for (let i = initial; final >= i; i++){
            pages.push(<li key={i}><a href="#" onClick={(e) => {
                      handleClickPag(i, e)
                  }} className={(i == currentPage)?"current":""}> {i} </a></li>);
        }
        
        if(currentPage != totalPages){
            pages.push(<li key={final+1}><a href="#" onClick={(e) => {handleClickPag(currentPage + 1 , e)}}> proximo </a></li>);
        }
        return pages;
    }

      return (
        <div className="pagination">
            <ul>
              {lstPages()}
            </ul>
        </div>
      )
}

export default Pagination;