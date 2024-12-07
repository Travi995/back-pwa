import { Request, Response } from "express";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";

export const postregister = async(req:Request, res:Response) => {
    
    try {
        const {name,email,password} = req.body

        const salt  =  bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        const newUser = User.create({
            name,
            email,
            password:hash
        });
        await newUser.save();

        res.status(201).json({mensaje:"usuario Agregado con Exito"})

    } catch (error) {
        res.status(400).json({mensaje:"error"})
    }
}

export const postLogin = (req:Request, res:Response) => {

    res.json({mensaje:"hola"})
}


