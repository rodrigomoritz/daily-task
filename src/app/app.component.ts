import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  task = {} as Task;
  tasks: Task[];

  constructor(private taskService: TaskService) {}
  
  ngOnInit() {
    this.getTasks();
  }
  
  saveTask(form: NgForm) {
    if (this.task.id !== undefined) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.taskService.saveTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
  
  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  editTask(task: Task) {
    this.task = { ...task };
  }

  cleanForm(form: NgForm) {
    this.getTasks();
    form.resetForm();
    this.task = {} as Task;
  }

}
