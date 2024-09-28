import { createReducer, on } from '@ngrx/store';
import { initialState } from '../task.state'; // Cambia la importación aquí
import { addTask, toggleTaskCompletion } from '../actions/task.actions';

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(toggleTaskCompletion, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) =>
      t.title === task.title ? { ...t, completed: !t.completed } : t
    ),
  }))
);
