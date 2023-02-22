import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  item: Todo; 
  title: string; 
  id: string; 
  urgent: boolean; 
  textInput: string; 
  todos: any[] = []; 
  todo: Todo; 
  isDone: boolean;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      const id = this.route.snapshot.paramMap.get('id');
      this.todo = this.todos.find((todo) => todo.id === id);
      this.urgent = this.todo.urgency > 0;
    });
  }

  onDelete(): void {
    if (this.todo && this.todo.id) {
      this.todoService.deleteTodoById(this.todo.id);
      this.dialog.closeAll();
    }
  }

  changeToDone(): void {
    this.todoService.updateTodo(this.todo);
    this.cdr.detectChanges();
  }

  saveTodo(): void {
    this.todoService.updateTodo(this.todo);
    this.dialog.closeAll();
    this.cdr.detectChanges();
  }
}
