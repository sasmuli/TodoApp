import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { TodoService } from '../shared/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  todos: Todo[];
  id: string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.cdr.detectChanges(); // detect changes to update view
    });
  }

  onClick(titleInput: HTMLInputElement, textInput: HTMLInputElement, urgentSelect: MatSelect) {
    if (titleInput.value && textInput.value) {
      this.todoService.addTodo(titleInput.value, textInput.value, urgentSelect.value);
      titleInput.value = '';
      textInput.value = '';
      urgentSelect.value = '';
    }
  }
}
