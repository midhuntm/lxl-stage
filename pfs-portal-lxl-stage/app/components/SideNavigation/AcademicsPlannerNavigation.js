import React, { useState } from 'react';
import {
  Grid,
  IconButton,
  makeStyles,
  Menu,
  ListItem,
  Typography,
  Box,
  withStyles,
  List,
  Tooltip,
} from '@material-ui/core';
import Logo from '../../assets/Ken42logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import NestedMenuItem from './NestedMenuItem';
import { NavLink } from 'react-router-dom';
import CustomMenuItem from './CustomMenuItem';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:focus': {
      textDecoration: 'none',
      color: '#fff',
    },
  },
  listItem: {
    padding: '12px 20px',
    backgroundColor: 'inherit',
  },
  heading: {
    fontSize: 14,
    color: theme.palette.KenColors.sideNavColor,
    marginLeft: 28,
    marginTop: '-8px',
  },
  menuIcon: {
    color: theme.palette.KenColors.kenWhite,
  },
  logo: {
    height: '48px',
    background: theme.palette.KenColors.kenWhite,
    marginLeft: 12,
  },
  closeIcon: {
    marginRight: 8,
    color: theme.palette.KenColors.kenWhite,
    cursor: 'pointer',
  },
  closeLeftIcon: {
    color: theme.palette.KenColors.kenWhite,
    cursor: 'pointer',
  },
  menuButton: {
    marginLeft: 8,
  },
  hide: {
    display: 'none',
  },
  activeLinkInner: {
    backgroundColor: theme.palette.KenColors.sideNavBackgroundSecondary,
  },
  activeLinkOuter: {
    backgroundColor: theme.palette.KenColors.sideNavBackground,
  },
  menuTitle: {
    color: theme.palette.KenColors.kenWhite,
    padding: '16px',
  },
  popover: {
    // marginTop: '-25px',
    backgroundColor: theme.palette.KenColors.sideNavBackground,
  },
  listRoot: {
    // backgroundColor: theme.palette.KenColors.sideNavBackgroundSecondary,
    backgroundColor: 'inherit',
    color: 'inherit',
    opacity: 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.KenColors.sideNavBackgroundSecondary,
    },
  },
  list: {
    padding: 0,
    margin: 0,
    '&:hover': {
      backgroundColor: theme.palette.KenColors.sideNavBackgroundSecondary,
    },
  },
  icon: {
    color: theme.palette.KenColors.kenWhite,
    fontSize: 14,
  },
  item: {
    '&:hover': {
      backgroundColor: theme.palette.KenColors.sideNavBackgroundSecondary,
    },
  },
  fa: {
    fontSize: '22px',
    marginRight: '0.5rem',
  },
  header: {
    padding: '8px 16px',
    color: theme.palette.KenColors.kenWhite,
    fontSize: '14px',
    fontWeight: 600,
  },
  headerClass: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
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

export const AcademicsPlannerNavigation = (props) => {
  const { openDrawer, setOpenDrawer, menuList } = props;
  const classes = useStyles();
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedSubItems, setSelectedSubItems] = useState([]);

  const handleMenuClick = (event, item) => {
    if (Array.isArray(item.subItems) && item?.subItems?.length > 0) {
      setSelectedSubItems(item);
      if (menuPosition) {
        return;
      }
      event.preventDefault();
      let currentTargetRect = event.currentTarget.getBoundingClientRect();
      const event_offsetX = currentTargetRect.top - 25;
      const event_offsetY = currentTargetRect.right;

      setMenuPosition({
        top: event_offsetX,
        left: event_offsetY,
      });
    } else {
      setSelectedSubItems([]);
      return;
    }
  };

  const handleItemClick = (event) => {
    setMenuPosition(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <Box className={classes.root}>
        <Grid className={classes.headerClass}>
          {openDrawer === true ? (
            <>
              <img src={Logo} className={classes.logo} alt="Company logo" />
              <div className={classes.toolbar}>
                <MenuIcon
                  onClick={handleDrawerClose}
                  className={classes.closeIcon}
                />
              </div>
            </>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon className={classes.closeLeftIcon} />
            </IconButton>
          )}
        </Grid>
      </Box>
      <List>
        {menuList?.map((item, index) => (
          <Box key={index}>
            <NavLink
              key={index}
              className={classes.link}
              onClick={(e) => handleMenuClick(e, item)}
              to={
                item?.path === null || item?.path === undefined ? (
                  <Typography>{item?.path}</Typography>
                ) : (
                  item?.path
                )
              }
              activeClassName={classes.activeLinkOuter}
              exact
            >
              <ListItem
                classes={{
                  root: classes.listItem,
                  //   selected: classes.active,
                }}
                button
              >
                {openDrawer === false ? (
                  <LightTooltip title={item.label} placement="right-end">
                    <span className={classes.menuIcon}>
                      <Typography>{item.icon}</Typography>
                    </span>
                  </LightTooltip>
                ) : (
                  <span className={classes.menuIcon}>
                    <Typography>{item.icon}</Typography>
                  </span>
                )}
                <span className={classes.heading}>{item?.label}</span>
              </ListItem>
            </NavLink>
          </Box>
        ))}
      </List>
    </div>
  );
};

export default AcademicsPlannerNavigation;
