import jwt from "jsonwebtoken"
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { tpPayloadJWT } from "../types/jwt";



export const validateJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.token
    if (!token) {
        res.status(401).json({ status: 401, message: 'Por favor Envie el Token' })
        return
    }
    try {
        const key = process.env.SECRETORPUBLICKEY
        
        if (!key) {
            res.status(500).json({ status: 401, message: 'No key provided' })
            return 
        }
        const decoded:tpPayloadJWT |any = jwt.verify(token as string, key)
        req.body.user = { id: decoded.id, role: decoded.role };
        next()
    } catch (error) {
        res.status(401).json({ status: 401, message: 'Token invalid' })
        return 
    }
}