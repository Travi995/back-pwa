import { Request, Response } from "express";
import { User } from "../entities/user";
import { typeMoneyEnum } from "../enum/entities";


export const createMoney = async (req:Request,res:Response)=>{

    try {
        const {id} = req.body.user
        const { typeCoin, value} = req.body;
        
        const user = await User.findOneBy(id)

        if (!user) {
            res.status(404).json({ message: "no existe ese usuario" });
            return
        }
        
        if(!Object.values(typeMoneyEnum).includes(typeCoin)){
            res.status(400).json({ message: "tipo de moneda no valida",
                                    example:"tipo de moneda validas son USD,EUR,CUP"
             });
            return
        }


        const element  =  await User.update(id,{
            currency:typeCoin,
            amount:value
        })

        res.json({message:'Moneda agregada',user:element})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error al agregar la moneda',error})
    }
    
}