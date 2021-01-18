import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 50,
  },
  media: {
    margin: "0px auto",
    width: "100%",
    height: 320,
    position: "relative",
    zIndex: 1000,
    borderBottom: "10px solid var(--app-color)",
  },
  footer: {
    textAlign: "center",
  },
});

const About = () => {
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
        <CardMedia
          component="img"
          className={classes.media}
          alt="Contemplative Reptile"
          height="140"
          src="https://avatars3.githubusercontent.com/u/62938794?s=460&u=3aae313e7026179f2649783c6deeebe6675136f6&v=4"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Alexander Gordon
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Full-Stack Developer with big passion to learn new tools and
            technology!
            <p>React.js, Node.js, Next.js, FireBase, Python</p>
          </Typography>
        </CardContent>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <CardActions className={classes.footer}>
            <a
              href="https://www.linkedin.com/in/alexgordontlv/"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            <a href="https://www.github.com/alexgordontlv/" target="_blank">
              <GitHubIcon />
            </a>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
};

export default About;
