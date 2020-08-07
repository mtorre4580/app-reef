import Joi from '@hapi/joi';

const AssertStores = Joi.object({
  _id: Joi.string(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  name: Joi.string().required(),
  logo: Joi.string(),
});

export { AssertStores };
