import { useTasks } from '../context/TasksContext';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskCard({ task }) {
	//console.log(task);
	const { deleteTask } = useTasks();

	return (
		<div className="bg-green-600 max-w-md w-full p-10 rounded-md">
			<header className="flex justify-between">
				<h1 className="text-2xl font-bold">{task.title}</h1>
				<div className="flex gap-x-2 items-center">
					<button
					className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
						onClick={() => {
							//console.log(task._id);
							deleteTask(task._id);
						}}
					>
						delete
					</button>
					<Link to={`/tasks/${task._id}`}
						className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
					>edit</Link>
				</div>
			</header>
			<p className="text-white">{task.description}</p>
			{/*<p>{new Date(task.date).toLocaleDateString()}</p>*/}
			<p>{dayjs(task.date).utc().format('DD/MM/YYYY')}</p>
		</div>
	);
}

export default TaskCard;
