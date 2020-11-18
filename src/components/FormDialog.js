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
import {addCustomer,addProperty} from '../redux/user/user.actions';
import {auth,addDataToFireStore} from '../firebase/firebase';
function FormDialog({addCustomer,addProperty,dataToShow}) {
  let name, budget, phone,dataName = null;
 if(dataToShow==='customers'){
   dataName='Customer'
   name = 'Name'
   budget = 'Budget'
   phone = 'Phone Number'
 }else{
    dataName='Property'
    name = 'Address'
    budget = 'Price'
    phone = 'Contact'
 }
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

  const handleSubmit = (event) =>{

    event.preventDefault();
    setState(INITIAL_STATE)
    let user = auth.currentUser;
      if (user) {
        console.log('submit',user)
        addDataToFireStore(user,state,dataToShow)
        .then((data)=>{
          data.onSnapshot(snapShot => {
            if(dataToShow==='customers'){
              addCustomer(snapShot.data())
            }else{
              addProperty(snapShot.data())
            }

          })
        })
      }
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
        <DialogTitle id="form-dialog-title">Add {`${dataName}`}</DialogTitle>
        <DialogContent>
        <div className='container'>
        <div className='left'>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label={name}
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
              label={budget}
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
            name='phone'
            label={phone}
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
            Add {`${dataName}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addCustomer: (customer) => dispatch(addCustomer(customer)),
  addProperty: (customer) => dispatch(addProperty(customer))
})

export default  connect(null,mapDispatchToProps)(FormDialog);