const Joi = require("joi");

module.exports = {
  body: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().min(2).max(100).required(),
    tags: Joi.array().items(Joi.string()),
    published: Joi.boolean(),
    likes: Joi.number().min(0),
  }),
};
