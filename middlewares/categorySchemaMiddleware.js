import categorySchema from "../schemas/categorySchema.js";

export function validaCategoria (req, res, next) {
const validation = categorySchema.validate(req.body);
if (validation.error) {
    return res.status(400).send(validation.error.details.map(details=>details.message));
}
next()
}