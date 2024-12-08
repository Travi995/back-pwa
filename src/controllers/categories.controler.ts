import { Request, Response } from "express"
import { Category } from "../entities/category"


export const createCategory = async (req:Request,res:Response)=>{
    try {
        const {label,color,icon} = req.body

        const element = Category.create({
            label,
            color,
            icon
        })

        await element.save()

        res.status(201).json({message:'Categoria agregada con exito'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error al agregar la categoria'})
        
    }    
}

export const getAllCategories = async (req:Request,res:Response)=>{
    try {
        const elements = await Category.find()
        if(elements.length === 0){
            
            res.status(204).json({message:'Aun no tiene categorias Agregadas'})
            return
        }
        res.status(200).json({message:'Categorias obtenidas con exito',data:elements})
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error al obtener las categorias'})
    }
}


export const deleteCategorie = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const element = await Category.findOneBy({id:parseInt(id)})
        if(!element){
            res.status(404).json({message:`no existe ningun elemento con id ${id}`})
            return
        }
        await element.remove()
        res.status(200).json({message:'Categoria eliminada con exito'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error al eliminar la categoria'})
    }

}