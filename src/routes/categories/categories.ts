import { Router } from 'express';
import { createCategory, deleteCategorie, getAllCategories } from '../../controllers/categories.controler';
import { check } from 'express-validator';
import { validateJWT } from '../../middlewares/validateJWT';
import { validateFields } from '../../middlewares/validateFields';
import { uniqueCategory } from '../../middlewares/uniqueCategory';

export const routerCategories = Router()

routerCategories.post('/',[
    validateJWT,
    check('label','Label is required').notEmpty().bail().isString(),
    check('color','Color is required').notEmpty().bail().isString(),
    check('icon','Icon is required').notEmpty().bail().isString(),
    uniqueCategory,
    validateFields
],createCategory)


routerCategories.get('/',[
    validateJWT,
    validateFields
],getAllCategories)


routerCategories.delete('/:id',[
    validateJWT,
    check('id','por favor agrega el id de la categoria a eliminar (por ejemeplo: categories/{idCategorie})').notEmpty().bail().isString(),
    validateFields
],deleteCategorie)


