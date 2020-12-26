import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MySnackFunction({value}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (value) => {
    enqueueSnackbar(value);
  };

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
    </React.Fragment>
  );
}

export function IntegrationNotistack(value) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MySnackFunction props={value}/>
    </SnackbarProvider>
  );
}

export default MySnackFunction;