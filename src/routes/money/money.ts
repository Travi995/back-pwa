import { Router } from "express";
import { createMoney } from "../../controllers/money.controler";
import { validateFields } from "../../middlewares/validateFields";
import { validateJWT } from "../../middlewares/validateJWT";
import { check } from "express-validator";
import { validateTypeMoney } from "../../middlewares/validateTypeMoney";

export const routeMoney = Router()


//agregar dinerod e la cuenta
routeMoney.post('/',[
    validateJWT,
    check('typeCoin','el tipo de moneda es querido ').isString(),
    check('value','el valor de la moneda es requerido y ademas un numero').isNumeric(),
    validateTypeMoney,
    validateFields
],createMoney)