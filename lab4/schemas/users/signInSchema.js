const Joi = require("joi");

const signInSchema = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Please provide a valid email address",
      }),
    password: Joi.string().min(8).max(30).required(),
  }),
};

module.exports = signInSchema;
