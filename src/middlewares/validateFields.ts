import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateFields = (req:Request,res:Response,next:NextFunction) => {

    const errors= validationResult(req)
    console.log(console.log('mostrando errores'),errors)

    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
        return 
    }
    
    next()
}