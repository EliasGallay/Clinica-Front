import Joi from 'joi';

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': 'El email es obligatorio.',
      'string.empty': 'El email es obligatorio.',
      'string.email': 'El email no es válido.',
    }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'La contraseña es obligatoria.',
    'string.empty': 'La contraseña es obligatoria.',
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
  }),
});
