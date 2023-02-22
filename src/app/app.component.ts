import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { Todo } from './shared/todo.model';
import { TodoService } from './shared/todo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
})
export class AppComponent implements OnInit {
  item: Todo;
  title: string;
  id: string;
  urgent: number;
  textInput: string;
  todos: any[] = [];
  todo: Todo

  constructor(

    private route: ActivatedRoute,
    public todoService: TodoService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Todo
    ) {
      this.item = data;
    }
    
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.todoService.fireStoreCollection.valueChanges({idField:'id'}).subscribe(item => {
        this.todos = item;
      });
    }
  
    openDialog() {
      const dialogRef = this.dialog.open(TodoFormComponent, {
        height: '40%',
        width: '30%',
        data: { id: this.id }
      });
    }

  onDelete(id:string) {
    this.todoService.deleteTodoById(id)
  }
  
}
