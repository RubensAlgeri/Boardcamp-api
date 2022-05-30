import { Router } from "express";
import categoriesRouter from "./categoriasRouter.js";
import customersRouter from "./clientesRouter.js";
import gamesRouter from "./jogosRouter.js";

const router = Router();
router.use(customersRouter);
router.use(gamesRouter);
router.use(categoriesRouter);

export default router;