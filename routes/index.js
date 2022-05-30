import { Router } from "express";
import rentalsRouter from "./alugueisRouter.js";
import categoriesRouter from "./categoriasRouter.js";
import customersRouter from "./clientesRouter.js";
import gamesRouter from "./jogosRouter.js";

const router = Router();
router.use(customersRouter);
router.use(gamesRouter);
router.use(categoriesRouter);
router.use(rentalsRouter);

export default router;