import Joi from "joi";

export const ProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'El nombre es obligatorio.',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
    'string.max': 'El nombre no debe exceder {#limit} caracteres.',
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'El apellido es obligatorio.',
    'string.min': 'El apellido debe tener al menos {#limit} caracteres.',
    'string.max': 'El apellido no debe exceder {#limit} caracteres.',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'El correo electrónico es obligatorio.',
    'string.email': 'El correo electrónico no es válido.',
  }),
  dni: Joi.string().pattern(/^\d{7,10}$/).allow('').messages({
    'string.pattern.base': 'El DNI debe tener entre 7 y 10 dígitos.',
  }),
  gender: Joi.string().required().messages({
    'string.empty': 'El género es obligatorio.',
  }),
  birthdate: Joi.date().less('now').messages({
    'date.less': 'La fecha de nacimiento debe ser una fecha pasada.',
    'date.base': 'La fecha de nacimiento no es válida.',
  }),
  phoneNumber: Joi.string().allow('').messages({
    'string.pattern.base': 'El número de teléfono no es válido.',
  }),
  address: Joi.string().max(100).allow('').messages({
    'string.max': 'La dirección no debe exceder {#limit} caracteres.', 
  }),
  photo: Joi.string().allow(''),
  rol: Joi.string().required().messages({
    'string.empty': 'El rol es obligatorio.',
  }),
  employeeId: Joi.string().allow(''),
  employeeState: Joi.boolean().default(false),
  specialty: Joi.string().allow(''),
  state: Joi.boolean().default(false),
});