import { NextFunction, Request, Response } from "express"
import { typeMoneyEnum } from "../enum/entities"

export const validateTypeMoney = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const {typeCoin} = req.body
        
        console.log(typeCoin)
       console.log( Object.values(typeMoneyEnum).includes(typeCoin))
        if(Object.values(typeMoneyEnum).includes(typeCoin)){
            next()
        }else{
            return res.status(400).json({mensaje:"Por Favor ajustese a uno de los tipos de moneda",types:"USD CUP EUR"})
        }
       
    } catch (error) {
        res.status(500).json({mensaje:"Error al validar el tipo de moneda"})
        return 
    }
}