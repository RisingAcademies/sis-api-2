import Joi from 'joi';

export const getStudentById = {
	params: {
		id: Joi.number().required(),
	},
};

export const addStudent = {
	body: {
		num: Joi.string().required(),
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		gender: Joi.string().required(),
		dateofbirth: Joi.date().required(),
		previousSchool: Joi.string().required(),
		previousType: Joi.string().required(),
		caregiverFirst: Joi.string().required(),
		caregiverLast: Joi.string().required(),
		contactnumber: Joi.string().required(),
		contactnumber2: Joi.string().required(),
		schoolId: Joi.string().required(),
	},
};

export const editStudent = {
	body: {
		id: Joi.number().required(),
		recordId: Joi.number().required(),
	},
};
