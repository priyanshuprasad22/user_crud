const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().regex(/^\d{5}$/).required()
});

const validateUser = (userData) => {
    return userSchema.validate(userData);
};

module.exports = {
    validateUser
};
