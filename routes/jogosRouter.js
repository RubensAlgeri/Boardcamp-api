import { Router } from 'express';
import { buscarJogos, inserirJogo } from '../controllers/jogosController.js';
import { validaJogo } from '../middlewares/gameSchemaMiddleware.js';

const gamesRouter = Router();
gamesRouter.get("/games", buscarJogos);
gamesRouter.post("/games", validaJogo, inserirJogo);

export default gamesRouter;