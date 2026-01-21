const Joi = require("joi");

module.exports = {
  body: Joi.object({
    title: Joi.string().min(3).max(200),
    content: Joi.string().min(10),
    author: Joi.string().min(2).max(100),
    tags: Joi.array().items(Joi.string()),
    published: Joi.boolean(),
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
