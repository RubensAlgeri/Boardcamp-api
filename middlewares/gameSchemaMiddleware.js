import gameSchema from "../schemas/gameSchema.js";

export function validaJogo (req, res, next) {
    const validation = gameSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details.map(details=>details.message));
    }
    next()
    }