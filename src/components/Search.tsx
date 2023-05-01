import { TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectSearchQuery, updateSearchQuery } from '../reducer/todoReducer';
import { search } from '../app/websocket';

// The Search element get user's input and send it to server.
const Search = function () {
  const searchQuery = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();

  return (
    <TextField placeholder='Search...' value={searchQuery} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {
      const query = e.target.value;
      dispatch(updateSearchQuery(query));
      search(query);
    }} />
  )
}

export default Search;