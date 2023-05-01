import { useState, useCallback } from 'react';
import { TextField, Button } from '@mui/material';
import { addTodo } from '../app/websocket';
import ErrorDuplicated from './ErrorDuplicated';

// AddTodoElement brings a search input and add button. Click add button or type 'Enter' in
// the input box will triggle the action. 
// The ErrorDuplicated element will show some feedback infomation of the add action.
const AddTodoElement = function () {
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

export default AddTodoElement;