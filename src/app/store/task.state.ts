import { Task } from '../shared/interfaces/task';

export interface TaskState {
  tasks: Task[];
}
export const initialState: TaskState = {
  tasks: [
    {
      title: 'Tarea A',
      dueDate: '2024-10-28',
      associatedPeople: [
        { name: 'Juan Pérez', age: 25, skills: ['JavaScript', 'Angular'] },
        { name: 'María López', age: 30, skills: ['TypeScript', 'CSS'] },
      ],
      completed: false,
    },
    {
      title: 'Tarea B',
      dueDate: '2024-09-25',
      associatedPeople: [
        { name: 'Carlos Gómez', age: 40, skills: ['HTML', 'CSS'] },
      ],
      completed: true,
    },
  ],
};
