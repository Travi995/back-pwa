import { NextFunction, Request, Response } from "express";
import { rolsEnum } from "../enum/rols";


export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    if (user.role === rolsEnum.admin) {
        next()
    }else{
        res.status(401).json({ mensaje: "no tiene permisos para realizar esta operacion" })
        return 
    }
    
}