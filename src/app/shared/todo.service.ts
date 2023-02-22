import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore'
import { Todo } from './todo.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = []
  
  fireStoreCollection: AngularFirestoreCollection;
  

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.fireStoreCollection = firestore.collection('todos');
   }

   addTodo(title: string, text: string, urgency: boolean) {
    this.fireStoreCollection.add({
      title,
      text,
      urgency,
      isDone: false
    }).then((docRef) => {
      console.log(`Added todo with ID: ${docRef.id}`);
      console.log(`Title: ${title}, Text: ${text}, Urgency: ${urgency}, isDone: false`);
    });
  }
  
  deleteTodoById(id: string): void {
    this.fireStoreCollection.doc(id).delete().then(() => {
      this.router.navigate(['/']);
    });
  }

  
  getTodos(): Observable<Todo[]> {
    return this.fireStoreCollection.valueChanges({ idField: 'id' })
      .pipe(
        map((todos: (DocumentData & { id: string; })[]) => {
          return todos.map(todo => {
            return {
              id: todo.id,
              title: todo['title'],
              text: todo['text'],
              isDone: todo['isDone'],
              urgency: todo['urgency'],
            };
          });
        })
      );
  } 
  

  getTodoById(id: string) {
    return this.fireStoreCollection.doc<Todo>(id).valueChanges();
  }

  changeTodoStatus(id: string, isDone: boolean) {
    this.fireStoreCollection.doc(id).update({ isDone: isDone });
    
  }

  updateTodo(todo: Todo): void {
    this.fireStoreCollection.doc(todo.id).update({
      title: todo.title,
      text: todo.text,
      urgency: todo.urgency,
      isDone: todo.isDone
    })
    .then(() => {
      console.log(`Todo with id ${todo.id} has been updated:`, todo);
    })
    .catch(error => {
      console.error(`${todo.id}:`, error);
    });
  }
  
}
