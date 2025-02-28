
let tasks = [
    {
        id: 1,
        title: 'Buy groceries'
    }
];

const getTasks = () => tasks;

const createTask = (title) => {
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  return newTask;
};

export default { getTasks, createTask };
