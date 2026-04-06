const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field must be filled in',
      'any.required': 'The "name" field is required',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'The "imageUrl" field must be a valid URL',
      'any.required': 'The "imageUrl" field is required',
    }),

    weather: Joi.string().required().valid('hot', 'warm', 'cold').messages({
      'string.empty': 'The "weather" field must be filled in',
      'any.required': 'The "weather" field is required',
      'any.only': 'The "weather" field must be one of: hot, warm, cold',
    }),
  }),
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field must be filled in',
      'any.required': 'The "name" field is required',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "avatar" field must be filled in',
      'string.uri': 'The "avatar" field must be a valid URL',
      'any.required': 'The "avatar" field is required',
    }),

    email: Joi.string().required().email().messages({
      'string.empty': 'The "email" field must be filled in',
      'string.email': 'The "email" field must be a valid email address',
      'any.required': 'The "email" field is required',
    }),

    password: Joi.string().required().min(8).messages({
      'string.empty': 'The "password" field must be filled in',
      'string.min': 'The "password" field must be at least 8 characters',
      'any.required': 'The "password" field is required',
    }),
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field must be filled in',
      'any.required': 'The "name" field is required',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "avatar" field must be filled in',
      'string.uri': 'The "avatar" field must be a valid URL',
      'any.required': 'The "avatar" field is required',
    }),
  }),
});

module.exports.validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'The "email" field must be filled in',
      'string.email': 'The "email" field must be a valid email address',
      'any.required': 'The "email" field is required',
    }),

    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
      'any.required': 'The "password" field is required',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().hex().length(24).messages({
      'string.length': 'The "itemId" field must be 24 characters long',
      'string.hex': 'The "itemId" field must be a hexadecimal value',
      'any.required': 'The "itemId" field is required',
    }),
  }),
});