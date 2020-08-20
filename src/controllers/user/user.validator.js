import Joi from 'joi';

export const login = {
	body: {
		username: Joi.string().required(),
		password: Joi.string().required(),
	},
};

export const newValidation = {
	body: {
		userId: Joi.number().required(),
	},
};
