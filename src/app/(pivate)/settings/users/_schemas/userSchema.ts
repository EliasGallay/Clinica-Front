import Joi from "joi";

export const userSchema = Joi.object({
  per_txt_first_name: Joi.string().required(),
  per_txt_last_name: Joi.string().required(),
  per_txt_dni: Joi.string().required(),
  per_dat_birthdate: Joi.date().required(),
  per_int_gender: Joi.number().valid(0, 1, 2).required(),
  per_txt_email: Joi.string().email().required(),
  per_txt_phone: Joi.string().required(),
  per_txt_address: Joi.string().required(),
  roles: Joi.array().items(Joi.string()).required(),
  usr_sta_state: Joi.number().valid(0, 1).required(),
})