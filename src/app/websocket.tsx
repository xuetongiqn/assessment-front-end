import { io } from "socket.io-client";
import { store } from "./store";
import { TodoItem } from '../reducer/todoReducer';

export type SocketResponse = {
  resultCode: number; // success code is 1. If server went error, will got -1.
  errcode: string; // the detail error code, defined in server side config folder.
  errmsg: string; // the error message.
  data: { // if resultCode==1, there is the data send from the server.
    list: TodoItem[];
  }
}

// Init the socket, empty string means the same domain and path
export const socket = io('');

// This is the main routes of the server message. It get data from server and update the store.
// Different messages indecated different type of data.
// Every request send to server will response a 'callback' message. Most of these callback message
// don't need handle such as search request. Except the add duplicate error, we need handle it and give
// user a chance to redo it if the task is already done.
socket.on('message', (message: string, { resultCode, data, errcode, errmsg }: SocketResponse) => {
  if (resultCode == 1) {
    switch (message) {
      case 'todoList': {
        store.dispatch({ type: 'todo/updateTodoList', payload: data.list });

        // Feature2
        // Receive todolist message means backend data is changed. 
        // If the page is showing search results in this time, the results shoud be updated.
        const { todo } = store.getState();
        if (todo.searchQuery) {
          search(todo.searchQuery);
        }
        break;
      }
      case 'completedList': {
        store.dispatch({ type: 'todo/updateCompletedList', payload: data.list });
        break;
      }
      case 'todoSearchList': {
        store.dispatch({ type: 'todo/updateTodoSearchList', payload: data.list });
        break;
      }
      case 'completedSearchList': {
        store.dispatch({ type: 'todo/updateCompletedSearchList', payload: data.list });
        break;
      }
    }
  } else {
    // DUPLICATE_ERROR, 
    if (errcode === '003') {
      store.dispatch({ type: 'todo/updateErrorMsg', payload: { errcode, errmsg, data } });
    }
  }
})



// The actions below will send socket message to the server. When the server
// get data ready, it will send message back.
export function addTodo(text: string): void {
  socket.send('addTodo', { text });
}

export function removeAll(): void {
  socket.send('removeAll');
}

// flag==true means set task done. 
export function completeTodo(id: number, flag = true): void {
  socket.send('completeTodo', { id, flag });
}

export function search(query: string): void {
  socket.send('search', { query });
}
