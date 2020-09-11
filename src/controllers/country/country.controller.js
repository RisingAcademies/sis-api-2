// eslint-disable-next-line
import { Countries, Schools } from "../../models";
import { successResponse, errorResponse } from '../../helpers';

export const getAllCountries = async (req, res) => {
	try {
		const countries = await Countries.findAll({
			attributes: ['id', 'name'],
			order: [['createdAt', 'DESC']],
		});
		return successResponse(req, res, countries);
	} catch (error) {
		console.error('getAllCountries -> error', error);
		return errorResponse(req, res, error.message);
	}
};

export const getSchools = async (req, res) => {
	try {
		const page = req.params.page || 1;
		const limit = 10;
		/* eslint-disable no-mixed-spaces-and-tabs */
		const order = req.query.keyword && req.query.sort
      	? [req.query.keyword, req.query.sort]
      	: ['createdAt', 'DESC'];
		/* eslint-enable no-mixed-spaces-and-tabs */
		const schools = await Schools.findAndCountAll({
			attributes: ['id', 'name', 'createdAt'],
			where: {
				countryId: req.params.countryId,
			},
			order: [order],
			offset: (page - 1) * limit,
			limit,
		});
		return successResponse(req, res, schools);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};
