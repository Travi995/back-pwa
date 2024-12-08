import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateFields = (req:any,res:any,next:NextFunction) => {

    console.log(' ejecutando recolector de errores')
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
    next()
}