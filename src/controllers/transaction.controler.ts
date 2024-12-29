import { Request, Response } from "express";
import { User } from "../entities/user";
import { Category } from "../entities/category";
import { Transaction } from "../entities/transaction";
import { calcAmount } from "../helpers/calcAmount";

export const createTransaction = async (req:Request,res:Response)=>{
    try {
        const {amount,category, typeTransaction,user} = req.body

        const itemUser = await User.findOne({ where: { id: user.id } });        
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
            category:category
        })

        await transactionElement.save()

        itemUser.amount=calcAmount(typeTransaction,itemUser.amount,amount)
        await itemUser.save()

        res.json({status:201,message:'transaccion agregada con exito'})

    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:error})
    } 

}


export const getTransactionsAll = async (req:Request,res:Response)=>{
   
}

export const getTransactionsByCategory = async (req:Request,res:Response)=>{

}

export const getTransactionById = async (req:Request,res:Response)=>{

}
export const  getTransactionByUser = async (req:Request,res:Response)=>{}


export const deleteTransaction = async (req:Request,res:Response)=>{}