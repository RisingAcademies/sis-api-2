import Joi from 'joi';

export const getStudentById = {
	params: {
		id: Joi.number().required(),
	},
};

export const newValidation = {
	body: {
		userId: Joi.number().required(),
	},
};
