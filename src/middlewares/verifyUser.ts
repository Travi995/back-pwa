import { NextFunction, Request, Response } from "express"
import { rolsEnum } from "../enum/rols"


export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { user } = req.body

        if (user.role === rolsEnum.admin) {
            next()
        } else if (id !== undefined && user.id === id) {
            next()
        } else {
            res.status(401).json({ mensaje: "no tiene permisos para realizar esta operacion " })
            return
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "error en el server" })

    }



}