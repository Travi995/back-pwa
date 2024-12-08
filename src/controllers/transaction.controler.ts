import { Request, Response } from "express";



export const createTransaction = async (req:Request,res:Response)=>{
    try {
        const {amount,date,idUser,currency,category} = req.body

        console.log(req.body)
    } catch (error) {
        
    } 

    res.json({status:200,message:'peticion realizada con exito'})
}