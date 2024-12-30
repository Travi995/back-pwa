import { Request, Response } from "express";
import { User } from "../entities/user";
import { Category } from "../entities/category";
import { Transaction } from "../entities/transaction";
import { calcAmount } from "../helpers/calcAmount";
import { convertToNumber } from "../helpers/convertToNumber";

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const { amount, category, typeTransaction, user } = req.body

        const itemUser = await User.findOne({ where: { id: user.id } });
        const categoryEntity = await Category.findOneBy({ id: category });

        if (!itemUser) {
            res.status(404).json({ mensaje: "El usuario no existe" })
            return
        }
        if (!categoryEntity) {
            res.status(404).json({ mensaje: "La categoria no existe" })
            return
        }

        const transactionElement = Transaction.create({
            amount,
            typeTransaction,
            user: user.id,
            category: category
        })

        await transactionElement.save()

        itemUser.amount = calcAmount(typeTransaction, itemUser.amount, amount)
        await itemUser.save()

        res.json({ status: 201, message: 'transaccion agregada con exito' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: error })
    }

}


export const getTransactionsAll = async (req: Request, res: Response) => {
    try {
        const items = await Transaction.find()
        res.status(200).json({ message: 'transferencias realizadas', data: items })

    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'ha ocurrido un error en el servidor' })

    }

}

export const getTransactionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const item = convertToNumber(id)
        if (!item) {
            res.status(400).json({ mensaje: 'el id debe ser un numero' })
            return
        }

        const transactionElement = await Transaction.findOneBy({ id: item })

        if (!transactionElement) {
            res.status(404).json({ mensaje: `no existe transferencia con id ${id}` })
            return
        }

        res.status(200).json({ message: `transferencias por id ${id}`, data: transactionElement })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'ha ocurrido un error en el servidor' })
    }


}
export const getTransactionsByCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const item = convertToNumber(id)
        if (!item) {
            res.status(400).json({ mensaje: 'el id debe ser un numero' })
            return
        }

        const transactionsCategory =  await Category.findOne({where:{id:item},relations:{
            transactions:true
        }})
        if(!transactionsCategory){
            res.status(404).json({mensaje:`no existe la categoria con id ${id}`})
            return
        }

        res.status(200).json({message:'transacciones obtenidas por categoria',data:transactionsCategory.transactions})

    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:'error en el servidor'})


    }
}

export const getTransactionByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const item = convertToNumber(id)
        if (!item) {
            res.status(400).json({ mensaje: 'el id debe ser un numero' })
            return
        }

        const transactionsUser =  await User.findOne({where:{id:item},relations:{
            transactions:true
        }})
        if(!transactionsUser){
            res.status(404).json({mensaje:`no existe la categoria con id ${id}`})
            return
        }

        res.status(200).json({message:'transacciones obtenidas por categoria',data:transactionsUser.transactions})


    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:'error en el servidor'})
    }
 }


export const deleteTransaction = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const item = convertToNumber(id)
        if (!item) {
            res.status(400).json({ mensaje: 'el id debe ser un numero' })
            return
        }

        const trnasaction = await Transaction.findOneBy({ id: item })

        if(!trnasaction){
            res.status(404).json({mensaje:`no existe la transaccion con id ${id}`})
            return
        }
        await Transaction.delete(item)
        res.status(200).json({mensaje:'la transaccion ha sido eliminada'})

    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:'error en el servidor'})
    }
}