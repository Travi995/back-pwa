import { NextFunction } from "express"
import { Category } from "../entities/category"

export const uniqueCategory = async(req:any,res:any,next:NextFunction) => {

    const {label} = req.body
    const element =  await Category.findOneBy({label})

    if(element){
        return res.status(409).json({mensaje:"Ya existe una catgeoria con este nombre"})
    }

    next()
}