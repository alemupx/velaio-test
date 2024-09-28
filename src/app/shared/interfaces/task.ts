import { Person } from './person';

export interface Task {
  title: string;
  dueDate: string;
  associatedPeople: Person[];
  completed: boolean;
}
