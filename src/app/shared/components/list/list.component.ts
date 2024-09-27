import { Component } from '@angular/core';

interface Person {
  name: string;
  age: number;
  skills: string[];
}

interface Task {
  title: string;
  dueDate: string;
  associatedPeople: Person[];
  completed: boolean; // Indica si la tarea está completada
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  tasks: Task[] = [
    {
      title: 'Tarea 1',
      dueDate: '2024-10-01',
      associatedPeople: [
        { name: 'Juan Pérez', age: 25, skills: ['JavaScript', 'Angular'] },
        { name: 'María López', age: 30, skills: ['TypeScript', 'CSS'] },
      ],
      completed: false,
    },
    {
      title: 'Tarea 2',
      dueDate: '2024-09-25',
      associatedPeople: [
        { name: 'Carlos Gómez', age: 40, skills: ['HTML', 'SCSS'] },
      ],
      completed: true,
    },
  ];

  filter: 'all' | 'completed' | 'pending' = 'all'; // Estado del filtro

  get filteredTasks() {
    if (this.filter === 'completed') {
      return this.tasks.filter((task) => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter((task) => !task.completed);
    }
    return this.tasks; // Muestra todas las tareas
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed; // Cambia el estado de completado de la tarea
  }

  filterTasks(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter; // Cambia el filtro
  }
}
