import Joi from '@hapi/joi';

const AssertItem = Joi.object({
  _id: Joi.string(),
  type: Joi.string().required(),
  title: Joi.string().required(),
  price: Joi.object({
    value: Joi.number().required(),
    coin: Joi.string().required(),
  }).required(),
  free_shipping: Joi.bool(),
  size: Joi.string().required(),
  img: Joi.string(),
});

const AssertArrayItems = Joi.array().items(AssertItem);

export { AssertItem, AssertArrayItems };
