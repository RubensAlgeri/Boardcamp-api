import joi from 'joi';

const rentalSchema = joi.object({
    image: joi.string().min(10).pattern(/\.(jpg|jpeg|png|webp|svg)$/).required(),
    stockTotal: joi.number().greater(0).required(),
    categoryId: joi.number().greater(0).required(),
    pricePerDay: joi.number().greater(0).required()
});

export default rentalSchema;