import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../config.js';

export const authRequired = (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return res
				.status(401)
				.json({ message: 'No token, authorization denied' });
		}

		jwt.verify(token, SECRET_TOKEN, (error, user) => {
			if (error) {
				return res.status(401).json({ message: 'Invalid token' });
			}
			//console.log(user);
			req.user = user;
			next();
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
