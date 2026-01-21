const Joi = require('joi');

module.exports = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    age: Joi.number().min(18).max(150).required()
  })
};
