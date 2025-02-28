import taskModel from '../src/models/taskModel.js';

describe('Task Model', () => {
  test('getTasks deve retornar todas as tasks', () => {
    const tasks = taskModel.getTasks();
    expect(tasks).toEqual([{ id: 1, title: 'Buy groceries' }]);
  });

  test('createTask deve adicionar uma nova task', () => {
    const newTask = taskModel.createTask('Learn Node.js');
    expect(newTask).toEqual({ id: 2, title: 'Learn Node.js' });
    expect(taskModel.getTasks()).toHaveLength(2);
  });
});
