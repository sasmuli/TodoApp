export interface Todo {
    id?: string;
    title: string;
    text: string;
    isDone: boolean;
    urgency: number;
}


const todo: Todo = {
    id: '123',
    title: 'Example Todo',
    text: 'This is an example.',
    isDone: false,
    urgency: 2
  };
  


