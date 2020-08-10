import Joi from '@hapi/joi';

const AssertUsers = Joi.object({
  _id: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string(),
});

export { AssertUsers };
