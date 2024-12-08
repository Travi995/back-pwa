import { Router } from "express";
import { createTransaction } from "../../controllers/transaction.controler";
import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields";
import { validateJWT } from "../../middlewares/validateJWT";


export const routerTransaction = Router()

routerTransaction.post('/',[
    validateJWT,
    check('amount','Amount is required').isNumeric(),
    check('date','Date is required').isDate(),
    check('idUser','el id del Usuario es requerido').isString(),
    check('currency','el tipo de moneda es requerida').isInt(),
    check('category','La categoria es requerida').isInt(),
    validateFields
],createTransaction)