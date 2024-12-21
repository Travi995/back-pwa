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
    check('idUser','el id del Usuario es requerido').isString(),
    check('category','La categoria es requerida').isInt(),
    categoryExists,
    validateFields
],createTransaction)