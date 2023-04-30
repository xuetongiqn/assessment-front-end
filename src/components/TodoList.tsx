import Grid from '@mui/material/Unstable_Grid2';
import { useAppSelector } from '../app/hooks';
import { selectTodoList, selectCompletedList, selectTodoSearchList, selectCompletedSearchList, selectSearchQuery } from '../reducer/todoReducer';
import ListView from '../components/ListView';


const TodoList = function () {
  const todoList = useAppSelector(selectTodoList);
  const completedList = useAppSelector(selectCompletedList);
  const todoSearchList = useAppSelector(selectTodoSearchList);
  const completedSearchList = useAppSelector(selectCompletedSearchList);
  const searchQuery = useAppSelector(selectSearchQuery);

  const todoDisplay = searchQuery ? todoSearchList : todoList;
  const completeDisplay = searchQuery ? completedSearchList : completedList

  return (
    <Grid container spacing={4}>
      <Grid flex={1}>
        <h3 style={{ textAlign: 'left' }}>To Do</h3>
        <hr />
        <ListView list={todoDisplay} highlight={searchQuery} />
      </Grid>
      <Grid flex={1}>
        <h3 style={{ textAlign: 'left' }}>Done</h3>
        <hr />
        <ListView list={completeDisplay} disabled={true} highlight={searchQuery} />
      </Grid>
    </Grid>
  )
}

export default TodoList;