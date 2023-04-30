import { useState, useCallback } from 'react';
import { Snackbar, Alert, Button, AlertColor } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectErrorMsg, updateErrorMsg } from '../reducer/todoReducer';
import { completeTodo } from '../app/websocket';


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
    }}>re add</Button>;
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