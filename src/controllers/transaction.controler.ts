import { Request, Response } from "express";
import { User } from "../entities/user";
import { Category } from "../entities/category";
import { Transaction } from "../entities/transaction";
import { calcAmount } from "../helpers/calcAmount";
import { convertToNumber } from "../helpers/convertToNumber";

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
    try {
        const items = await Transaction.find()
        res.status(200).json({message:'transferencias realizadas',data:items})

    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:'ha ocurrido un error en el servidor'})
        
    }
   
}

export const getTransactionById = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params

       const categoryElement = await Transaction.findOneBy({id:convertToNumber(id)})
       if(!categoryElement){
           res.status(404).json({mensaje:`no existe transferencia con id ${id}`})
           return
       }
       res.status(200).json({message:`transferencias por id ${id}`,data:categoryElement})
       
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:'ha ocurrido un error en el servidor'})
    }


}
export const getTransactionsByCategory = async (req:Request,res:Response)=>{

}

export const  getTransactionByUser = async (req:Request,res:Response)=>{}


export const deleteTransaction = async (req:Request,res:Response)=>{}