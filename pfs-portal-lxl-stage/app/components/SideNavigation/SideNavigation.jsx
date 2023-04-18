  import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { Link, NavLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {
  getUserDetails,
  getParentDetails,
} from '../../utils/helpers/storageHelper';
import Hidden from '@material-ui/core/Hidden';
import history from '../../utils/history';
import { useTranslation } from 'react-i18next';
import ken42Logo from '../../assets/LXLlogo.png';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import configContext from '../../utils/helpers/configHelper';
import {
  KEY_USER_TYPE,
  KEY_PORTAL_TYPE,
  KEY_FIRE_REG_TOKEN,
  KEY_PARENT_DETAILS,
  KEY_USER_DETAILS,
} from '../../utils/constants';
import Routes from '../../utils/routes.json';
// import { unsubscribeMessage } from '../../utils/MessageHelper';
import { getMarketplaceURL, createAttribute } from '../../utils/ApiService';
import context from '../../utils/helpers/context';
import IconButton from '@material-ui/core/IconButton';

//icons
import Home from '@material-ui/icons/Home';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined'; // classroom
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined'; // event
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined'; //time table
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined'; // course , report card
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined'; // my student
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined'; // market
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined'; // account
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined'; // fee
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import KenDialog from '../../components/KenDialogBox/index';
import KenCheckbox from '../../global_components/KenCheckbox';
import { FaRupeeSign, FaUserGraduate } from 'react-icons/fa';
import { IoMdCalendar } from 'react-icons/io';
import { GiTakeMyMoney, GiMoneyStack } from 'react-icons/gi';
import ShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DescriptionIcon from '@material-ui/icons/Description';
import CustomMenuItem from './CustomMenuItem';
import { List } from '@material-ui/core';
import NestedMenuItem from './NestedMenuItem';
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import { hasChildren } from './hasChilder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'; //Lms dashboard
import Collapse from '@material-ui/core/Collapse';
// import './index.css';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // flex: 1,
  },
  root1: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    width: drawerWidth,
    whiteSpace: 'nowrap',
    background: `url(${ken42Logo})`,
    backgroundRepeat: 'round',
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 99999,
    // background: theme.palette.KenColors.drawerBackground,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      zIndex: 1,
      paddingTop: 105,
    },
  },
  displayDrawer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '91vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px #d1d1d1`,
      webkitBoxShadow: `inset 0 0 6px #d1d1d1`,
      backgroundColor: `inset 0 0 6px #d1d1d1`,
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `inset 0 0 6px #d1d1d1`,
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 8,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 0, 2),
    padding: theme.spacing(0, 2, 2, 2),
  },
  poweredBy: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 10px',
  },
  logo: {
    maxHeight: 48,
    maxWidth: 160,
  },
  title: {
    fontSize: '10px',
    margin: theme.spacing(0, 2),
    color: theme.palette.KenColors.kenWhite,
    textAlign: 'end',
  },
  resources: {
    // margin: theme.spacing(0, 2),
    // paddingLeft: '32px',
    // marginLeft: 25,
    padding: 0,
  },
  subLevel: {
    // marginLeft: '10px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    color: theme.palette.KenColors.kenWhite,
    height: 'auto',
    // '&:hover': {
    //   color: 'white',
    // },
  },
  link: {
    textDecoration: 'none',
    backgroundColor: 'inherit',
    color:
      theme.palette.KenColors.sideNavColor || theme.palette.KenColors.primary,
  },
  userName: {
    marginTop: 20,
    fontSize: 20,
    color: theme.palette.KenColors.kenWhite,
  },
  studentClassItem: {
    marginTop: 20,
    fontSize: 14,
    color: theme.palette.KenColors.kenWhite,
  },
  heading: {
    marginLeft: 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.KenColors.kenWhite,
  },
  subHeading: {
    marginLeft: 32,
    fontSize: '0.875rem',
    color: theme.palette.KenColors.kenWhite,
  },
  contentDisabled: {
    // cursor: "not-allowed",
    textDecoration: 'none',
    pointerEvents: 'none',
  },
  menuIcon: {
    color: theme.palette.KenColors.kenWhite,
  },
  subListItem: {
    padding: '6px 34px',
    marginLeft: 4,
    '&:hover': {
      backgroundColor: theme.palette.KenColors.kenBlack,
      '& $subLevel': {
        color: theme.palette.KenColors.sideNavItemHoverColor,
      },
      '& $heading': {
        color: theme.palette.KenColors.sideNavItemHoverColor,
      },
    },
    '&.Mui-selected': {
      backgroundColor: 'turquoise',
      color: 'white',
      fontWeight: 600,
    },
  },
  listItem: {
    padding: '8px 20px',
    marginLeft: 4,
    '&:hover': {
      backgroundColor: theme.palette.KenColors.sideNavItemHoverBackground,
      '& $subLevel': {
        color: theme.palette.KenColors.sideNavItemHoverColor,
      },
      '& $heading': {
        color: theme.palette.KenColors.sideNavItemHoverColor,
      },
    },
    '&.Mui-selected': {
      backgroundColor: 'turquoise',
      color: 'white',
      fontWeight: 600,
    },
  },
  listItemSubLevel: {
    height: 'auto',
  },
  divider: {
    background: theme.palette.KenColors.background,
    height: 2,
  },
  active: {
    '& $listItem': {
      borderLeft: `4px solid ${theme.palette.KenColors.kenWhite}`,
      marginLeft: 0,
      backgroundColor: theme.palette.KenColors.sideNavItemActiveBackground,
    },

    '& $subListItem': {
      borderLeft: `4px solid ${theme.palette.KenColors.kenWhite}`,
      marginLeft: 0,
      backgroundColor: theme.palette.KenColors.sideNavItemActiveBackground,
    },

    '& $heading': {
      color: theme.palette.KenColors.sideNavItemActiveColor,
    },
    '& $subLevel': {
      color: theme.palette.KenColors.sideNavItemActiveColor,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.KenColors.sideNavItemActiveBackground,
      color: 'white',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: theme.palette.KenColors.sideNavItemActiveBackground,
        // color: 'white',
      },
    },
  },
  FS: {
    color: theme.palette.KenColors.neutral100,
    fontSize: '14px',
    marginLeft: '32px',
  },
  gradeIcon: {
    color: theme.palette.KenColors.neutral100,
  },
  displayPic: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  name: {
    fontSize: '14px',
    color: theme.palette.KenColors.primary,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    // background: theme.palette.KenColors.sideNavBackground,
    // backgroundImage: `url("https://inazstgpfs3001.blob.core.windows.net/assets/Untitled%20design%20(4).png")`,
    // backgroundImage :`url('https://inazstgpfs3001.blob.core.windows.net/assets/spjain-sidenavImg.png')`,
    backgroundColor: theme.palette.KenColors.sideNavBackground,
    backgroundRepeat: 'round',
  },
  drawerOpen: {
    // background: theme.palette.KenColors.primary,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // background: theme.palette.KenColors.primary,
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down('xs')]: {
      width: 65,
    },
    [theme.breakpoints.up('xs')]: {
      width: 69,
    },
  },
  closeIcon: {
    // color: theme.palette.KenColors.kenWhite,
    marginRight: 10,
    cursor: 'pointer',
  },
  topContainer: {
    // background: theme.palette.KenColors.backgroundSideNav,
    // background: '#0f182b',
    background: '#fff',
    padding: '8px 16px',
  },
  dialogPaper: {
    height: 'none',
  },
  dialogTitle: {
    color: theme.palette.KenColors.kenBlack,
  },
  dialogAgree: {
    fontSize: 12,
  },
  popover: {
    // marginTop: '-25px',
    backgroundColor: '#121b2f',
  },
  header: {
    padding: '8px 16px',
    color: theme.palette.KenColors.kenWhite,
    fontSize: '14px',
    fontWeight: 600,
  },
  // activeLinkInner: {
  //   backgroundColor: theme.palette.KenColors.kenBlack,
  //   // '&:hover': {
  //     '& $subLevel': {
  //       color: theme.palette.KenColors.sideNavItemHoverColor,
  //       backgroundColor: theme.palette.KenColors.kenBlack,
  //     },
  //     '& $heading': {
  //       color: theme.palette.KenColors.sideNavItemHoverColor,
  //       backgroundColor: theme.palette.KenColors.kenBlack,
  //     },
  //   },
  //   '&.Mui-selected': {
  //     backgroundColor: 'turquoise',
  //     color: 'white',
  //     fontWeight: 600,
  //   // },
  // },
  subMenu: {
    paddingLeft: 36,
  },
  menuIcon: {
    color: 'white',
    minWidth: 48,
  },
  subMenuText: {
    fontSize: '0.725rem',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    color: 'white',
  },
  menuItemText: {
    fontSize: '0.875rem',
    color: 'white',
  },
  logoWrap: {
    width: 170,
    display: 'inline-block',
  },
}));

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

export default function SideDrawer(props) {
  const { openDrawer, setOpenDrawer } = props;
  const { config } = useContext(configContext);
  const { handleSnackbarOpen } = useContext(context);
  const theme = useTheme();
  var showDrawer = props.showDrawer;

  const [menuItem, setMenuItem] = React.useState([]);
  const [menuPosition, setMenuPosition] = React.useState(null);
  const [selectedSubItems, setSelectedSubItems] = React.useState([]);
  const [marketDialogData, setMarketDialogData] = React.useState({
    value: true,
  });

  // for language translation
  const { t } = useTranslation();
  const appConfig = {
    logo: '../../assets/lxl.png',
    logoAlt: 'logoAlt',
    title: KEY_PORTAL_TYPE.faculty,
    studentTitle: KEY_PORTAL_TYPE.student,
    parentTitle: KEY_PORTAL_TYPE.parent,
  };

  const handleClose = () => {
    if (checkedValue === true) {
      const data = {
        attributes: [
          {
            Id: marketDialogData?.Id || 0,
            contactId: profile.ContactId,
            name: 'marketDialog',
            value: false,
          },
        ],
      };
      createAttribute({ attributes: data?.attributes }).then(res => {
        if (res.Message === 'Information updated') {
          handleMarketPlace();
          setOpenDialogMarket(false);
          setMarketDialogData(prev => {
            return { ...prev, value: false };
          });
        }
      });
    }
  };

  const handleDrawerOpen = () => {
    // setOpen(true);
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const classes = useStyles();
  const [openDialogMarket, setOpenDialogMarket] = React.useState();
  const [accessValue, setAccessValue] = useState(false);
  const [checkedValue, setCheckedValue] = React.useState();
  // const profile = getUserDetails();
  const parentProfile = getParentDetails();

  const [profile, setProfile] = React.useState(getUserDetails());

  const logout = () => {
    // unsubscribeMessage(
    //   config,
    //   profile,
    //   parentProfile,
    //   localStorage.getItem(KEY_FIRE_REG_TOKEN)
    // );
    localStorage.clear();
    localStorage.removeItem(KEY_USER_DETAILS);
    history.push('/');
  };

  const getCurrentProfile = () => {
    return profile.Type === KEY_USER_TYPE.parent ? parentProfile : profile;
  };

  const handleMarketPlace = async () => {
    const currentProfile = getCurrentProfile();
    if (currentProfile?.Name && currentProfile?.mail) {
      let firstName = currentProfile.Name.split(' ')[0];
      let params = `email=${currentProfile.mail}&first_name=${firstName}`; //`/${UrlEndPoints.authenticate}?UniqueId=${email}` "email"
      const url = await getMarketplaceURL(params);
      window.open(url, '_blank');
    } else {
      handleSnackbarOpen(KEY_STATUS.warning, t('messages:Marketplace_Error'));
    }
  };

  const faculty = [
    {
      id: 1,
      icon: <Home style={{ fontSize: '24px' }} />,
      label: 'Home',
      link: `/${Routes.home}`,
      isParent: false,
      callback: '',
    },
    {
      id: 4,
      icon: <ClassOutlinedIcon />,
      label: 'Course Content',
      link: `/${Routes.acadamicContentlms}`,
      feature: 'activities',
      isParent: false,
      action: 'view',
      // isSubSubMenu: true,
    },
    {
      id: 5,
      icon: <ClassOutlinedIcon />,
      label: 'Grading',
      link: `/${Routes.Grading}`,
      feature: 'activities',
      isParent: false,
      action: 'view',
      // isSubSubMenu: true,
    },
    {
      id: 6,
      icon: <DashboardOutlinedIcon />,
      label: 'Self-Learning Courses',
      link: `/${Routes.subjectContentStudent}`,
      feature: 'activities',
      isParent: false,
      action: 'view',
      // isSubSubMenu: true,
    },
    {
      id: 6,
      icon: <GroupOutlinedIcon />,
      label: 'E-Learning',
      link: `/${Routes.LearningModule}`,
      feature: 'activities',
      isParent: false,
      action: 'view',
      // isSubSubMenu: true,
    },
    {
      id: 5,
      icon: <GroupOutlinedIcon />,
      label: ' FeedBack',
      link: `/${Routes.facultFeedBack}`,
      feature: 'activities',
      isParent: false,
      action: 'view',
      // isSubSubMenu: true,
    },

    // {
    //   id: 7,
    //   icon: <ClassOutlinedIcon />,
    //   label: 'Global Resources',
    //   link: `/${Routes.GlobalResources}`,
    //   feature: 'activities',
    //   isParent: false,
    //   action: 'view',
    //   // isSubSubMenu: true,
    // },
    

    // {
    //   id: 2,
    //   icon: <GroupOutlinedIcon style={{ fontSize: '24px' }} />,
    //   label: 'Academics',
    //   link: `/${Routes.academics}`,
    //   callback: '',
    //   feature: 'facultyAcademics',
    //   action: 'view',
    //   isParent: true,
    //   subItems: [
    //     {
    //       id: 1,
    //       icon: <DashboardOutlinedIcon />,
    //       label: 'Dashboard',
    //       link: `/${Routes.lmsDashboardFaculty}`,
    //       callback: '',
    //       feature: 'dashboard',
    //       isParent: false,
    //       action: 'view',
    //       isSubSubMenu: true,
    //     },
    //     {
    //       id: 3,
    //       icon: <DescriptionIcon />,
    //       label: 'Question Bank',
    //       link: `/${Routes.questionsCreation}`,
    //       callback: '',
    //       feature: 'questionsCreation',
    //       isParent: false,
    //       action: 'view',
    //       isSubSubMenu: true,
    //     },
    //     {
    //       id: 4,
    //       icon: <ClassOutlinedIcon />,
    //       label: 'Course Content',
    //       link: `/${Routes.acadamicContent}`,
    //       feature: 'activities',
    //       isParent: false,
    //       action: 'view',
    //       isSubSubMenu: true,
    //     },
    //   ],
    // },
    // {
    //   id: 7,
    //   icon: <ClassOutlinedIcon />,
    //   label: 'Examinations',
    //   link: `/${Routes.exams}`,
    //   isParent: false,
    //   callback: '',
    // },
    // {
    //   id: 3,
    //   icon: <GroupOutlinedIcon />,
    //   label: 'My Students',
    //   link: `/${Routes.studentsByOffering}`,
    //   callback: '',
    //   feature: 'studentsByOffering',
    //   isParent: false,
    //   action: 'view',
    // },
    // {
    //   id: 7,
    //   icon: <StoreOutlinedIcon />,
    //   label: 'Attendance',
    //   link: `/${Routes.facultyAttendance}`,
    //   callback: '',
    //   feature: 'attendance',
    //   isParent: false,
    //   action: 'view',
    // },
    // {
    //   id: 2,
    //   icon: <TableChartOutlinedIcon style={{ fontSize: '24px' }} />,
    //   label: 'Timetable',
    //   link: `/${Routes.timetable}`,
    //   callback: '',
    //   feature: 'timetable',
    //   isParent: false,
    //   action: 'view',
    // },

    // {
    //   id: 5,
    //   icon: <GroupOutlinedIcon style={{ fontSize: '24px' }} />,
    //   label: 'Support Services',
    //   link: `/${Routes.facultyServices}`,
    //   callback: '',
    //   feature: 'facultyServices',
    //   action: 'view',
    //   isParent: true,
    //   subItems: [
    //     {
    //       id: 21,
    //       icon: <HelpOutlineSharpIcon />,
    //       label: 'Raise a Case',
    //       link: `/${Routes.raiseRequest}`,
    //       callback: '',
    //       feature: 'raiseCase',
    //       isParent: false,
    //       action: 'view',
    //       isSubSubMenu: true,
    //     },
    //   ],
    // },
    // {
    //   id: 6,
    //   icon: <EventAvailableOutlinedIcon style={{ fontSize: '24px' }} />,
    //   label: 'Events/Updates',
    //   link: `/${Routes.eventsModified}`,
    //   callback: '',
    //   feature: 'eventsModified',
    //   isParent: false,
    //   action: 'view',
    // },
  ];
  const student = [
    {
      id: 1,
      icon: <Home style={{ fontSize: '24px' }} />,
      label: 'Home',
      link: `/${Routes.home}`,
      isParent: false,
      callback: '',
    },
    // {
    //   id: 4,
    //   icon: <ClassOutlinedIcon />,
    //   label: 'Course Content',
    //   link: `/${Routes.acadamicContent}`,
    //   feature: 'activities',
    //   isParent: false,
    //   action: 'view',
    //   // isSubSubMenu: true,
    // },
   
    // {
    //   id: 2,
    //   icon: <FaUserGraduate style={{ fontSize: '24px' }} />,
    //   label: 'Enrollments',
    //   link: `/${Routes.enroll}`,
    //   callback: '',
    //   feature: 'enroll',
    //   action: 'view',
    //   isParent: true,
    //   subItems: [
    //     {
    //       id: 21,
    //       icon: <HelpOutlineSharpIcon />,
    //       label: 'Completed Enrollments',
    //       link: `/${Routes.completeEnroll}`,
    //       callback: '',
    //       feature: 'enroll',
    //       isParent: false,
    //       action: 'view',
    //       isSubSubMenu: true,
    //     },
    //     {
    //       id: 22,
    //       icon: <ListAltSharpIcon />,
    //       label: 'Open Enrollments',
    //       link: `/${Routes.openEnroll}`,
    //       callback: '',
    //       feature: 'enroll',
    //       isParent: false,
    //       action: 'view',
    //       isSubSubMenu: true,
    //     },
    //   ],
    // },
    {
      id: 3,
      icon: <ClassOutlinedIcon style={{ fontSize: '24px' }} />,
      label: 'Learn',
      link: `/${Routes.acadamicContent}`,
      isParent: true,
      callback: '',
      subItems: [
        {
          id: 1,
          icon: <DashboardOutlinedIcon />,
          label: 'My Content',
          link: `/${Routes.subjectContentStudent}`,
          callback: '',
          feature: 'dashboard',
          isParent: false,
          action: 'view',
          isSubSubMenu: true,
        },
        // {
        //   id: 2,
        //   icon: <ClassOutlinedIcon />,
        //   label: 'Learn',
        //   link: `/${Routes.acadamicContent}`,
        //   callback: '',
        //   feature: 'learn',
        //   isParent: false,
        //   action: 'view',
        //   isSubSubMenu: true,
        // },
        {
          id: 5,
          icon: <ClassOutlinedIcon />,
          label: 'Result',
          link: `/${Routes.results}`,
          feature: 'activities',
          isParent: false,
          action: 'view',
          isSubSubMenu: true,
        },
      ],
    },
    // {
    //   id: 9,
    //   icon: <StoreOutlinedIcon style={{ fontSize: '24px' }} />,
    //   label: 'Examinations',
    //   link: `/${Routes.exams}`,
    //   callback: '',
    //   isParent: false,
    //   action: 'view',
    // },
    // {
    //   id: 4,
    //   icon: <StoreOutlinedIcon />,
    //   label: 'Attendance',
    //   link: `/${Routes.attendance}`,
    //   callback: '',
    //   feature: 'attendance',
    //   action: 'view',
    //   isParent: false,
    // },
    // {
    //   id: 5,
    //   icon: <TableChartOutlinedIcon style={{ fontSize: '24px' }} />,
    //   label: 'Timetable',
    //   link: `/${Routes.timetable}`,
    //   callback: '',
    //   feature: 'timetable',
    //   isParent: false,
    //   action: 'view',
    // },

    // {
    //   id: 10,
    //   icon: <FaRupeeSign size={24} />,
    //   label: ' Fees',
    //   callback: '',
    //   isParent: true,
    //   subItems: [
    //     {
    //       id: 11,
    //       label: 'My Cart',
    //       link: `/${Routes.myCart}`,
    //       callback: '',
    //       feature: 'myCart',
    //       action: 'view',
    //       isParent: false,
    //       icon: <ShoppingCartIcon />,
    //     },
    //     {
    //       id: 12,
    //       label: 'Fee Schedule',
    //       link: `/${Routes.feeSchedule}`,
    //       callback: '',
    //       feature: 'feeSchedule',
    //       action: 'view',
    //       isParent: false,
    //       icon: <IoMdCalendar size={25} />,
    //     },
    //     {
    //       id: 13,
    //       label: 'Fee Payment',
    //       link: `/${Routes.feesPayment}`,
    //       callback: '',
    //       feature: 'feesPayment',
    //       action: 'view',
    //       isParent: false,
    //       icon: <GiTakeMyMoney size={25} />,
    //     },
    //     {
    //       id: 14,
    //       label: 'Manual Payment',
    //       link: `/${Routes.manualPayment}`,
    //       callback: '',
    //       feature: 'manualPayment',
    //       action: 'view',
    //       isParent: false,
    //       icon: <GiMoneyStack size={25} />,
    //     },
    //     {
    //       id: 15,
    //       label: 'My Transactions',
    //       link: `/${Routes.myTransactions}`,
    //       callback: '',
    //       feature: 'myTransactions',
    //       action: 'view',
    //       isParent: false,
    //       icon: <AutorenewOutlinedIcon />,
    //     },
    //   ],
    // },

    // {
    //   id: 4,
    //   icon: <FaRupeeSign  style={{fontSize: '24px'}}/>,
    //   label: 'Fees',
    //   link: `/${Routes.feePayment}`,
    //   callback: '',
    //   feature: 'feePayment',
    //   isParent: false,
    //   action: 'view',
    // },
    {
      id: 6,
      icon: <GroupOutlinedIcon />,
      label: 'Feedback',
      link: `/${Routes.feedBack}`,
      callback: '',
      feature: 'students',
      isParent: false,
      action: 'view',
    },
    // {
    //   id: 7,
    //   icon: <GroupOutlinedIcon style={{ fontSize: '24px' }} />,
    //   label: 'Support Services',
    //   link: `/${Routes.raiseRequest}`,
    //   callback: '',
    //   feature: 'myStudents',
    //   action: 'view',
    //   isParent: true,
      // subItems: [
      //   {
      //     id: 21,
      //     icon: <HelpOutlineSharpIcon />,
      //     label: 'Raise a Case',
      //     link: ``,
      //     callback: '',
      //     feature: 'raiseCase',
      //   isParent: false,
      //     action: 'view',
      //   },
      //   {
      //     id: 22,
      //     icon: <ListAltSharpIcon />,
      //     label: 'Service List',
      //     link: `/${Routes.serviceList}`,
      //     callback: '',
      //     feature: 'serviceList',
      //   isParent: false,
      //     action: 'view',
      //   },
      // ],
    // },
    // {
    //   id: 8,
    //   icon: <EventAvailableOutlinedIcon style={{ fontSize: '24px' }} />,
    //   label: 'Events',
    //   link: `/${Routes.eventsModified}`,
    //   callback: '',
    //   feature: 'eventsModified',
    //   isParent: false,
    //   action: 'view',
    // },

    // {
    //   id: 7,
    //   icon: <EventAvailableOutlinedIcon />,
    //   label: 'Events(old)',
    //   link: `/${Routes.events}`,
    //   callback: '',
    //   feature: 'events',
    //   action: 'view',
    //   isParent: false,
    // },
    // {
    //   id: 911,
    //   icon: <StoreOutlinedIcon style={{fontSize: '24px'}}/>,
    //   label: 'Market Place',
    //   link: 'marketPlace',
    //   callback: handleMarketPlace,
    //   feature: 'marketsPlace',
    //   isParent: false,
    //   action: 'view',
    // },
  ];
  const parent = [
    {
      id: 1,
      icon: <Home />,
      label: 'Home',
      link: `/${Routes.home}`,
      callback: '',
    },
    // {
    //   id: 2,
    //   icon: <AutorenewOutlinedIcon />,
    //   label: 'Fee Payment',
    //   link: `/${Routes.feePayment}`,
    //   callback: '',
    // },
    // {
    //   id: 3,
    //   icon: <EventNoteOutlinedIcon />,
    //   label: 'Report Card',
    //   link: `/${Routes.reports}`,
    //   callback: '',
    // },
    // {
    //   id: 4,
    //   icon: <EventAvailableOutlinedIcon />,
    //   label: 'Events',
    //   link: `/${Routes.events}`,
    //   callback: '',
    // },
    // {
    //   id: 5,
    //   icon: <TableChartOutlinedIcon />,
    //   label: 'Timetable',
    //   link: `/${Routes.timetable}`,
    //   callback: '',
    // },
    // {
    //   id: 6,
    //   icon: <StoreOutlinedIcon />,
    //   label: 'Store',
    //   link: 'marketPlace',
    //   callback: handleMarketPlace,
    // },
    // {
    //   id: 7,
    //   icon: <AccountBalanceOutlinedIcon />,
    //   label: 'Account Details',
    //   link: `/${Routes.accountDetail}`,
    //   callback: '',
    // },
    {
      id: 3,
      icon: <ClassOutlinedIcon style={{ fontSize: '24px' }} />,
      label: 'Learn',
      link: `/${Routes.acadamicContent}`,
      isParent: true,
      callback: '',
      subItems: [
        {
          id: 1,
          icon: <DashboardOutlinedIcon />,
          label: 'My Content',
          link: `/${Routes.subjectContentStudent}`,
          callback: '',
          feature: 'dashboard',
          isParent: false,
          action: 'view',
          isSubSubMenu: true,
        },
        // {
        //   id: 2,
        //   icon: <ClassOutlinedIcon />,
        //   label: 'Learn',
        //   link: `/${Routes.acadamicContent}`,
        //   callback: '',
        //   feature: 'learn',
        //   isParent: false,
        //   action: 'view',
        //   isSubSubMenu: true,
        // },
        {
          id: 5,
          icon: <ClassOutlinedIcon />,
          label: 'Student Content',
          link: `/${Routes.lmsDashboardStudent}`,
          feature: 'activities',
          isParent: false,
          action: 'view',
          isSubSubMenu: true,
        },
      ],
    },
    {
      id: 6,
      icon: <GroupOutlinedIcon />,
      label: 'Feedback',
      link: `/${Routes.feedBack}`,
      callback: '',
      feature: 'students',
      isParent: false,
      action: 'view',
    },
    
  ];

  React.useEffect(() => {
    let profileArr = [];

    switch (profile?.Type?.toLowerCase()) {
      case KEY_USER_TYPE?.faculty?.toLowerCase():
        profileArr = faculty;
        break;
      case KEY_USER_TYPE?.student?.toLowerCase():
        profileArr = student;
        break;

      case KEY_USER_TYPE?.parent?.toLowerCase():
        profileArr = parent;
        break;

      default:
        profileArr = [];
    }

    return setMenuItem(profileArr);
  }, [profile, marketDialogData, accessValue]);

  const handleMenuClick = (event, item) => {
    console.log('menu clicked', item);
    if (Array.isArray(item.subItems) && item?.subItems?.length > 0) {
      console.log('menu clicked----if', item.subItems);
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
      console.log('menu clicked----else');
      setSelectedSubItems([]);
      return null;
    }
  };
  const handleItemClick = event => {
    setMenuPosition(null);
  };
  const MenuItem = ({ item, openDrawer, setOpen }) => {
    console.log('openDrawer,openDrawer', openDrawer);
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component openDrawer={openDrawer} setOpen={setOpen} item={item} />;
  };

  const SingleLevel = ({ item, openDrawer }) => {
    const classes = useStyles();
    return (
      <>
        <NavLink
          // key={key}
          className={classes.link}
          to={item?.link || ''}
          activeClassName={`${classes.active}`}
          exact
         >
          <ListItem
            className={
              item.isSubSubMenu ? classes.subListItem : classes.listItem
            }
            button
          >
            <ListItemIcon className={classes.menuIcon}>
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primaryTypographyProps={{
                className: item.isSubSubMenu
                  ? classes.subMenuText
                  : classes.menuItemText,
              }}
              primary={item.label}
            />
          </ListItem>
        </NavLink>
      </>
    );
  };

  const MultiLevel = ({ item, key, openDrawer }) => {
    const classes = useStyles();
    const { subItems: children } = item;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      if (openDrawer === false) {
        return;
      }
      setOpen(prev => !prev);
    };
    useEffect(() => {
      if (openDrawer === false) {
        setOpen(false);
      }
    }, [openDrawer]);

    return (
      <React.Fragment>
        <ListItem
          button
          style={{ paddingLeft: 24 }}
          onClick={e => handleClick(openDrawer)}
        >
          <ListItemIcon className={classes.menuIcon}>{item.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ className: classes.menuItemText }}
            primary={item.label}
          />

          {/* </NavLink> */}

          {open ? (
            <ExpandLessIcon style={{ color: '#fff' }} />
          ) : (
            <ExpandMoreIcon style={{ color: '#fff' }} />
          )}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List style={{ color: '#fff' }} disablePadding>
            {children?.map((child, key) => <MenuItem key={key} item={child} />)}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  const customRender = items => {
    if (!Array.isArray(items)) return <></>;
    return items?.map((item, index) => {
      if (item.subItems) {
        return (
          <NestedMenuItem
            label={item.label}
            parentMenuOpen={!!menuPosition}
            PaperProps={{ className: classes.popover }}
            icon={item.icon}
            index={index}
            header={item.label}
          >
            {customRender(item.subItems)}
          </NestedMenuItem>
        );
      }
      return item?.link ? (
        <NavLink
          key={index}
          className={classes.link}
          to={item?.link}
          activeClassName={classes.activeLinkInner}
          exact
        >
          <CustomMenuItem
            key={index}
            onClick={handleItemClick}
            icon={item.icon}
            label={item.label}
            openDrawer={openDrawer}
          />
        </NavLink>
      ) : (
        <CustomMenuItem
          key={index}
          onClick={handleItemClick}
          icon={item.icon}
          label={item.label}
          openDrawer={openDrawer}
          className={classes.navIcon}
        />
      );
    });
  };
  return (
    <div className={classes.root}>
      <Drawer
        variant={props.variant}
        onClose={() => {
          props.drawerChanges();
        }}
        open={props.openDrawer}
        container={props.container}
        anchor={props.anchor}
        ModalProps={{
          keepMounted: props.ModalProps,
        }}
        classes={{
          paper: clsx(classes.drawer, {
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
      >
        <Box
          className={classes.topContainer}
          // alignItems="center"
        >
          {openDrawer ? (
            <>
              <NavLink className={classes?.logoWrap} to={`/${Routes.home}`}>
                <img src={ken42Logo} className={classes.logo} />
              </NavLink>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                className={classes.menuButton}
              >
                <FormatAlignRightIcon
                  onClick={handleDrawerClose}
                  className={classes.closeIcon}
                  style={{ color: '#0f182b' }}
                />
              </IconButton>
              {/* <div className={classes.toolbar}> */}

              {/* </div> */}
            </>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <FormatAlignLeftIcon
                className={classes.closeIcon}
                style={{ color: '#0f182b' }}
              />
            </IconButton>
          )}
        </Box>

        <div className={classes.displayDrawer}>
          <Grid>
            {menuItem?.map((item, key) => (
              <List
                className={!item.isParent ? 'submenu-submenu-padding' : ''}
                component="div"
                activeClassName={classes.activeLinkInner}
                disablePadding
              >
                <MenuItem key={key} openDrawer={openDrawer} item={item} />
              </List>
            ))}
            <Hidden mdUp>
              <Link className={classes.link}>
                <ListItem
                  className={classes.listItem}
                  button
                  key="signOut"
                  onClick={logout}
                >
                  <span>
                    <ArrowBackOutlinedIcon />
                  </span>
                  <span className={classes.heading}>{t('Sign_Out')}</span>
                </ListItem>
              </Link>
            </Hidden>
          </Grid>
        </div>
      </Drawer>
      <KenDialog
        open={openDialogMarket}
        onClose={() => {
          setOpenDialogMarket(false);
        }}
        handleClose={handleClose}
        handleCancel={() => {
          setOpenDialogMarket(false);
        }}
        disabledOk={checkedValue === true ? false : true}
        // handleClickOpen={handleClickOpen}
        maxWidth="xs"
        // titleStyle={classes.titleHead}
        styleOverrides={{ dialogPaper: classes.dialogPaper }}
       >
        <Grid container>
          <Grid item>
            <Typography className={classes.dialogTitle}>
              {t('messages:Accept_Privacy')}
            </Typography>
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <Grid item>
              <KenCheckbox
                value={checkedValue}
                onChange={() => {
                  checkedValue === true
                    ? setCheckedValue(false)
                    : setCheckedValue(true);
                }}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.dialogAgree}>
                {t('messages:I_Agree')}{' '}
                {
                  <a href={config?.marketPlace?.terms} target="_blank">
                    {t('messages:Term_Condition')}
                  </a>
                }{' '}
                and{' '}
                {
                  <a href={config?.marketPlace?.privacyPolicy} target="_blank">
                    {t('messages:Privacy_Policy')}
                  </a>
                }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </KenDialog>
    </div>
  );
}
