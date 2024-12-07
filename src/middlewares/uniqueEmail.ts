import { NextFunction } from "express"
import { User } from "../entities/user"

export const uniqueEmail = async(req:any,res:any,next:NextFunction) => {

    const {email} = req.body
    const element =  await User.findOneBy({email})

    if(element){
        return res.status(409).json({mensaje:"Ya existe un usuario con este email"})
    }

    next()
}