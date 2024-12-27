import { Router } from "express";
import { createTransaction } from "../../controllers/transaction.controler";
import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields";
import { validateJWT } from "../../middlewares/validateJWT";
import { categoryExists } from "../../middlewares/uniqueCategory";


export const routerTransaction = Router()

routerTransaction.post('/',[
    validateJWT,
    check('amount','Amount is required').isNumeric(),
    check('category','La categoria es requerida').isInt(),
    check('typeTransaction','el tipo de transaccion es obligatorio').isString(),
    categoryExists,
    validateFields
],createTransaction)