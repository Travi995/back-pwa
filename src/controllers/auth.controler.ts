import { Request, Response } from "express";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/generateToken";
import { createUser } from "./user.controler";

export const postregister = async (req: Request, res: Response) => {

    createUser(req,res)
}

export const postLogin = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email },select:['id','email','password','roleUser'] })
        if (!user) {
            res.status(401).json({ mensaje: "email o contraseña incorrecta" })
            return
        }

        const isPasswordCorrect =  bcrypt.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            res.status(401).json({ mensaje: " email o contraseña incorrecta" })
            return
        } 

        const token =   generateToken({id:user.id,role:user.roleUser})
        res.status(200).json({ mensaje: "Usuario Logueado con exito",id:user.id, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "error" })

    }


}


