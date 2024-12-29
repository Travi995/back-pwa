import { NextFunction, Request, Response } from "express"
import { Category } from "../entities/category"

export const uniqueCategory = async(req:any,res:any,next:NextFunction) => {

    const {label} = req.body
    const element =  await Category.findOneBy({label})

    if(element){
        res.status(409).json({mensaje:"Ya existe una catgeoria con este nombre"})
        return 
    }

    next()
}


export const categoryExists = async(req:Request,res:Response,next:NextFunction) => {
    const {category} = req.body
    
    const item =  parseInt(category)

    if(!item){
        res.status(400).json({mensaje:"la categoria debe ser un numero"})
        return
    }

    const element =  await Category.findOneBy({id:item})
    if(!element){   
        res.status(404).json({mensaje:"No existe una categoria con ese id"})
        return 
    }
    
  
    next()
  }