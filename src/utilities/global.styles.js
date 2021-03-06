import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  button: {
    height: '40px',
    fontSize: 'small',
    borderColor: '#22c58b',
    color: 'white',
    backgroundColor: '#22c58b',
    '&:hover': {
      color: '#22c58b',
      backgroundColor: 'white'
    }
  }
}));
