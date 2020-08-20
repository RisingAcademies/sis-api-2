// eslint-disable-next-line
import { Users } from "../../models";

import { successResponse, errorResponse } from '../../helpers';

export const allUsers = async (req, res) => {
	try {
		const page = req.params.page || 1;
		const limit = 2;
		const users = await Users.findAndCountAll({
			order: [['createdAt', 'DESC']],
			offset: (page - 1) * limit,
			limit,
		});
		return successResponse(req, res, users);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const login = async (req, res) => {
	console.log(req.body);
	// add logic
	res.send('ok');
};
