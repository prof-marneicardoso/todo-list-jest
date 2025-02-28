import taskModel from '../models/taskModel.js';

const getAllTasks = (request, response) => {
  const tasks = taskModel.getTasks();
  response.status(200).json(tasks);
};

const createTask = (request, response) => {
  const { title } = request.body;
  if (!title) return response.status(400).json({ message: 'Title is required' });

  const task = taskModel.createTask(title);
  response.status(201).json(task);
};

export default { getAllTasks, createTask };
