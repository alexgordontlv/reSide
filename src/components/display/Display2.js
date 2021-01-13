import React, { useState, useEffect } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from "@material-ui/core";
import FormDialog from "../formdialog/FormDialog";
import { useSelector } from "react-redux";
import { Delete } from "@material-ui/icons";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import TimePicker from "../timepicker/TimePicker";
import { SnackbarProvider } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./listStyles";
import LocalParkingRoundedIcon from "@material-ui/icons/LocalParkingRounded";
import EditIcon from "@material-ui/icons/Edit";

function Display2({ dataToShow, searchValue }) {
  const [state, setState] = React.useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const classes = useStyles();
  useEffect(() => {
    return function cleanup() {
      setState("");
    };
  }, [dataToShow]);

  let name,
    budget,
    phone = null;
  if (dataToShow === "customers") {
    name = "Name";
    budget = "Budget";
    phone = "Phone Number";
  } else {
    name = "Address";
    budget = "Price";
    phone = "Contact";
  }

  const dataRows = currentUser
    ? dataToShow === "customers"
      ? currentUser.customers.filter((customer) =>
          customer.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : currentUser.properties.filter((property) =>
          property.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    : [];

  return (
    <SnackbarProvider maxSnack={3}>
      <div>
        <FormDialog dataToShow={dataToShow} rowData={null} />
        <MUIList dense={false} className={classes.list}>
          {dataRows.map((row) => (
            <Slide direction="down" in mountOnEnter unmountOnExit key={row.id}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar
                    className={
                      dataToShow === "customers"
                        ? classes.avatarIncome
                        : classes.avatarExpense
                    }
                  >
                    <PermIdentityIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={row.name}
                  secondary={`${row.budget}₪   ------  ${row.phone}`}
                />
                <ListItemText primary={row.phone} />
                <ListItemSecondaryAction>
                  <LocalParkingRoundedIcon edge="end" fontSize="small" />
                  <IconButton edge="center" aria-label="delete" onClick="">
                    <Delete onClick="" />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick="">
                    <EditIcon onClick="" />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick="">
                    <Delete onClick="" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Slide>
          ))}
        </MUIList>
      </div>
    </SnackbarProvider>
  );
}

export default Display2;
