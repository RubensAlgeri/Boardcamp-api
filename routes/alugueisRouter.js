import { Router } from 'express';
import { buscarAlugueis, inserirAluguel, removerAluguel} from '../controllers/alugueisController.js';
import { validaAluguel } from '../middlewares/rentalSchemaMiddleware.js';

const rentalsRouter = Router();
rentalsRouter.get("/rentals", buscarAlugueis);
rentalsRouter.get("/rentals/:id", buscarAlugueis);
rentalsRouter.post("/rentals", inserirAluguel);
rentalsRouter.delete("/rentals/:id", removerAluguel);

export default rentalsRouter;