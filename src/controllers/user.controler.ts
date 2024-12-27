import { Request, Response } from "express"
import { User } from "../entities/user"
import { hashPass } from "../helpers/hashPass"
import { rolsEnum } from "../enum/rols"

export const getUsers = async (req: Request, res: Response) => {
    try {
        console.log(req.body.user)
        const elements = await User.find()

        res.status(200).json({ mensaje: "usuarios listados", data: elements })
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
        }
        const element = await User.findOneBy({ id: item })
        console.log(element)
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

        

        const newUser = User.create({
            name,
            email,
            password: hashPass(password),
            roleUser:rolsEnum.admin
        });
        await newUser.save();

        res.status(201).json({ mensaje: "usuario Agregado con Exito" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "error" })
    }

}

export const patchUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, amount,pass } = req.body

        const item = parseInt(id)
        if (!item) {
            res.status(400).json({ message: 'el id debe ser un numero ' })
        }

        //arreglar el update del usuario
        const element = await User.findOneBy({ id: parseInt(id) })
        if (element) {
            if (name || amount) {
                await User.update(element.id, {
                    name,
                    amount,
                    password: pass? hashPass(pass):undefined
                    
                })
                
                res.status(200).json({ message: `los datos del usuario ${id} han sido actualizados correctamente` })
            }else{
                res.status(400).json({ message: 'por favor ajustese al formato de clave valor', example:" las claves son 'name' 'amount' 'pass" })
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