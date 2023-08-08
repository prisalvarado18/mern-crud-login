import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth';

function RegisterPage() {
	const { register, handleSubmit } = useForm();
    const onSubmit = handleSubmit(async (values) => {
        //console.log(values);
        const res = await registerRequest(values)
        console.log(res);
    })

	return (
		<div className='bg-red-700 max-w-md p-10 rounded-md'>
			<form onSubmit={onSubmit}>
				<input type='text' {...register('username',{required:true})} 
                    className='w w-full bg-red-30 text-slate-950 px-4 py-2 rounded-md my-2'
                    placeholder='Username'
                />
				<input type='email' {...register('email',{required:true})} 
                    className='w w-full bg-red-30 text-slate-950 px-4 py-2 rounded-md my-2'
                    placeholder='Email'
                />
				<input type='password' {...register('password',{required:true})} 
                    className='w w-full bg-red-30 text-slate-950 px-4 py-2 rounded-md my-2'
                    placeholder='Password'
                />
                <button type='submit'>
                    Register
                </button>
            
            </form>
		</div>
	);
}

export default RegisterPage;
