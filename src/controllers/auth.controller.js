import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../config.js';

export const register = async (req, res) => {
	const { email, password, username } = req.body;

	try {

		const foundUser = await User.findOne({email});
		if(foundUser){
			return res.status(400).json(['The email is already in use']);
		}

		const hashedPass = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			email,
			password: hashedPass,
		});

		const userSaved = await newUser.save();

		const token = await createAccessToken({ id: userSaved._id });
		res.cookie('token', token);
		// res.json({ message: 'Congratulations! User was created' });
		res.json({
			id: userSaved._id,
			username: userSaved.username,
			email: userSaved.email,
			createdAt: userSaved.createdAt,
			updatedAt: userSaved.updatedAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userFound = await User.findOne({ email });

		if (!userFound) {
			return res.status(400).json(['Email doesnt exist']);
		}

		const isMatch = await bcrypt.compare(password, userFound.password);
		if (!isMatch)
			return res.status(400).json(['Invalid credentials']);

		const token = await createAccessToken({
			id: userFound._id,
			username: userFound.username,
		});
		res.cookie('token', token);
		/*res.json({
			message: 'User created successfully',
		});*/

		res.json({
			id: userFound._id,
			username: userFound.username,
			email: userFound.email,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	res.cookie('token', '', {
		expires: new Date(0),
	});
	return res.sendStatus(200);
};

export const profile = async (req, res) => {
	const userFound = await User.findById(req.user.id);

	if (!userFound) {
		return res.status(400).json({ message: 'User not found' });
	} else {
		return res.json({
			id: userFound._id,
			username: userFound.username,
			email: userFound.email,
			createdAt: userFound.createdAt,
			updatedAt: userFound.updatedAt,
		});
	}
};

export const verifyToken = async (req, res) => {
	const {token} = req.cookies;

	if(!token){
		return res.send(false);
	}

	jwt.verify(token, SECRET_TOKEN, async(error, user) => {
		if (error) {
			return res.sendStatus(401);
		}

		const userFound = await User.findById(user.id);
		if (!userFound) {
			return res.sendStatus(401);
		}

		return res.json({
			id: userFound._id,
			username: userFound.username,
			email: userFound.email,
		})
	})
}