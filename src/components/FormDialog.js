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
import {connect} from 'react-redux';
import {addCustomer} from '../redux/customers/customers.actions';
import {auth,addCustomerToFireStore} from '../firebase/firebase';
let id = 10;

function FormDialog({addCustomer}) {
  const INITIAL_STATE = {
    id: '',
    name: '',
    budget: '',
    phone: '',
    rooms: '',
    floor: '',
    elevator: false,
    parking: false,
    
  }
  const [state, setState] = React.useState(INITIAL_STATE);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleCecked = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [open, setOpen] = React.useState(false);

  const handleSubmit = () =>{
    
    setState(INITIAL_STATE)
    auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        const customerRef = await addCustomerToFireStore(userAuth,state);
        customerRef.onSnapshot(snapShot => {
          addCustomer(snapShot.data())
        })
      }

    })
    id++;

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
            <TextField
            autoFocus
            margin="dense"
            name="rooms"
            label="Rooms"
            type="text"
            value={state.rooms}
            onChange={handleChange}
            fullWidth
            className='field'
            />

          </div>
          <div className='right'>
          <TextField
            autoFocus
            margin="dense"
            name="phone"
            label="Phone Number"
            type="text"
            value={state.phone}
            onChange={handleChange}
            fullWidth
            className='field'
        />
        <TextField
        autoFocus
        margin="dense"
        name="floor"
        label="Floor"
        type="text"
        value={state.floor}
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
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addCustomer: (customer) => dispatch(addCustomer(customer))
})

export default  connect(null,mapDispatchToProps)(FormDialog);