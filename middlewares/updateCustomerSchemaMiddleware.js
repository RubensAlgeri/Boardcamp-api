import updateCustomerSchema from "../schemas/updateCustomerSchema.js";

export function validaAtualizarCliente (req, res, next) {
const validation = updateCustomerSchema.validate(req.body);
if (validation.error) {
    return res.status(422).send(validation.error.details.map(details=>details.message));
}
next()
}