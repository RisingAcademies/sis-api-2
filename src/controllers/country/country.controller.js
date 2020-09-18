import Promise from 'bluebird';
// eslint-disable-next-line
import { Countries, Schools, Grades } from "../../models";
import { successResponse, errorResponse } from '../../helpers';

const { join } = Promise;

export const getAllCountries = async (req, res) => {
	try {
		/* eslint-disable no-mixed-spaces-and-tabs */
		const order = req.query.keyword && req.query.sort
      	? [req.query.keyword, req.query.sort]
      	: ['createdAt', 'DESC'];
		/* eslint-enable no-mixed-spaces-and-tabs */

		const countries = await Countries.findAndCountAll({
			attributes: ['id', 'name'],
			order: [order],
		});
		return successResponse(req, res, countries);
	} catch (error) {
		console.error('getAllCountries -> error', error);
		return errorResponse(req, res, error.message);
	}
};

export const getSchools = async (req, res) => {
	try {
		// const page = req.params.page || 1;
		// const limit = 10;
		/* eslint-disable no-mixed-spaces-and-tabs */
		const order = req.query.keyword && req.query.sort
      	? [req.query.keyword, req.query.sort]
      	: ['createdAt', 'DESC'];
		/* eslint-enable no-mixed-spaces-and-tabs */

		const getCountryDetails = Countries.findOne({
			attributes: ['id', 'name'],
			where: {
				id: req.params.countryId,
			},
		});

		const getSchoolData = Schools.findAndCountAll({
			attributes: ['id', 'name', 'code', 'createdAt'],
			where: {
				countryId: req.params.countryId,
			},
			order: [order],
			// offset: (page - 1) * limit,
			// limit,
		});

		return join(getCountryDetails, getSchoolData, (countryDetails, school) =>
			successResponse(req, res, {
				country: countryDetails,
				school,
			}));
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const getCountryGrades = async (req, res) => {
	try {
		const grades = await Grades.findAll({
			attributes: ['id', 'name'],
			where: {
				countryId: req.params.countryId,
			},
		});
		return successResponse(req, res, grades);
	} catch (error) {
		console.error('getAllCountries -> error', error);
		return errorResponse(req, res, error.message);
	}
};
