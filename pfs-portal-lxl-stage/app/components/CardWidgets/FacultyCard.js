import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MapPin from '../../assets/Atom/map-pin.png';
import Avatar from '../../components/KenAvatar/index';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    [theme.breakpoints.only('xs')]: {
      width: 56,
      height: 53,
      borderRadius: '50%',
      border: 'none',
      marginTop: '12px',
      marginLeft: '12px',
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  marginIcon: {
    marginTop: '8px',
    marginLeft: '8px',
    marginRight: '8px',
  },
  fontName: {
    fontWeight: '600',
    fontSize: '14px',
    // lineHeight: '20px',
    color: theme.palette.KenColors.neutral900,
  },
  otherFont: {
    fontSize: '12px',
    // lineHeight: '14px',
    color: theme.palette.KenColors.neutral400,
  },
  city: {
    diplay: 'inline',
    background: theme.palette.KenColors.neutral20,
    fontSize: '12px',
    // lineHeight: '14px',
    borderRadius: '3px',
    color: theme.palette.KenColors.neutral400,
  },
  post: {
    fontSize: '12px',
    // lineHeight: '14px',
    color: theme.palette.KenColors.neutral900,
  },
}));

export default function Cards(props) {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      // style={{ borderLeft: `3px solid ${props.data.color}` }}
    >
      {/* <CardMedia 
            className={classes.cover}
            image={props.data.img}
        /> */}
      <Grid
        md={4}
        sm={4}
        style={{ display: 'flex', alignItems: 'center', paddingLeft: 10 }}
      >
        <Avatar size={'ExtraLarge'} value={props.data.name.charAt(0)} />
      </Grid>

      <Grid md={5} sm={5} className={classes.details}>
        <CardContent className={classes.content}>
          <Box>
            <Typography className={classes.fontName}>
              {props.data.name}
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.post}>{props.data.post}</Typography>
            <Typography className={classes.otherFont} color="primary">
              {props.data.dept}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography className={classes.city} component="span">
              <img src={MapPin} height="12px" />
              &nbsp;{props.data.city}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography className={classes.otherFont}>
              {props.data.email}
            </Typography>
            <Typography className={classes.otherFont}>
              {props.data.mobile}
            </Typography>
          </Box>
        </CardContent>
      </Grid>

      <Grid md={3} sm={3} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={props.data.icon} className={classes.marginIcon} />
      </Grid>
    </Card>
  );
}
