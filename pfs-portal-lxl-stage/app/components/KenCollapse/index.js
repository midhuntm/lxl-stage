import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { Box, Grid } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // height: 260,
    overflow: 'hidden',
    '& .MuiCollapse-entered': {
      height: '220px !important',
      overflowY: 'auto',
      background: theme.palette.KenColors.lightGray10,
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        background: theme.palette.KenColors.scrollbarColor,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.KenColors.neutral700}`,
      },
    },
  },

  primaryText: {
    fontSize: 12,
    marginLeft: 12,
    color: theme.palette.KenColors.neutral400,
  },
  header: {
    cursor: 'pointer',
    padding: 8,
    background: theme.palette.KenColors.lightGray10,
  },
}));

export default function KenAvatar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const { label, children } = props;

  return (
    <Box
      className={classes.wrapper}
      style={{
        background: open ? '#F7F8F9' : 'transparent',
      }}
    >
      <Grid
        className={classes.header}
        container
        justify="space-between"
        alignItems="center"
        onClick={handleClick}
      >
        <Typography className={classes.primaryText}>{label}</Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Grid>
      <Collapse in={open} timeout="auto" >
        {children}
      </Collapse>
    </Box>
  );
}
