import Joi from "joi";

export const login = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};

export const resetPassword = {
  body: {
    password: Joi.string().required(),
  },
};
