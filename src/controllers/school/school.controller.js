// eslint-disable-next-line
import { Schools, Students } from "../../models";

import { successResponse, errorResponse } from '../../helpers';
// import  from "../../models/attendances";

export const getSchools = async (req, res) => {
	try {
		const page = req.params.page || 1;
		const limit = 1;
		const schools = await Schools.findAndCountAll({
			attributes: ['id', 'name', 'country', 'createdAt'],
			offset: (page - 1) * limit,
			limit,
		});
		return successResponse(req, res, schools);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const getStudsBySchlId = async (req, res) => {
	const page = req.params.page || 1;
	const limit = 1;

	try {
		const students = await Students.findAndCountAll({
			attributes: [
				'id',
				'num',
				'firstname',
				'lastname',
				'phone',
				'address',
				'age',
				'mother',
				'father',
			],
			include: [
				{
					model: Schools,
					as: 'Schools',
					attributes: ['id', 'name'],
					where: { id: req.params.id },
				},
			],
			offset: (page - 1) * limit,
			limit,
		});

		return successResponse(req, res, students);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};
