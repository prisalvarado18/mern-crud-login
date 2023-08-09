import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';

function TaskFormPage() {
	const { register, handleSubmit } = useForm();
	const { createTask } = useTasks();
	//console.log(createTask());

	const onSubmit = handleSubmit((data) => {
		//console.log(data);
		createTask(data);
	});

	return (
		<div className="bg-red-950 max-w-md w-full p-10 rounded-md">
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Title"
					{...register('title')}
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
