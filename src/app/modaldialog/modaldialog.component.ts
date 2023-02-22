import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-modaldialog',
  templateUrl: './modaldialog.component.html',
  styleUrls: ['./modaldialog.component.css']
})
export class ModaldialogContent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(TodoFormComponent, {
      height: '40%',
      width: '30%'
    });
  }
}

@Component({
  selector: 'app-modaldialog',
  templateUrl: './modaldialog.component.html',
})
export class ModaldialogComponent {}
