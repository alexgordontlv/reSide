import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  list: {
    maxHeight: '500px',
    maxWidth: 600,
    overflow: 'auto'
  },
  row: {
    backgroundColor: 'white',
    marginBottom: '3px',
    opacity: '0.8',
    borderRadius: '1px',
    maxHeight: '65px'
  },

  icon: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 'medium'
  }
}));
