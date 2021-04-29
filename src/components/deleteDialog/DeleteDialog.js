import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Delete } from '@material-ui/icons';
import { deleteDataFromFireBase } from '../../firebase/firebase';
import { deleteData } from '../../redux/user/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';

import { useSnackbar } from 'notistack';

function FormDialog({ dataToShow, rowData, rowIndex }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    deleteDataFromFireBase(currentUser, rowData.id, dataToShow);
    dispatch(deleteData(rowIndex, dataToShow));
    enqueueSnackbar(`${rowData.name} was succesfully deleted!`);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box width="100%">
      <div>
        <Delete
          fontSize="small"
          onClick={handleClickOpen}
          style={{ color: '#22c58b', marginBottom: '4px' }}
        />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"></DialogTitle>
          <DialogContent>
            <div className="container">
              <h2>Are you sure you want to delete?</h2>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" className="button">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="outlined"
              className="button"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}

export default FormDialog;
