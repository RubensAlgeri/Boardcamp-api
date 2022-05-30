import { Router } from 'express';
import { atualizarCliente, buscarClientes, inserirCliente} from '../controllers/clientesController.js';
import { validaCliente } from '../middlewares/customerSchemaMiddleware.js';
import { validaAtualizarCliente } from '../middlewares/updateCustomerSchemaMiddleware.js';

const customersRouter = Router();
customersRouter.get("/customers", buscarClientes);
customersRouter.get("/customers/:id", buscarClientes);
customersRouter.post("/customers", validaCliente, inserirCliente);
customersRouter.put("/customers/:id", validaAtualizarCliente, atualizarCliente);

export default customersRouter;