import Joi from 'joi';

export const StudentBySchoolId = {
	params: {
		schoolId: Joi.number().required(),
	},
};

export const StudentDetailsBySchoolId = {
	params: {
		id: Joi.number().required(),
		schoolId: Joi.number().required(),
	},
};
