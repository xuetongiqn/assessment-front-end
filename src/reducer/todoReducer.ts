import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type TodoItem = {
  id: number;
  text: string;
  isCompleted: boolean;
}

export type ErrorMsg = {
  errcode: string;
  errmsg: string;
  data: any;
}

export interface TodoState {
  todoList: TodoItem[] | null;
  completedList: TodoItem[] | null;
  todoSearchList: TodoItem[];
  completedSearchList: TodoItem[];
  searchQuery: string;
  error: ErrorMsg | null;
}

const initialState: TodoState = {
  todoList: null,
  completedList: null,
  todoSearchList: [],
  completedSearchList: [],
  searchQuery: '',
  error: null,
};

export const todoListSlice = createSlice({
  name: 'todo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateTodoList: (state, action: PayloadAction<TodoItem[]>) => {
      state.todoList = action.payload.concat();
    },
    updateCompletedList: (state, action: PayloadAction<TodoItem[]>) => {
      state.completedList = action.payload.concat();
    },
    updateTodoSearchList: (state, action: PayloadAction<TodoItem[]>) => {
      state.todoSearchList = action.payload.concat();
    },
    updateCompletedSearchList: (state, action: PayloadAction<TodoItem[]>) => {
      state.completedSearchList = action.payload.concat();
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    updateErrorMsg: (state, action: PayloadAction<ErrorMsg | null>) => {
      state.error = action.payload;
    },
  },
});

export const { updateTodoList, updateCompletedList, updateSearchQuery, updateErrorMsg } = todoListSlice.actions;

export const selectTodoList = (state: RootState) => state.todo.todoList;
export const selectCompletedList = (state: RootState) => state.todo.completedList;
export const selectTodoSearchList = (state: RootState) => state.todo.todoSearchList;
export const selectCompletedSearchList = (state: RootState) => state.todo.completedSearchList;
export const selectSearchQuery = (state: RootState) => state.todo.searchQuery;
export const selectErrorMsg = (state: RootState) => state.todo.error;


export default todoListSlice.reducer;
