import { List, ListItem, ListItemIcon, ListItemText, Checkbox, CircularProgress } from '@mui/material';
import { TodoItem } from '../reducer/todoReducer';
import { completeTodo } from '../app/websocket';

export type ListViewProps = {
  list: TodoItem[] | null;
  disabled?: boolean;
  highlight: string;
}

// Replace the keywords to 'span' wrapped element from string.
export function highlightText(text: string, highlight: string): (JSX.Element | string)[] {
  let result: (JSX.Element | string)[] = [];
  text.split(highlight).forEach((str: string, i: number) => {
    i > 0 && result.push(<span key={`highlight${i}`} style={{ color: 'red' }}>{highlight}</span>);
    result.push(str)
  });

  return result;
}
// The ListView element shows the todo or done list. When user click the checkbox,
// it will call the socket function to send message to server.
// 2 special types, uninital: progress animation, empty array: empty message, 
export default function ListView({ list, highlight = '' }: ListViewProps) {
  if (!list) {
    return <CircularProgress />
  }
  if (list.length == 0) {
    return <div style={{ color: '#ccc' }}>The list is empty</div>;
  }

  return (
    <div>
      <List>
        {list.map(item => (
          <ListItem key={`${item.id}`}>
            <ListItemIcon>
              <Checkbox checked={item.isCompleted} onClick={() => {
                completeTodo(item.id, !item.isCompleted);
              }} />
            </ListItemIcon>
            <ListItemText style={{ wordBreak: 'break-all' }}>{highlight ? highlightText(item.text, highlight) : item.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )
}