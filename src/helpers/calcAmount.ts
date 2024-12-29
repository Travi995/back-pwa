


/**
 * 
 * @param typeTransaction 
 * @param valueEntity 
 * @param valueTransaction 
 * @returns 
 */
export const calcAmount = (typeTransaction:"Gasto"|"Ingreso",valueEntity:number,valueTransaction:number)=>{
    if(valueEntity===undefined|| valueEntity===null){
        valueEntity=0
    }
    switch(typeTransaction){
        case "Gasto":
            return valueEntity-valueTransaction
        case "Ingreso":
            return Number(valueEntity)+Number(valueTransaction)
        default:
            return 0
    }

}