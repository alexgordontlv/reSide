import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 0
  }
});

const About = ({ name, budget, rooms, elevator, parking }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {name.split(',')[0]}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {name.split(',')[1]}
        </Typography>
        <Typography variant="body2" component="p">
          {budget}
        </Typography>
        <Typography variant="body2" component="p">
          {rooms}
        </Typography>
        <Typography variant="body2" component="p">
          {elevator && 'Elevator'}
        </Typography>
        <Typography variant="body2" component="p">
          {parking && 'Parking'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default About;
