import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/task';
import {
  addTask,
  loadTasks,
  toggleTaskCompletion,
} from 'src/app/store/actions/task.actions';
import { TaskState } from 'src/app/store/task.state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private store: Store<{ taskState: TaskState }>) {
    this.tasks$ = this.store.pipe(select((state) => state.taskState.tasks));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.subscribe((res) => {
      console.log(res);
    });
  }

  addNewTask(task: Task) {
    this.store.dispatch(addTask({ task }));
  }

  tasks: Task[] = [];

  createModal: boolean = false;

  filter: 'all' | 'completed' | 'pending' = 'all';

  getFilteredTasks(tasks: Task[]) {
    if (this.filter === 'completed') {
      return tasks.filter((task) => task.completed);
    } else if (this.filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }

  filterTasks(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
  }

  toggleTaskCompletion(task: Task) {
    this.store.dispatch(toggleTaskCompletion({ task }));
  }

  changeModalState(modalName: string) {
    switch (modalName) {
      case 'create':
        this.createModal = !this.createModal;
        break;
    }
  }

  onOpen(modalName: string) {
    this.changeModalState(modalName);
    document.body.style.overflow = 'hidden';
  }
  onClose(modalName: string) {
    this.changeModalState(modalName);
    document.body.style.overflow = 'visible';
  }
}
