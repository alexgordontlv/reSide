import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IconButton} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './formdialog.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Customers} from '../display/customers';
let globID = 10;

export default function FormDialog() {

  const [state, setState] = React.useState({
    
    id: '',
    name: '',
    budget: '',
    number: '',
    rooms: '',
    floor: '',
    elevator: false,
    parking: false,
    
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleCecked = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [open, setOpen] = React.useState(false);

  const handleSubmit = () =>{
    Customers.push({...state,globID});
    globID++;
    setOpen(false);
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <IconButton>
        <AddCircleIcon  color="secondary"   fontSize="large" onClick={handleClickOpen}/>
    </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Customer:</DialogTitle>
        <DialogContent>
        <div className='container'>
        <div className='left'>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              value={state.name}
              onChange={handleChange}
              fullWidth
              className='field'
            />
            <TextField
              autoFocus
              margin="dense"
              name="budget"
              label="Budget"
              type="text"
              value={state.budget}
              onChange={handleChange}
              fullWidth
              className='field'
          />
          </div>
          <div className='right'>
          <TextField
            autoFocus
            margin="dense"
            name="number"
            label="Phone Number"
            type="text"
            value={state.number}
            onChange={handleChange}
            fullWidth
            className='field'
        />
        <TextField
        autoFocus
        margin="dense"
        name="budget"
        label="Budget"
        type="text"
        value={state.budget}
        onChange={handleChange}
        fullWidth
        className='field'
      />
      <FormControlLabel
      control={<Checkbox checked={state.elevator} onChange={handleCecked} name="elevator" />}
      label="Elevator"
    />
    <FormControlLabel
    control={<Checkbox checked={state.parking} onChange={handleCecked} name="parking" />}
    label="Parking"
  />
        </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="outlined">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
