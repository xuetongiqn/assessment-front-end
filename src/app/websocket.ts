import { io, Socket } from "socket.io-client";
import { store } from "./store";
import { TodoItem } from '../reducer/todoReducer'

export type SocketResponse = {
  resultCode: number;
  errcode: string;
  errmsg: string;
  data: {
    list: TodoItem[];
  }
}

let socket: Socket;

export function websocketInit(): void {
  socket = io('');

  socket.on('connect', () => {
    console.log("socket.id:", socket.id);
  })

  socket.on('message', (message: string, { resultCode, data, errcode, errmsg }: SocketResponse) => {
    console.log(message, resultCode, errmsg, data);
    if (resultCode == 1) {
      switch (message) {
        case 'todoList': {
          store.dispatch({ type: 'todo/updateTodoList', payload: data.list });

          //if the list is updated(by other user), the search list should be updated
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
      if (errcode === '003') {
        store.dispatch({ type: 'todo/updateErrorMsg', payload: { errcode, errmsg, data } });
      }
    }
  })
}

export function addTodo(text: string): void {
  socket.send('addTodo', { text });
}

export function removeAll(): void {
  socket.send('removeAll');
}

export function completeTodo(id: number, flag = true): void {
  socket.send('completeTodo', { id, flag });
}

export function search(query: string): void {
  socket.send('search', { query });
}
