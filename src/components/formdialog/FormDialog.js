import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./formdialog.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import {
  addCustomer,
  addProperty,
  deleteData,
  updateData,
} from "../../redux/user/user.actions";
import {
  addDataToFireStore,
  deleteDataFromFireBase,
  updateDataFromFireBase,
} from "../../firebase/firebase";
import { SnackbarProvider, useSnackbar } from "notistack";

function FormDialog({ dataToShow, rowData, rowIndex }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  let name,
    budget,
    phone,
    dataName = null;
  if (dataToShow === "customers") {
    dataName = "Customer";
    name = "Name";
    budget = "Budget";
    phone = "Phone Number";
  } else {
    dataName = "Property";
    name = "Address";
    budget = "Price";
    phone = "Contact";
  }
  let INITIAL_STATE = {
    id: "",
    name: "",
    budget: "",
    phone: "",
    rooms: "",
    floor: "",
    elevator: false,
    parking: false,
  };
  const [state, setState] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setState(rowData ? { ...rowData } : INITIAL_STATE);
    return function cleanup() {
      setState("");
    };
  }, [rowData]);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleCecked = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteDataFromFireBase(currentUser, state.id, dataToShow);
    dispatch(deleteData(rowIndex, dataToShow));
    setOpen(false);
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(rowIndex);
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
          if (dataToShow === "customers") {
            dispatch(addCustomer(snapShot.data()));
          } else {
            dispatch(addProperty(snapShot.data()));
          }
          enqueueSnackbar(
            `${state.name} was succesfully added to the database`,
            "success"
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
    <div>
      {!rowData ? (
        <IconButton>
          <AddCircleIcon
            color="secondary"
            fontSize="large"
            onClick={handleClickOpen}
          />
        </IconButton>
      ) : (
        <Button onClick={handleClickOpen} variant="outlined">
          Modify {`${dataName}`}
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {rowData ? "Update" : "Add"} {`${dataName}`}
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
                type="text"
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
                type="text"
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
                onClick={handleDelete}
                variant="outlined"
                className="button"
              >
                Delete {`${dataName}`}
              </Button>
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
  );
}

export default FormDialog;
