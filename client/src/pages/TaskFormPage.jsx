import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskFormPage() {
	const { register, handleSubmit, setValue } = useForm();
	const { createTask, getTask, updateTask } = useTasks();
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		//console.log(params);
		const loadTask = async () => {
			if (params.id) {
				const task = await getTask(params.id);
				console.log(task);
				//getTask(params.id);
				setValue('title', task.title);
				setValue('description', task.description);
			}
		};
		loadTask();
	}, []);

	const onSubmit = handleSubmit((data) => {
		//console.log(data);
		if (params.id) {
			updateTask(params.id, {
				...data,
				date: dayjs.utc(data.date).format()
			});
		} else {
			createTask({
				...data,
				date: dayjs.utc(data.date).format()
			});
		}
		navigate('/tasks');
	});

	return (
		<div className="bg-red-950 max-w-md w-full p-10 rounded-md">
			<form onSubmit={onSubmit}>
				<label htmlFor="title" className='text-white'>Title</label>
				<input
					type="text"
					placeholder="Title"
					{...register('title')}
					/*onChange
					value
					name*/
					className="w-full bg-red-500 text-white px-4 py-2 rounded-md my-2"
					autoFocus
				/>

				<label htmlFor="description" className='text-white'>Description</label>
				<textarea
					rows="3"
					placeholder="Description"
					{...register('description')}
					className="w-full bg-red-500 text-white px-4 py-2 rounded-md my-2"
				></textarea>

				<label htmlFor="date" className='text-white'>Date</label>
				<input
					type="date"
					{...register('date')}
					className="w-full bg-red-500 text-white px-4 py-2 rounded-md my-2"
				/>
				<button className="bg-red-500 text-white px-3 py-2 rounded-md">
					Save
				</button>
			</form>
		</div>
	);
}

export default TaskFormPage;
