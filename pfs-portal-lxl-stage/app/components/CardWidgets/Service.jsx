import React from 'react';
import CardImg from '../../assets/icons/Math.png';
import phoneImg from '../../assets/icons/phone.svg';
import globeImg from '../../assets/icons/Globe.svg';
import { Box, Grid, makeStyles } from '@material-ui/core';
import color from '../../utils/themes/KenColors';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BootstrapButton = withStyles(theme => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '10px',
    color: `${theme.palette.KenColors.primary}`,
    padding: '6px 12px',
    border: `1px solid ${theme.palette.KenColors.neutral160}`,
    backgroundColor: theme.palette.KenColors.kenWhite,
    maxHeight: '24px',
    maxWidth: '84px',
    '&:hover': {
      backgroundColor: theme.palette.KenColors.primary,
      borderColor: theme.palette.KenColors.primary,
    },
    '&:active': {
      backgroundColor: theme.palette.KenColors.primary,
      borderColor: theme.palette.KenColors.primary,
    },
    '&:focus': {
      boxShadow: `0 0 0 0.2rem ${theme.palette.KenColors.shadowColor}`,
    },
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '370px',
    minHeight: '150px',
    background: 'white',
    borderRadius: '3px',
    boxShadow: `1x 0px 9px ${theme.palette.KenColors.shadowColor}`,
  },
  Heading: {
    fontSize: '14px',
    fontWeight: 600,
    color: `${theme.palette.KenColors.neutral900}`,
  },
  Img: {
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.KenColors.secondaryYellow1}`,
  },
  control: {
    padding: theme.spacing(1),
  },
  Description: {
    fontSize: '10px',
    color: `${theme.palette.KenColors.neutral400}`,
    lineHeight: '16px',
  },
  url: {
    fontSize: '10px',
    color: `${theme.palette.KenColors.primary}`,
  },
}));

export default function ParentService(props) {
  const { Heading, Description, Url, PhoneNo, Button, imageURL } = props.data;
  const { minHeight } = props.dimensions;

  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      p={1}
      style={
        minHeight
          ? { minHeight: `${minHeight}`, maxWidth: '370px' }
          : { maxWidth: '370px', minHeight: '150px' }
      }
    >
      <Grid container>
        <Grid item xs={9} sm={9} md={9}>
          <Box className={classes.Heading} p={1}>
            {Heading}
          </Box>
          <Box className={classes.Description} p={1}>
            {Description}
          </Box>
          {Url && 1 ? (
            <Box className={classes.url} p={1}>
              <img src={globeImg} height="10px" />
              &nbsp;{Url}
            </Box>
          ) : null}
          {PhoneNo && 1 ? (
            <Box className={classes.url} p={1}>
              <img src={phoneImg} height="10px" />
              &nbsp;{PhoneNo}
            </Box>
          ) : null}

          {Button && 1 ? (
            <Box pl={1} mt={1}>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
              >
                {Button}
              </BootstrapButton>
            </Box>
          ) : null}
        </Grid>

        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          container
          justify="center"
          style={{ height: '100%' }}
        >
          <Box
            pt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img src={imageURL || CardImg} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
