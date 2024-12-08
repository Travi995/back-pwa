import { Request, Response } from "express";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/generateToken";

export const postregister = async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = User.create({
            name,
            email,
            password: hash
        });
        await newUser.save();

        res.status(201).json({ mensaje: "usuario Agregado con Exito" })

    } catch (error) {
        res.status(500).json({ mensaje: "error" })
    }
}

export const postLogin = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body
        const user = await User.findOneBy({ email })
        if (!user) {
            res.status(401).json({ mensaje: "email o contraseña incorrecta" })
            return
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            res.status(401).json({ mensaje: " email o contraseña incorrecta" })
            return
        } 

        const token =   generateToken(user.id)
        res.status(200).json({ mensaje: "Usuario Logueado con exito", token })


    } catch (error) {
        res.status(500).json({ mensaje: "error" })

    }


}


