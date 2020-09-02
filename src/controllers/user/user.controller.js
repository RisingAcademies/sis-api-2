import jwt from 'jsonwebtoken';
// eslint-disable-next-line
import { Users } from "../../models";

import { successResponse, errorResponse } from '../../helpers';
import { compareBcrypt } from '../../config/encrypt';

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
	try {
		const user = await Users.scope('withSecretColumns').findOne({
			where: { username: req.body.username },
		});
		if (!user) {
			throw new Error('Incorrect Username');
		}
		const isValidPassword = user.dataValues.password
			? await compareBcrypt(req.body.password, user.dataValues.password)
			: false;
		if (!isValidPassword) {
			throw new Error('Incorrect Password');
		}
		const token = jwt.sign({ user }, process.env.SECRET);
		delete user.dataValues.password;
		return successResponse(req, res, { user, token });
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};
