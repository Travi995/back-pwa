import { NextFunction, Request, Response } from "express"
import { User } from "../entities/user"

export const uniqueEmail = async(req:Request,res:Response,next:NextFunction) => {

    const {email} = req.body
    const element =  await User.findOneBy({email})

    if(element){
        
        res.status(409).json({mensaje:"Ya existe un usuario con este email"})
        return
    }

    next()
}