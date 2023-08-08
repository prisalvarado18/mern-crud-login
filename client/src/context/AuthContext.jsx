import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(true);

	const signup = async (user) => {
		try {
			const res = await registerRequest(user);
			console.log(res.data);
			setUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			//console.log(error.response);
			setErrors(error.response.data);
		}
	};

	const signin = async (user) => {
		try {
			const res = await loginRequest(user);
			console.log(res);
			setUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			console.log(error.response.data);
			if (Array.isArray(error.response.data)) {
				return setErrors(error.response.data);
			}
			setErrors([error.response.data.message]);
		}
	};

	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	useEffect(() => {
		const checkLogin = async() => {
			const cookies = Cookies.get();
			//console.log(cookies);

			if (!cookies.token) {
				setIsAuthenticated(false);
				setLoading(false);
				return;
			}
			//console.log(cookies.token);
			try {
				const res = await verifyTokenRequest(cookies.token);
				console.log(res.data);
				if (!res.data) {
					return setIsAuthenticated(false);;
				} else {
					setIsAuthenticated(true);
					setUser(res.data);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setIsAuthenticated(false);
				//setUser(null);
				setLoading(false);
			}
		};

		checkLogin();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signup,
				signin,
				user,
				isAuthenticated,
				errors,
				loading
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;