import joi from 'joi';

const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const updateCustomerSchema = joi.object({
    name: joi.string(),
    phone: joi.string().min(10).max(11).pattern(/[0-9]/),
    cpf: joi.string().min(11).max(11).pattern(/[0-9]/),
    birthday: joi.string().pattern(regex)
});

export default updateCustomerSchema;