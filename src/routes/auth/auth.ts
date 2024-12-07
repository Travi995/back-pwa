import { Router } from "express";
import { postLogin } from "../../controllers/auth.controler";
import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields";



export const routerAuth = Router()

routerAuth.post('/login',[
    check('email','el correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').isLength({min:8}),
    validateFields
] ,postLogin)