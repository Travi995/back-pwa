import { NextFunction } from "express"
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


export const categoryExists = async(req:any,res:any,next:NextFunction) => {
    const {category} = req.params
    const element =  await Category.findOneBy({id:category})
  
    if(!element){
       
        res.status(404).json({mensaje:"No existe una categoria con ese id"})
        return 
    }
  
    next()
  }