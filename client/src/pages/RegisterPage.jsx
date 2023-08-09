import { useForm } from 'react-hook-form';
//import { registerRequest } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signup, isAuthenticated, errors: registerErrors } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/tasks');
		}
	}, [isAuthenticated]);

	//console.log(user);

	const onSubmit = handleSubmit(async (values) => {
		//console.log(values);
		//const res = await registerRequest(values)
		//console.log(res);
		signup(values);
	});

	return (
		<div className="flex h-[calc(100vh-100px)] items-center justify-center">
			<div className="bg-red-700 max-w-md p-10 rounded-md">
				{registerErrors.map((error, i) => (
					<div className="bg-red-500 p-2 text-white" key={i}>
						{error}
					</div>
				))}
				<h1 className="text-3xl font-bold my-2">Register</h1>
				<form onSubmit={onSubmit}>
					<input
						type="text"
						{...register('username', { required: true })}
						className="w w-full bg-red-30 text-slate-950 px-4 py-2 rounded-md my-2"
						placeholder="Username"
					/>
					{errors.username && (
						<p className="text-red-500">Username is required</p>
					)}
					<input
						type="email"
						{...register('email', { required: true })}
						className="w w-full bg-red-30 text-slate-950 px-4 py-2 rounded-md my-2"
						placeholder="Email"
					/>
					{errors.email && (
						<p className="text-red-500">Email is required</p>
					)}
					<input
						type="password"
						{...register('password', { required: true })}
						className="w w-full bg-red-30 text-slate-950 px-4 py-2 rounded-md my-2"
						placeholder="Password"
					/>
					{errors.password && (
						<p className="text-red-500">Password is required</p>
					)}
					<button type="submit"
						className='bg-emerald-600 text-white px-4 py-2 rounded-md my-2'
					>Register</button>
				</form>

				<p className="flex gap-x-2 justify-between">
					Already have an account?{' '}
					<Link to="/login" className="text-gray-100">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;
