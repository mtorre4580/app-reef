import Joi from '@hapi/joi';

const AssertAquariums = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  parameters: Joi.object(),
});

export { AssertAquariums };
