import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    color: theme.palette.KenColors.primary
  },
  appBar: {
    backgroundColor: theme.palette.KenColors.kenWhite,
    color: theme.palette.KenColors.kenBlack,
  },
  gutters: {
    paddingLeft: '16px',
    paddingRight: '16px',
    borderRadius: '3px',
  },
  regular: {
    minHeight: '56px',
  },
  subjectTitle: {
    fontSize: 15,
    color: theme.palette.KenColors.neutral900
    // color: theme.palette.KenColors.primary
  }
}));

export default function KenAppBar(props) {
  const classes = useStyles();
  const { title, children, menuIcon, subjectName } = props;

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        classes={{ root: classes.appBar }}
        elevation={0}
      >
        <Toolbar
          classes={{ gutters: classes.gutters, regular: classes.regular }}
        >
          {menuIcon && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              {menuIcon}
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {title} {subjectName && <span className={classes.subjectTitle}>   |   Subject : {subjectName}</span>}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </div>
  );
}
