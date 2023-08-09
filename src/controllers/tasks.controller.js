import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id }).populate('user');
		res.json(tasks);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createTask = async (req, res) => {
	try {
		const { title, description, date } = req.body;

		const newTask = new Task({
			title,
			description,
			date,
			user: req.user.id,
		});
		const savedTask = await newTask.save();
		res.json(savedTask);
	} catch (error) {
        console.log(error.message)
		return res.status(500).json({ message: error.message });
	}
};

export const getTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id).populate('user');
		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		} else {
			res.json(task);
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
export const updateTask = async (req, res) => {
	try {
		const { title, description, date } = req.body;
		//Wait for search parameter and new data
		const updatedTask = await Task.findByIdAndUpdate(
			{ _id: req.params.id },
			{ title, description, date },
			{ new: true }
		);
		return res.json(updatedTask);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		} else {
			res.json(task);
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
