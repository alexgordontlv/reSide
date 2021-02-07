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
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles = makeStyles({
  root: {
    maxWidth: 150,
    margin: '0px auto'
  },
  media: {
    margin: '0px auto',
    width: '100%',
    height: 320,
    position: 'relative',
    zIndex: 1000,
    borderBottom: '10px solid var(--app-color)'
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
          <Typography gutterBottom variant="h10" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>{`$${budget}`}</p>
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
