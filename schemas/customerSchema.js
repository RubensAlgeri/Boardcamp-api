import joi from 'joi';

const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).pattern(/[0-9]/).required(),
    cpf: joi.string().min(11).max(11).pattern(/[0-9]/).required(),
    birthday: joi.string().pattern(regex).required()
});

export default customerSchema;