import Joi from 'joi';

export const StudentBySchoolId = {
	params: {
		id: Joi.number().required(),
	},
};

export const newValidation2 = {
	body: {
		userId: Joi.number().required(),
	},
};
