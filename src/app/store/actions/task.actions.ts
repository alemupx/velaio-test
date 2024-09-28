import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/shared/interfaces/task';

export const loadTasks = createAction('[Task API] Load Tasks');
export const addTask = createAction(
  '[Task Page] Add Task',
  props<{ task: Task }>()
);

export const toggleTaskCompletion = createAction(
  '[Task Page] Toggle Task Completion',
  props<{ task: Task }>()
);
