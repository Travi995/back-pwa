import { Request, Response } from "express"
import { User } from "../entities/user"
import { hashPass } from "../helpers/hashPass"
import { rolsEnum } from "../enum/rols"

export const getUsers = async (req: Request, res: Response) => {

    try {
        const {} =  req.body
        const elements = await User.find({relations:{
            transactions:true, 
        }})

        res.status(200).json({ mensaje: "Lista de Usuarios", data: elements })
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "error" })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const item = parseInt(id)
        if (!item) {
            res.status(400).json({ message: 'el id debe ser un numero ' })
            return
        }
        const element = await User.findOneBy({ id: item })
        
        if (element) {
            res.status(200).json({ data: element })
        } else {
            res.status(404).json({ message: `no existe un usuario con el  id ${id}` })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json('error de server')

    }
}


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        const countElements = await User.count()
        const rolDefault =  countElements? rolsEnum.user:rolsEnum.admin

        const newUser = User.create({
            name,
            email,
            password: hashPass(password),
            roleUser:rolDefault
        });
        await newUser.save();

        res.status(201).json({ mensaje: "usuario Agregado con Exito" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "error" })
    }

}

export const patchUser = async (req: Request, res: Response) => {

    //validacion para k el usuario de rol user no pueda modificar los datos del rol admin 
    try {
        const { id } = req.params
        const { name,pass,user } = req.body

        const item = parseInt(id)
        if (isNaN(item)) {
            res.status(400).json({ message: 'el id debe ser un numero ' })
        }

        //arreglar el update del usuario
        const element = await User.findOneBy({ id: parseInt(id) })

        if (element) {

            if(element.id === parseInt(id) || user.roleUser === rolsEnum.admin){
                await User.update(element.id, {
                    name:name || element.name,
                    password: pass? hashPass(pass):element.password
                    
                })
                res.status(200).json({ message: `los datos del usuario ${id} han sido actualizados correctamente` })

            }else{
                res.status(403).json({message: 'Usted no tiene permiso para realizar esta operacion'})
                return
            }
            
        } else {
            res.status(404).json({ message: `no existe un usuario con el  id ${id}` })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

export const deleteUser = async (req: Request, res: Response) => {

    try {
        const {id} = req.params
        const item = parseInt(id)
        if (!item) {
            res.status(400).json({ message: 'el id debe ser un numero ' })
        }
        const element = await User.findOneBy({ id: item })
        if (element) {
            await element.remove()
            res.json({ message: `usuario con id ${id} ha sido  eliminado` })
        } else {
            res.status(404).json({ message: `no existe un usuario con el  id ${id}` })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error", error: error })
    }
}
