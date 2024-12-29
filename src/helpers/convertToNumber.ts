
export const convertToNumber = (amount:string)=>{
    const number = parseInt(amount)

    if(isNaN(number)){
        
        return 0
    }
    return number

}