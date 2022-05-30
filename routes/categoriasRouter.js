import { Router } from 'express';
import { buscarCategorias, inserirCategoria } from '../controllers/categoriasController.js';
import { validaCategoria } from '../middlewares/categorySchemaMiddleware.js';

const categoriesRouter = Router();
categoriesRouter.get("/categories", buscarCategorias);
categoriesRouter.post("/categories", validaCategoria, inserirCategoria );

export default categoriesRouter;