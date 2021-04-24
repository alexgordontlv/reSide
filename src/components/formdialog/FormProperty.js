import React, { useEffect, useState } from 'react';
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
import { Box } from '@material-ui/core';

import { addProperty } from '../../redux/user/user.actions';
import { addDataToFireStore } from '../../firebase/firebase';
import { useSnackbar } from 'notistack';

function FormDialog({ openNow, setopenNow, propsToPass }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const INITIAL_STATE = {
    id: '',
    name: '',
    budget: '',
    phone: '',
    rooms: '',
    floor: '',
    elevator: false,
    parking: false,
    lat: '',
    lng: ''
  };
  const [state, setState] = useState(INITIAL_STATE);
  const dispatch = useDispatch();

  useEffect(() => {
    const { address, lat, lng } = propsToPass;
    setState({ ...state, name: address, lat: lat, lng: lng });
    return () => {
      setState('');
    };
  }, [openNow, propsToPass]);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleCecked = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentUser) {
      console.log(state);
      addDataToFireStore(currentUser, state, 'properties').then((data) => {
        data.onSnapshot((snapShot) => {
          dispatch(addProperty(snapShot.data()));
          enqueueSnackbar(
            `${state.name} was succesfully added to the database`,
            'success'
          );
        });
      });
    }
    setState(INITIAL_STATE);
    setopenNow(false);
  };

  const handleClose = () => {
    setopenNow(false);
  };

  return (
    <Box width="100%">
      <div>
        <Dialog
          open={openNow}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"></DialogTitle>
          <DialogContent>
            <div className="container">
              <div className="left">
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Address"
                  type="text"
                  value={state.name}
                  onChange={handleChange}
                  fullWidth
                  className="field"
                />
                <TextField
                  margin="dense"
                  name="budget"
                  label="Price"
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
                  label="Contact"
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
            <Button
              onClick={handleSubmit}
              variant="outlined"
              className="button"
            >
              Add {`Property`}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}

export default FormDialog;
