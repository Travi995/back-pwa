import { Request, Response } from "express";
import { User } from "../entities/user";
import { Category } from "../entities/category";
import { Transaction } from "../entities/transaction";

export const createTransaction = async (req:Request,res:Response)=>{
    try {
        const {amount,category, typeTransaction,user} = req.body

        const itemUser = await User.findOne({ where: { id: user.id } });
        // const typeMoney = await TypeMoney.findOne({ where: { id: currency } });
        
        const categoryEntity = await Category.findOneBy({ id: category } );
        

        if(!itemUser){
            res.status(404).json({mensaje:"El usuario no existe"})
            return 
        }


        if(!categoryEntity){
            res.status(404).json({mensaje:"La categoria no existe"})
            return
        }

        const transactionElement =  Transaction.create({
            amount,
            typeTransaction,
            user:user.id,
        })

        transactionElement.save()

        await User.update(itemUser.id,{
            transactions:[...itemUser.transactions,transactionElement]
        })
        
        await Category.update(categoryEntity.id,{
            transactions:[...categoryEntity?.transactions,transactionElement]
        })

        // await transactionElement.save()
        res.json({status:201,message:'transaccion agregada con exito'})

    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:error})
    } 

}