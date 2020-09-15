import jwt from 'jsonwebtoken';
import { errorResponse } from '../helpers';

// eslint-disable-next-line
import { Users } from "../models";

const isLoggedin = async (req, res, next) => {
	console.log(
		'isLoggedin -> req.headers.authorization',
		req.headers.authorization,
	);
	if (!(req.headers && req.headers.authorization)) {
		return errorResponse(req, res, 'Token is not provided', 401);
	}
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		req.user = decoded.user;

		const user = await Users.scope('withSecretColumns').findOne({
			// aa query ma max_user_connection wali error aave che
			where: { username: req.user.username },
		});
		if (!user) {
			console.log('isLoggedin -> !user', !user);
			return errorResponse(req, res, 'User is not found in system', 401);
		}
		const reqUser = { ...user.get() };
		reqUser.userId = user.id;
		req.user = reqUser;
		return next();
	} catch (error) {
		console.error('isLoggedin -> error', error.code); // etle ahi aavse
		console.error('isLoggedin -> error stringyfy', JSON.stringify(error)); // etle ahi aavse
		console.error('isLoggedin -> error status', error.status); // etle ahi aavse
		console.error('isLoggedin -> error message', error.message); // etle ahi aavse
		if (error && error.original && error.original.errno === 1226) {
			return setTimeout(isLoggedin(req, res, next), 5000);
		}

		return errorResponse(
			req,
			res,
			'Incorrect token is provided, try re-login',
			401,
		);
	}
};

export default isLoggedin;
