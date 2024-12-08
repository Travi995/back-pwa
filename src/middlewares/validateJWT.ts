import jwt from "jsonwebtoken"
import "dotenv/config";
import { NextFunction, Request } from "express";


export const validateJWT = (req: Request, res: any, next: NextFunction) => {

    const token = req.headers.token
    if (!token) {
        return res.status(401).json({ status: 401, message: 'Por favor Envie el Token' })
    }
    try {
        const key = process.env.SECRETORPUBLICKEY
        
        if (!key) {
            return res.status(500).json({ status: 401, message: 'No key provided' })
        }
        const decoded = jwt.verify(token as string, key)
        next()
    } catch (error) {
        return res.status(401).json({ status: 401, message: 'Token invalid' })
    }
}