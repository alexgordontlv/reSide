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
  Button,
} from "@material-ui/core";
import FormDialog from "../formdialog/FormDialog";
import { useSelector } from "react-redux";
import { Delete } from "@material-ui/icons";
import TimePicker from "../timepicker/TimePicker";
import { SnackbarProvider } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./listStyles";
import EditIcon from "@material-ui/icons/Edit";
import { GiElevator } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import EventIcon from "@material-ui/icons/Event";

function Display2({ dataToShow, searchValue }) {
  const [state, setState] = React.useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const classes = useStyles();
  useEffect(() => {
    currentUser?.customers?.map((row) => (row.budget = "250000"));
    return function cleanup() {
      setState("");
    };
  }, [dataToShow]);

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
        <FormDialog
          dataToShow={dataToShow}
          rowData={null}
          style={{ alignItems: "center" }}
        />
        <MUIList dense={false} className={classes.list}>
          {dataRows.map((row) => (
            <Slide direction="down" in mountOnEnter unmountOnExit key={row.id}>
              <ListItem
                alignItems="center"
                className={row.parking ? classes.rowRed : classes.rowGreen}
              >
                <ListItemAvatar>
                  <div>
                    <GiElevator className={classes.icon} />{" "}
                    <AiFillCar className={classes.icon} />
                  </div>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    row.name.length > 12
                      ? row.name.slice(0, 10) + "..."
                      : row.name
                  }
                  secondary={row.budget}
                />

                <ListItemText
                  primary={
                    row.phone.length > 12
                      ? row.phone.slice(0, 10) + "..."
                      : row.phone
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick="">
                    <EventIcon onClick="" style={{ color: "black" }} />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick="">
                    <FormDialog
                      dataToShow={dataToShow}
                      rowData={row}
                      style={{ alignItems: "center" }}
                    />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick="">
                    <Delete
                      onClick={() => {
                        setState(!state);
                      }}
                      style={{ color: "black" }}
                    />
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
