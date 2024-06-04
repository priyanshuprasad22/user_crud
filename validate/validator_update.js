const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string(),
    age: Joi.number().integer(),
    city: Joi.string(),
    zipCode: Joi.string().regex(/^\d{5}$/)
});

const validateUserUpdate = (userData) => {
    return userSchema.validate(userData);
};

module.exports = {
    validateUserUpdate
};
