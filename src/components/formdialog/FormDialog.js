import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './formdialog.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { Box } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import { addCustomer, updateData } from '../../redux/user/user.actions';
import {
  addDataToFireStore,
  updateDataFromFireBase
} from '../../firebase/firebase';
import { useSnackbar } from 'notistack';
import { useStyles } from '../../utilities/global.styles';

function FormDialog({ dataToShow, rowData, rowIndex }) {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  let dataName = 'Customer',
    name = 'Name',
    budget = 'Budget',
    phone = 'Phone Number';

  let INITIAL_STATE = {
    id: '',
    name: '',
    budget: '',
    phone: '',
    rooms: '',
    floor: '',
    elevator: false,
    parking: false
  };

  const [state, setState] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setState(rowData ? rowData : INITIAL_STATE);
    return function cleanup() {
      setState('');
    };
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleCecked = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    updateDataFromFireBase(currentUser, state, dataToShow);
    dispatch(updateData(rowIndex, dataToShow, state));

    enqueueSnackbar(`${state.name} was succesfully updated`);
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentUser) {
      addDataToFireStore(currentUser, state, dataToShow).then((data) => {
        data.onSnapshot((snapShot) => {
          dispatch(addCustomer(snapShot.data()));

          enqueueSnackbar(
            `${state.name} was succesfully added to the database`,
            'success'
          );
          setState(INITIAL_STATE);
        });
      });
    }
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
        {!rowData ? (
          <Box
            display="flex"
            height={80}
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="outlined"
              className={classes.button}
              onClick={handleClickOpen}
              justify="center"
            >
              <FaceIcon fontSize="small" /> <div className="space"></div>
              {` Add  Customer`}
            </Button>
          </Box>
        ) : (
          <EditIcon
            onClick={handleClickOpen}
            style={{ color: '#22c58b' }}
            fontSize="small"
          />
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {rowData ? 'Update' : 'Add'} {`${dataName}`}
          </DialogTitle>
          <DialogContent>
            <div className="container">
              <div className="left">
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label={name}
                  type="text"
                  value={state.name}
                  onChange={handleChange}
                  fullWidth
                  className="field"
                />
                <TextField
                  margin="dense"
                  name="budget"
                  label={budget}
                  type="text"
                  value={state.budget}
                  onChange={handleChange}
                  fullWidth
                  className="field"
                />
                <TextField
                  margin="dense"
                  name="rooms"
                  label="Rooms"
                  type="number"
                  value={state.rooms}
                  onChange={handleChange}
                  fullWidth
                  className="field"
                />
              </div>
              <div className="right">
                <TextField
                  margin="dense"
                  name="phone"
                  label={phone}
                  type="text"
                  value={state.phone}
                  onChange={handleChange}
                  fullWidth
                  className="field"
                />
                <TextField
                  margin="dense"
                  name="floor"
                  label="Floor"
                  type="number"
                  value={state.floor}
                  onChange={handleChange}
                  fullWidth
                  className="field"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.elevator}
                      onChange={handleCecked}
                      name="elevator"
                    />
                  }
                  label="Elevator"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.parking}
                      onChange={handleCecked}
                      name="parking"
                    />
                  }
                  label="Parking"
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" className="button">
              Cancel
            </Button>
            {rowData ? (
              <div className="actions">
                <Button
                  onClick={handleUpdate}
                  variant="outlined"
                  className="button"
                >
                  Update {`${dataName}`}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="outlined"
                className="button"
              >
                Add {`${dataName}`}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}

export default FormDialog;
