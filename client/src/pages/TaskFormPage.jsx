import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function TaskFormPage() {
	const { register, handleSubmit, setValue } = useForm();
	const { createTask, getTask, updateTask } = useTasks();
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		//console.log(params);
		async function loadTask() {
			if (params.id) {
				const task = await getTask(params.id);
				console.log(task);
				//getTask(params.id);
				setValue('title', task.title);
				setValue('description', task.description);
			}
		}
		loadTask();
	}, []);

	const onSubmit = handleSubmit((data) => {
		//console.log(data);
		if (params.id) {
			updateTask(params.id, data);
		} else {
			createTask(data);
		}
		navigate('/tasks');
	});

	return (
		<div className="bg-red-950 max-w-md w-full p-10 rounded-md">
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Title"
					{...register('title')}
					onChange
					value
					name
					className="w-full bg-red-500 text-white px-4 py-2 rounded-md my-2"
					autoFocus
				/>

				<textarea
					rows="3"
					placeholder="Description"
					{...register('description')}
					className="w-full bg-red-500 text-white px-4 py-2 rounded-md my-2"
				></textarea>

				<button className="bg-red-500 text-white">Save</button>
			</form>
		</div>
	);
}

export default TaskFormPage;
