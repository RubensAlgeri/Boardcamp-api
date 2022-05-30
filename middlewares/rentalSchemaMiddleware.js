import rentalSchema from "../schemas/rentalSchema.js";

export function validaAluguel (req, res, next) {
    const validation = rentalSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details.map(details=>details.message));
    }
    next()
    }