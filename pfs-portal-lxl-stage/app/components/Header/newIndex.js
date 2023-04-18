import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, Box } from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import routes from '../../utils/routes.json';
import clsx from 'clsx';
import AppsIcon from '@material-ui/icons/Apps';
import KenIcon from '../../global_components/KenIcon';
import DashboardCard from '../DashboardCard';
import KenPopover from '../KenPopover';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Link } from 'react-router-dom';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: 8,
    },
  },
  searchContainer: {
    width: '100%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '50%',
    margin: 'auto',
    border: `1px solid ${theme.palette.KenColors.neutral60}`,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  searchIcon: {
    color: theme.palette.KenColors.neutral60,
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
  inputRoot: {
    color: 'inherit',
    borderRadius: '3px',
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    background: theme.palette.KenColors.sideNavItemHoverColor,
    color: theme.palette.KenColors.KenBlack,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    background: theme.palette.KenColors.sideNavItemHoverColor,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuItem: {
    padding: theme.spacing(1, 3),
  },
  user: {
    fontSize: '14px',
    fontWeight: 'bold',
    padding: theme.spacing(1, 2),
  },
  plainLink: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.KenColors.kenWhite,
  },
  logoWrap: {
    width: 60,
    height: 60,
  },
  toolbar: {
    paddingLeft: 8,
  },
  logoWithTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  labelOpen: {
    marginLeft: 30,
    color: theme.palette.KenColors.KenBlack,
  },
  labelClose: {
    marginLeft: 16,
    color: theme.palette.KenColors.KenBlack,
  },
  kenIcon: {
    color: theme.palette.KenColors.neutral60,
    margin: 'auto 4px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  margin: {
    margin: 'auto 8px',
  },
  popover: {
    width: '320px',
    padding: '10px',
  },
  logoTitleWrap: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export default function ElevateAppBar(props) {
  const { title, style, logo, history, openDrawer, cards = [], config } = props;

  const userName = '';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'apps-popover' : undefined;

  const classes = useStyles();

  const onLogoutSuccess = () => {
    localStorage.clear();
    history.replace(`${routes.login}`);
  };

  const onFailure = () => {
    console.log('logout fail');
  };

  const isMenuOpen = Boolean(anchorElMenu);

  const handleProfileMenuOpen = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      disableScrollLock={true}
      anchorEl={anchorElMenu}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography className={classes.user}>{userName}</Typography>
      <MenuItem onClick={handleMenuClose} disabled className={classes.menuItem}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} disabled className={classes.menuItem}>
        Account Settings
      </MenuItem>

      <GoogleLogout
        // clientId="1038831750840-a3jmndm3o4ldb06a8pcqqn1sc72lus0k.apps.googleusercontent.com"
        clientId={config?.google?.clientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
        onFailure={onFailure}
        icon={false}
        render={(renderProps) => (
          <MenuItem className={classes.menuItem} {...renderProps}>
            Logout
          </MenuItem>
        )}
      ></GoogleLogout>
    </Menu>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        data-testid="header"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
        elevation={0}
        style={style}
      >
        <Toolbar className={classes.toolbar}>
          <Link to="/dashboard" className={classes.logoTitleWrap}>
            {!openDrawer && (
              <KenIcon
                src={logo}
                iconType="img"
                className={`${classes.kenIcon} ${classes.margin}`}
                variant="large"
                styles={{ marginLeft: 75 }}
              />
            )}
            <Typography className={classes.title} variant="h6">
              {title}
            </Typography>
          </Link>
          {/* <div className={classes.searchContainer}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search here…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div> */}
          <div className={classes.grow} />
          <Typography>Hi Nandhini Clament, Good Morning</Typography>
          <div className={classes.sectionDesktop}>
            <KenIcon
              icon={AppsIcon}
              className={classes.kenIcon}
              variant="large"
              onClick={handlePopoverOpen}
            />
            <KenIcon
              icon={NotificationsNoneIcon}
              className={classes.kenIcon}
              variant="large"
            />
            <KenIcon
              icon={MailOutlineIcon}
              className={classes.kenIcon}
              variant="large"
            />
            <KenIcon
              icon={AccountCircle}
              className={classes.kenIcon}
              variant="large"
            />
            <KenIcon
              icon={ExpandMoreIcon}
              className={classes.kenIcon}
              variant="medium"
              onClick={handleProfileMenuOpen}
            />
          </div>
          <div className={classes.sectionMobile}>
            <KenIcon
              icon={AppsIcon}
              className={classes.kenIcon}
              variant="large"
              onClick={handlePopoverOpen}
            />
            <KenIcon
              icon={NotificationsNoneIcon}
              className={classes.kenIcon}
              variant="large"
            />
            <KenIcon
              icon={MailOutlineIcon}
              className={classes.kenIcon}
              variant="large"
            />
            <KenIcon
              icon={AccountCircle}
              className={classes.kenIcon}
              variant="large"
              onClick={handleProfileMenuOpen}
            />
          </div>
          <KenPopover
            disableScrollLock={true}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box className={classes.popover}>
              <Grid container spacing={1}>
                {cards?.map((item, index) => {
                  return (
                    <Grid item md={4} sm={4} xs={4} key={index}>
                      <DashboardCard
                        {...item}
                        variant="small"
                        handlePopoverClose={handlePopoverClose}
                      ></DashboardCard>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </KenPopover>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </React.Fragment>
  );
}
