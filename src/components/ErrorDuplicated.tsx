import { useCallback } from 'react';
import { Snackbar, Alert, Button, AlertColor } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectErrorMsg, updateErrorMsg } from '../reducer/todoReducer';
import { completeTodo } from '../app/websocket';

// ErrorDuplicated element will check the errorMsg in redux. If the errorMsg is not null
// which means user add a duplicated task, it will give a alert messae to user.
// Feature1: If the exist task is in "Done" list, give user a button to move it to "To Do" list.
// if the exist task is already in "To Do" list, gibe user a message and do nothing.
const ErrorDuplicated = function () {
  const errorMsg = useAppSelector(selectErrorMsg);
  const dispatch = useAppDispatch();

  const clearError = useCallback(() => {
    dispatch(updateErrorMsg(null));
  }, []);

  if (!errorMsg || errorMsg.errcode != '003') {
    return <></>;
  }

  let snackbarMsg: string; 
  let snackbarAction: JSX.Element | undefined;
  let snackbarSeverity: AlertColor;
  if (errorMsg.data.isCompleted) {
    snackbarMsg = `The task you add '${errorMsg.data.text}' is done.`;
    snackbarAction = <Button size="small" onClick={() => {
      completeTodo(errorMsg.data.id, false);
      clearError();
    }}>readd</Button>;
    snackbarSeverity = "warning";
  } else {
    snackbarMsg = `The task you add '${errorMsg.data.text}' is already in the list.`;
    snackbarAction = undefined;
    snackbarSeverity = "success";
  }

  return (
    <Snackbar open={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={clearError}
    >
      <Alert severity={snackbarSeverity} sx={{ width: '100%' }} action={snackbarAction}>
        {snackbarMsg}
      </Alert>
    </Snackbar>
  )
}

export default ErrorDuplicated;