import React, { useEffect } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Slide,
  Grid,
} from "@material-ui/core";
import FormDialog from "../formdialog/FormDialog";
import { useSelector, useDispatch } from "react-redux";
import { Delete } from "@material-ui/icons";
import TimePicker from "../timepicker/TimePicker";
import useStyles from "./listStyles";
import { GiElevator } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { deleteDataFromFireBase } from "../../firebase/firebase";
import { deleteData } from "../../redux/user/user.actions";
import { useSnackbar } from "notistack";

function Display2({ dataToShow, searchValue }) {
  const [state, setState] = React.useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    return function cleanup() {
      setState("");
    };
  }, [dataToShow]);

  const handleDelete = (rowData, rowIndex) => {
    deleteDataFromFireBase(currentUser, rowData.id, dataToShow);
    dispatch(deleteData(rowIndex, dataToShow));
    enqueueSnackbar(`${rowData.name} was succesfully deleted!`);
  };

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
    <div>
      <MUIList
        dense={false}
        style={{ maxWidth: "100%" }}
        width="100%"
        className={classes.list}
      >
        {dataRows.map((row, index) => (
          <Slide direction="down" in mountOnEnter unmountOnExit key={row.id}>
            <ListItem
              alignItems="center"
              className={row.parking ? classes.rowRed : classes.rowGreen}
            >
              <ListItemAvatar>
                <div>
                  {row.elevator && <GiElevator className={classes.icon} />}
                  {row.parking && <AiFillCar className={classes.icon} />}
                </div>
              </ListItemAvatar>
              <Grid
                className={classes.grid}
                container
                alignItems="center"
                justify="center"
              >
                <Grid item xs={4} sm={4}>
                  <ListItemText
                    primary={dataToShow === "customers" ? "Name" : "Address"}
                    secondary={
                      row.name.length > 12
                        ? row.name.slice(0, 10) + "..."
                        : row.name
                    }
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <ListItemText
                    primary={dataToShow === "customers" ? "Phone" : "Contact"}
                    secondary={row.phone || "- - - - - -"}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <ListItemText
                    primary={dataToShow === "customers" ? "Budget" : "Price"}
                    secondary={row.budget}
                  />
                </Grid>
              </Grid>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <TimePicker rowData={row} />
                </IconButton>
                <IconButton edge="end" aria-label="edit">
                  <FormDialog
                    dataToShow={dataToShow}
                    rowData={row}
                    rowIndex={index}
                    style={{ alignItems: "center" }}
                  />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <Delete
                    onClick={() => {
                      handleDelete(row, index);
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
  );
}

export default Display2;
