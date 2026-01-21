const Joi = require("joi");

module.exports = {
  query: Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(100),
  }),
};
