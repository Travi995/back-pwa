import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, patchUser } from "../../controllers/user.controler";
import { validateJWT } from "../../middlewares/validateJWT";
import { validateFields } from "../../middlewares/validateFields";
import { check } from "express-validator";
import { uniqueEmail } from "../../middlewares/uniqueEmail";
import { verifyAdmin } from "../../middlewares/verifyAdmin";

export const routesUser = Router()

routesUser.get('/',[
    validateJWT,
    verifyAdmin,
    validateFields
],getUsers)

routesUser.get('/:id',[
    validateJWT,
    validateFields
],getUserById)


routesUser.post('/',[
    check('name','el nombre de usuario es obligatorio').notEmpty(),
    check('email','el correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria  y mayor de 8 caracteres').isLength({min:8}),
    uniqueEmail,
    validateFields
],createUser)

routesUser.patch('/:id',[
    validateJWT,
    validateFields
],patchUser)

routesUser.delete('/:id',[
    validateJWT,
    verifyAdmin,
    validateFields
],deleteUser)

