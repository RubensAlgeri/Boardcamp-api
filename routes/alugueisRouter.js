import { Router } from 'express';
import { buscarAlugueis, finalizarAluguel, inserirAluguel, removerAluguel} from '../controllers/alugueisController.js';
import { validaAluguel } from '../middlewares/rentalSchemaMiddleware.js';

const rentalsRouter = Router();
rentalsRouter.get("/rentals", buscarAlugueis);
rentalsRouter.post("/rentals", inserirAluguel);
rentalsRouter.post("/rentals/:id/return", finalizarAluguel);
rentalsRouter.delete("/rentals/:id", removerAluguel);

export default rentalsRouter;