import { Container, } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteAll from '../components/DeleteAll';
import AddTodo from '../components/AddTodo';
import Search from '../components/Search';
import TodoList from '../components/TodoList';

// The layout of the Todo page.
export default function TodoPage() {
  return (
    <Container maxWidth="md">
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid>
          <h1>Marvelous V2.0</h1>
        </Grid>
        <Grid>
          <DeleteAll />
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid alignItems='stretch' display='flex'>
          <AddTodo />
        </Grid>
        <Grid>
          <Search />
        </Grid>
      </Grid>
      <TodoList />
    </Container>
  )
}

