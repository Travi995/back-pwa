import { Request, Response } from "express";
import { Transaction } from "../entities/transaction";
import { User } from "../entities/user";
import { Category } from "../entities/category";

export const createTransaction = async (req:Request,res:any)=>{
    try {
        const {amount,idUser,currency,category} = req.body

        const user = await User.findOne({ where: { id: idUser } });
        // const typeMoney = await TypeMoney.findOne({ where: { id: currency } });
        
        const categoryEntity = await Category.findOne({ where: { id: category } });
        

        if(!user){
            return res.status(404).json({mensaje:"El usuario no existe"})
        }
        // if(!typeMoney){
        //     return res.status(404).json({mensaje:"La moneda no existe"})
        // }
        // if(!categoryEntity){
        //     return res.status(404).json({mensaje:"La categoria no existe"})
        // }

        // const transactionElement =  Transaction.create({
        //     amount:amount,
        //     user,
        //     currency:typeMoney,
        //     category:categoryEntity,
        // })


        // await transactionElement.save()
        res.json({status:201,message:'transaccion agregada con exito'})

        console.log(req.body)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:error})
    } 

}