import { Router } from 'express';
import { atualizarAluguel, buscarAlugueis, inserirAluguel} from '../controllers/alugueisController.js';
import { validaAluguel } from '../middlewares/customerSchemaMiddleware.js';
import { validaAtualizarAluguel } from '../middlewares/updateCustomerSchemaMiddleware.js';

const rentalsRouter = Router();
rentalsRouter.get("/rentals", buscarAlugueis);
rentalsRouter.get("/rentals/:id", buscarAlugueis);
rentalsRouter.post("/rentals", validaAluguel, inserirAluguel);
rentalsRouter.delete("/rentals/:id", validaAtualizarAluguel, atualizarAluguel);

export default rentalsRouter;