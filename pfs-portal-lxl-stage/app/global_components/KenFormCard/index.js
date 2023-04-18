import React from 'react';
import styled from 'styled-components';

import HelpIcon from './assets/help.svg';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Box, Paper } from '@material-ui/core';

import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: `0px 0px 9px ${theme.palette.KenColors.shadowColor}`,
    borderRadius: 3,
    width: '100%',
  },
  header: {
    borderBottom: `1px solid ${theme.palette.KenColors.neutral40}`,
  },
  title: {
    textTransform: 'uppercase',
    color: theme.palette.KenColors.neutral700,
    lineHeight: '22px',
  },
  help: {
    height: 21,
  },
}));

const KenFormCard = function(props) {
  const { title, children, helpText, innerStyles } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleHelpClick = event => {
    if (helpText) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleHelpClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'form-popover' : undefined;
  //console.log(props)

  return (
    <Box m={4} style={innerStyles}>
      <Paper className={classes.root}>
        <Box className={classes.header} p={5} pb={2} pt={3}>
          <Grid container justify="space-between">
            <Grid item align="center">
              <Typography className={classes.title}>{title}</Typography>
            </Grid>
            <Grid item className={classes.help}>
              <img src={HelpIcon} alt="help" onClick={handleHelpClick} />
            </Grid>
          </Grid>
        </Box>
        <Box p={5}>{children}</Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleHelpClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>
            {props.helpText}
          </Typography>
        </Popover>
      </Paper>
    </Box>
  );
};

export default KenFormCard;
