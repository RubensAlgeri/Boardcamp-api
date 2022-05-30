import customerSchema from "../schemas/customerSchema.js";

export function validaCliente (req, res, next) {
const validation = customerSchema.validate(req.body);
if (validation.error) {
    return res.status(400).send(validation.error.details.map(details=>details.message));
}
next()
}