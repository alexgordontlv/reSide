import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
  root: {
    maxWidth: 250
  },
  media: {
    width: '100%',
    height: 220
  },
  footer: {
    textAlign: 'center'
  }
});

const About = ({ name, budget, rooms, elevator, parking }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Card className={classes.root} align="center">
        <CardContent>
          <Typography gutterBottom component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>
              <NumberFormat
                value={budget}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$ '}
                color="#fffff"
              />
            </p>
            <p>{`${rooms} rooms`}</p>
            <p>{elevator && 'Elevator'}</p>
            <p>{parking}</p>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default About;
