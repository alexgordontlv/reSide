import React from 'react';
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Slide,
  Grid
} from '@material-ui/core';
import FormDialog from '../formdialog/FormDialog';
import { useSelector } from 'react-redux';
import TimePicker from '../timepicker/TimePicker';
import useStyles from './listStyles';
import { GiElevator } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import DeleteDialog from '../deleteDialog/DeleteDialog';

function Display2({ dataToShow, searchValue }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const classes = useStyles();

  const dataRows = currentUser
    ? dataToShow === 'customers'
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
        style={{ maxWidth: '100%' }}
        width="100%"
        className={classes.list}
        disablePadding
      >
        {dataRows.map((row, index) => (
          <Slide direction="down" in mountOnEnter unmountOnExit key={row.id}>
            <ListItem alignItems="center" className={classes.row}>
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
                  <ListItemText primary={row.name.split(',')[0]} />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <ListItemText
                    primary={
                      (
                        <NumberFormat
                          format="###-###-####"
                          value={row.phone}
                          displayType={'text'}
                        />
                      ) || '- - - - - -'
                    }
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <ListItemText
                    primary={
                      <NumberFormat
                        value={row.budget}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$ '}
                        color="#fffff"
                      />
                    }
                  />
                </Grid>
              </Grid>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="event">
                  {dataToShow === 'customers' ? (
                    <TimePicker rowData={row} />
                  ) : (
                    <div></div>
                  )}
                </IconButton>
                <IconButton edge="end" aria-label="edit">
                  <FormDialog
                    dataToShow={dataToShow}
                    rowData={row}
                    rowIndex={index}
                    style={{ alignItems: 'center' }}
                  />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteDialog
                    dataToShow={dataToShow}
                    rowData={row}
                    rowIndex={index}
                    style={{ alignItems: 'center' }}
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
