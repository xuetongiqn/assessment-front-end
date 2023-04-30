import { useState, useCallback } from 'react';
import { TextField, Button } from '@mui/material';
import { addTodo } from '../app/websocket';
import ErrorDuplicated from './ErrorDuplicated';


const AddTodo = function () {
  const [todoInput, setTodoInput] = useState<string>('');

  const addTodoCallback = useCallback(() => {
    todoInput && addTodo(todoInput.trim());
    setTodoInput('');
  }, [todoInput]);

  return (
    <>
      <TextField value={todoInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoInput(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          addTodoCallback();
        }
      }} style={{ flex: 1 }} />
      <Button variant="contained" onClick={() => {
        addTodoCallback();
      }}>Add</Button>
      <ErrorDuplicated />
    </>
  )
}

export default AddTodo;