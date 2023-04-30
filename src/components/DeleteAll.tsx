import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { removeAll } from '../app/websocket';

const DeleteAll = function () {
  const [removeModal, setRemoveModal] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setRemoveModal(true)}>Delete all tasks</Button><Dialog
        open={removeModal}
        onClose={() => setRemoveModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete all Tasks?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all tasks? Deletion cannot be undone, please proceed with caution.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveModal(false)}>Cancel</Button>
          <Button onClick={() => {
            removeAll();
            setRemoveModal(false);
          }} autoFocus>
            Delete All
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteAll;