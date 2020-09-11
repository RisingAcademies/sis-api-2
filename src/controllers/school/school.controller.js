// eslint-disable-next-line
import { Schools, Students, Sequelize } from "../../models";

import { successResponse, errorResponse } from '../../helpers';

// import  from "../../models/attendances";

export const getStudsDetailsBySchlId = async (req, res) => {
	try {
		const student = await Students.findOne({
			where: { id: req.params.id },
			attributes: { exclude: ['deletedAt'] },
			include: [
				{
					model: Schools,
					as: 'Schools',
					attributes: ['id', 'name'],
					where: {
						id: req.params.schoolId,
					},
				},
			],
		});
		return successResponse(req, res, student);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const getStudsBySchlId = async (req, res) => {
	const page = req.params.page || 1;
	const limit = 10;

	/* eslint-disable no-mixed-spaces-and-tabs */
	let order = req.query.keyword && req.query.sort
		? [req.query.keyword, req.query.sort]
		: ['createdAt', 'DESC'];
	/* eslint-enable no-mixed-spaces-and-tabs */
	if (req.query.keyword === 'grade') { order = [Sequelize.col('Schools.Attendances.grade'), req.query.sort]; }

	try {
		const schoolDetails = Schools.findOne({
			attributes: ['id', 'name'],
			where: {
				id: req.params.id,
			},
			raw: true,
		});
		const students = Students.findAndCountAll({
			attributes: [
				'id',
				'num',
				'firstname',
				'lastname',
				'phone',
				'address',
				'dob',
				'mother',
				'father',
				'registeredDate',
				'createdAt',
				'updatedAt',
			],
			include: [
				{
					model: Schools,
					as: 'Schools',
					attributes: ['id', 'name'],
					where: { id: req.params.id },
				},
			],
			order: [order],
			offset: (page - 1) * limit,
			subQuery: false,
			limit,
		});
		const studentData = await Promise.all([schoolDetails, students]);
		return successResponse(req, res, {
			school: studentData[0],
			students: studentData[1],
		});
	} catch (error) {
		console.error('getStudsBySchlId -> error', error);
		return errorResponse(req, res, error.message);
	}
};
