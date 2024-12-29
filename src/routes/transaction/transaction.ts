import { Router } from "express";
import { createTransaction, getTransactionById, getTransactionsAll } from "../../controllers/transaction.controler";
import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields";
import { validateJWT } from "../../middlewares/validateJWT";
import { categoryExists } from "../../middlewares/uniqueCategory";
import { verifyUser } from "../../middlewares/verifyUser";


export const routerTransaction = Router()

routerTransaction.post('/',[
    validateJWT,
    check('amount','Amount is required').isNumeric(),
    check('typeTransaction','el tipo de transaccion es obligatorio').isString(),
    categoryExists,
    validateFields
],createTransaction)

routerTransaction.get('/',[
    validateJWT,
    verifyUser,
    validateFields
],getTransactionsAll)

routerTransaction.get('/:id',[
    validateJWT,
    verifyUser,
    validateFields
],getTransactionById)


