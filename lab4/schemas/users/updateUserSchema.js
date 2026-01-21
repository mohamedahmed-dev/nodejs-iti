const Joi = require("joi");

module.exports = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    age: Joi.number().min(18).max(150),
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
