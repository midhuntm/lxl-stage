import React from 'react';

import {
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  List,
  withStyles,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.KenColors.sideNavBackgroundSecondary,
    },
    backgroundColor: 'inherit',
  },
  root: {
    // backgroundColor: 'inherit',
    color: 'inherit',
    opacity: 'inherit',
  },
  list: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  icon: {
    color: theme.palette.KenColors.kenWhite,
  },
  label: {
    fontSize: '14px',
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

function CustomMenuItem(props) {
  const { key = 0, onClick, openDrawer, label, icon, className } = props;
  const classes = useStyles();
  return (
    <MenuItem
      key={key}
      onClick={(e) => onClick(e)}
      className={clsx(classes.menuItem, className)}
    >
      <List classes={{ root: classes.list }}>
        <ListItem>
          {openDrawer === false ? (
            <LightTooltip title={label} placement="right-end">
              <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            </LightTooltip>
          ) : (
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
          )}

          <ListItemText
            primary={label}
            primaryTypographyProps={{ className: classes.label }}
          />
        </ListItem>
      </List>
    </MenuItem>
  );
}

export default CustomMenuItem;
