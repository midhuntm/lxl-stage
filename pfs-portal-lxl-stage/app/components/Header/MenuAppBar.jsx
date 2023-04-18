import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Dropzone from 'react-dropzone';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Box, Grid, MenuItem, Menu, Button, Popover } from '@material-ui/core';
import history from '../../utils/history';
import Badge from '@material-ui/core/Badge';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import {
  getUri,
  userAgentApplication,
} from '../../utils/helpers/userAgentApplication';
import {
  getUserDetails,
  getParentDetails,
  getUserChangeLang,
  logOut,
} from '../../utils/helpers/storageHelper';
import Hidden from '@material-ui/core/Hidden';
import menuLeft from '../../assets/menu-left.svg';
import { useGoogleLogout } from 'react-google-login';
import ChevronDownIcon from '../../assets/icons/chevrondown.svg';
import {
  KEY_USER_DETAILS,
  KEY_USER_TYPE,
  KEY_FIRE_REG_TOKEN,
  KEY_USER_CHANGE_LANG,
  KEY_PARENT_DETAILS,
  KEY_LOGIN_ACCESS_TOKEN
} from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import { KEY_FACULTY_PROFILE_IMAGE } from '../../utils/constants';
import KenSelect from '../../components/KenSelect/index';
import configContext from '../../utils/helpers/configHelper';
import Context from '../../utils/helpers/context';
import Routes from '../../utils/routes.json';
import themeConfig from '../../utils/helpers/themeHelper';
// import { unsubscribeMessage } from '../../utils/MessageHelper';
import MailIcon from '../../assets/icons/Mail.svg';
import KenButton from '../../global_components/KenButton';
import {
  getStudentDetails,
  getFacultyDetails,
  getSignature,
} from '../../utils/ApiService';
import ken42Logo from '../../assets/Ken42logo.png';
import KenAvatar from '../KenAvatar';
import { uploadSignature } from '../../utils/ApiService';
import KenDialog from '../../global_components/KenDialog';
import { useTheme } from 'styled-components';
import KenLoader from '../KenLoader';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.KenColors.kenBlack,
    padding: '10px',
    fontSize: '18px',
    fontWeight: '600',
    marginLeft: 22,
  },
  titleContent: {
    flexGrow: 1,
    color: theme.palette.KenColors.kenBlack,
    padding: '10px',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: theme.spacing(9),
  },
  openContent: {
    marginLeft: 0,
  },
  circle: {
    width: '36px',
    height: '36px',
    lineHeight: '33px',
    borderRadius: '55%',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    background: `${theme.palette.KenColors.neutral100}`,
  },
  profileCircle: {
    width: '250px',
    height: '250px',
    lineHeight: '75px',
    borderRadius: '50%',
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    background: `${theme.palette.KenColors.neutral100}`,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.KenColors.headerBackground,
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
  logo: {
    maxHeight: '40px',
    maxWidth: '40px',
  },
  newProfile: {
    width: '30px',
  },
  menuItem: {
    textDecoration: 'none',
    color: theme.palette.KenColors.primary,
    textTransform: 'none',
    padding: '5px 15px',
    fontWeight: '600',
  },
  toolbar: {
    minHeight: 64,
    paddingLeft: 24,
  },

  menuBar: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  actionButton: {
    padding: 0,
    color: 'inherit',
  },
  profileEditButton: {
    marginLeft: '80px',
    marginRight: '80px',
  },
  actionIcon: {
    fontSize: '2.1rem',
  },
  userName: {
    marginRight: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.palette.KenColors.kenBlack,
  },
  hamburger: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  icon: {
    maxWidth: '24px',
    maxHeight: '24px',
  },
  home: {
    color: theme.palette.KenColors.neutral100,
    fontSize: '18px',
  },
  profileTitle: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 14,
    padding: '10px',
    fontWeight: '600',
    textAlign: 'center',
  },
  childTitle: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    marginLeft: 16,
  },
  titleName: {
    color: `${theme.palette.KenColors.primary}`,
    fontSize: 12,
    lineHeight: '16px',
  },
  titleDetails: {
    color: `${theme.palette.KenColors.neutral400}`,
    fontSize: 10,
    lineHeight: '14px',
  },
  menuItemDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderTop: `1px solid ${theme.palette.KenColors.neutral40}`,
    padding: 4,
    width: '100%',
    maxWidth: 165,
    minWidth: 150,
  },
  activeMenuChildItem: {
    backgroundColor: theme.palette.KenColors.sideNavItemActiveBackground,
    '& $titleName': {
      color: theme.palette.KenColors.sideNavItemActiveColor,
    },
  },
  changeChild: {
    fontSize: 10,
    color: theme.palette.KenColors.neutral100,
  },
  childName: {
    color: theme.palette.KenColors.neutral700,
  },
  mailPopover: { maxWidth: 300, minWidth: 250 },
  mailItem: {
    color: theme.palette.KenColors.neutral700,
    whiteSpace: 'normal',
    width: '100%',
  },
  mailItemHead: {
    color: theme.palette.KenColors.neutral700,
    padding: '6px 16px',
    borderBottom: `1px solid ${theme.palette.KenColors.neutral100}`,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  mailItemActive: {
    color: theme.palette.KenColors.primary,
  },
  textWrap: {
    marginRight: 4,
  },
  mailSendButtonWrap: {
    padding: '16px',
  },
  padding: {
    padding: '8px',
  },
  leftAligned: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cameraAvatar: {
    backgroundColor: theme?.palette?.KenColors?.primary,
  },
  pointer: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const lang = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'हिन्दी',
    value: 'hin',
  },
  {
    label: 'Deutsche',
    value: 'de',
  },
];

export default function MenuAppBar(props) {
  //for changing the language
  const { t, i18n } = useTranslation();
  const { openDrawer, setOpenDrawer } = props;
  const [profilePicture, setProfilePicture] = useState();
  const [showSaveFileIcon, setShowSaveFileIcon] = useState(false);
  const [showRemoveFileIcon, setShowRemoveFileIcon] = useState(false);

  const { config } = useContext(configContext);
  const { handleSnackbarOpen } = useContext(Context);
  const { changeTheme } = React.useContext(themeConfig);
  const userLang = getUserChangeLang();
  const defaultLang =
    config && config.translation && config.translation.default
      ? config.translation.default
      : false;

  const parentDetails = getParentDetails();
  // TODO: Replace this with single line using context config in html
  const appConfig = {
    logoAlt: 'logoAlt',
    title: config?.title ? config.title.faculty : t('Faculty_Portal'),
    studentTitle: config?.title ? config.title.student : t('Student_Portal'),
    parentTitle: config?.title ? config.title.parent : t('Parent_Portal'),
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchor, setAnchor] = React.useState(null);
  const openChild = Boolean(anchor);
  const profile = getUserDetails();
  const [mailAnchorEl, setMailAnchorEl] = React.useState(null);
  const [selectedMails, setSelectedMails] = React.useState([]);
  const [facultyList, setFacultyList] = React.useState([]);
  const [greetingMessage, setGreetingMessage] = React.useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [uploadedProfilePicture, setUploadedProfilePicture] = useState();
  const [openDialog, setOpenDialog] = React.useState();

  // state for dropDown
  const [ln, setLn] = React.useState(userLang || defaultLang || 'en');

  React.useEffect(() => {
    const ContactId = JSON.parse(localStorage.getItem('userDetails'))
      ?.ContactId;
    getSignature(ContactId, KEY_FACULTY_PROFILE_IMAGE.TYPE).then(res => {
      console.log('Response', res);
      const length = res?.files?.length;
      console.log('length', length);
      const lastElementOfFiles = res?.files[length - 1];
      setUploadedProfilePicture(lastElementOfFiles);
    });
  }, []);

  // const handleDrop = acceptedFiles => {
  //   const fileURL = URL.createObjectURL(acceptedFiles[0]);
  //   setProfilePicture(fileURL);
  //   console.log('Hello', acceptedFiles);
  //    handleClose();
  // };
  const handleDrop = acceptedFiles => {
    // setShowRemoveFileIcon(true);
    // setShowSaveFileIcon(true);
    let file = acceptedFiles[0];
    // console.log("added picture")
    if (
      KEY_FACULTY_PROFILE_IMAGE?.ALLOWED_FILE_TYPES?.includes(file?.type) &&
      file.size <= KEY_FACULTY_PROFILE_IMAGE.MAX_FILE_SIZE
    ) {
      const fileURL = URL.createObjectURL(acceptedFiles[0]);
      setDroppedFiles(acceptedFiles);
      // let profImagesArray = profImages;
      setProfilePicture(fileURL);
    } else {
      //   alert(t('messages:Supported_Signature_File'));
      handleSnackbarOpen('warning', t('messages:Supported_Profile_Image_File'));
    }
  };

  const removeFile = acceptedFiles => {
    let currentProfImages = [...profImages];
    if (currentProfImages.length > 0) {
      currentProfImages[index].value = '';
      currentProfImages[index].newlyAdded = false;
      setProfilePicture([...currentProfImages]);
    }
  };

  const onSaveClick = acceptedFiles => {
    setLoading(true);
    // let currentProfImages = [...profImages];
    // const profImageType = currentProfImages[index]?.profImageType;
    const file = droppedFiles[0];
    const fileType = KEY_FACULTY_PROFILE_IMAGE.TYPE;
    const ContactId = JSON.parse(localStorage.getItem('userDetails'))
      ?.ContactId;
    if (droppedFiles && ContactId && file) {
      uploadSignature(ContactId, fileType, file)
        .then(res => {
          setAnchorEl(null);
          setOpenDialog(false);
          handleSnackbarOpen(
            'success',
            t('messages:Profile_Image_Upload_Success')
          );
          getSignature(ContactId, KEY_FACULTY_PROFILE_IMAGE.TYPE)
            .then(res => {
              console.log('Response', res);
              const length = res?.files?.length;
              console.log('length', length);
              const lastElementOfFiles = res?.files[length - 1];
              setUploadedProfilePicture(lastElementOfFiles);
              setLoading(false);
            })
            .catch(err => {
              console.log('error i get profile picture', err);
              setLoading(false);
            });
          // setShowRemoveFileIcon(false);
          // setShowSaveFileIcon(false);
          // setProfilePicture(prev => {
          //   return { ...prev, signatureUpload: true };
          // });
        })
        .catch(err => {
          setLoading(false);
          if (err?.response?.data?.hasOwnProperty('storageErrors')) {
            alert(t('messages:Supported_Profile_Image_File'));
          } else {
            alert(t('messages:Something_Wrong'));
            handleSnackbarOpen(
              'error',
              t('messages:Profile_Image_Upload_Error')
            );
          }
        });
    } else {
      setLoading(false);
    }
  };
  // const thumbs = files.map((file, index) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img src={file.preview} style={img} alt="" />
  //     </div>
  //     <button
  //       style={thumbButton}
  //       onClick={() =>
  //         editImage(file, (output) => {
  //           const updatedFiles = [...files];

  //           // replace original image with new image
  //           updatedFiles[index] = output;

  //           // revoke preview URL for old image
  //           if (file.preview) URL.revokeObjectURL(file.preview);

  //           // set new preview URL
  //           Object.assign(output, {
  //             preview: URL.createObjectURL(output)
  //           });

  //           // update view
  //           setFiles(updatedFiles);
  //         })
  //       }
  //     >
  //       Edit
  //     </button>
  //   </div>
  // ));
  //OnChange function for changing language
  const changeLang = event => {
    setLn(event.target.value);
    i18n.changeLanguage(event.target.value);
    localStorage.setItem(
      KEY_USER_CHANGE_LANG,
      JSON.stringify(event.target.value)
    );
  };

  const getSignout = () => {
    const { signOut } = useGoogleLogout({
      redirectUri: getUri(config),
      clientId: getUri(config),
      onLogoutSuccess: () => {
        localStorage.clear();
        history.push('/');
      },
    });
    return signOut;
  };

  const logout = () => {
    if (config.isAdEnabled) {
      if (config.loginType === 'google') {
        getSignout();
      } else {
        // unsubscribeMessage(
        //   config,
        //   profile,
        //   parentDetails,
        //   localStorage.getItem(KEY_FIRE_REG_TOKEN)
        // );
        userAgentApplication(config).logout();
        localStorage.removeItem(KEY_USER_DETAILS);
        localStorage.removeItem(KEY_LOGIN_ACCESS_TOKEN);
        sessionStorage.clear();
      }
    } else {
      logOut(config, history);
    }
  };

  const CameraBadge = () => {
    return (
      <KenAvatar className={`${classes.cameraAvatar} ${classes.pointer}`}>
        <CameraAltRoundedIcon />
      </KenAvatar>
    );
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeChild = event => {
    setAnchor(event.currentTarget);
  };

  const handleCancel = () => {
    setProfilePicture(null);
    setDroppedFiles([]);
    // setAnchorEl(null);
    // setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setProfilePicture(null);
    setDroppedFiles([]);
  };

  const handleCloseChild = () => {
    setAnchor(null);
  };

  const handleChildren = details => {
    localStorage.setItem(KEY_USER_DETAILS, JSON.stringify(details));
    sessionStorage.removeItem('once');
    history.push('/home');
    window.location.reload();
  };

  const data = JSON.parse(localStorage.getItem(KEY_USER_DETAILS));

  const getParentName = () => {
    return JSON.parse(localStorage.getItem(KEY_PARENT_DETAILS));
  };

  const getChildName = () => {
    return getUserDetails().Name || '';
  };

  // Mailing related functions
  const handleMail = event => {
    console.log('Handle Mail: ');
    setMailAnchorEl(event.currentTarget);
  };
  const handleMailClose = () => {
    setSelectedMails([]);
    setMailAnchorEl(null);
  };
  const onMailItemClick = mail => () => {
    // setSelectedMails()
    console.log('onItem Click: ', mail);
    const index = selectedMails.indexOf(mail);

    if (index < 0) {
      setSelectedMails([...selectedMails, mail]);
    } else {
      selectedMails.splice(index, 1);
      console.log('selectedMails: ', selectedMails);
      setSelectedMails([...selectedMails]);
    }
  };

  React.useEffect(() => {
    if (data.Type === KEY_USER_TYPE.parent && profile.ContactId) {
      // get faculty for the current child
      // TODO: Move this to utils

      getStudentDetails(profile.ContactId)
        .then(res => {
          const current =
            res.Program_Enrollment.find(item => item.Status === 'Current') ||
            res.Program_Enrollment[0];
          getFacultyDetails(current.hed__Account__c)
            .then(faculty => {
              if (faculty) {
                setFacultyList(faculty);
              }
            })
            .catch(er => {
              console.log('Error fetching faculty list: ', er);
            });
        })
        .catch(err => {
          console.log('error fetching student Details: ', err);
          handleSnackbarOpen('error', t('Student_Not_Found'));
        });
    }
  }, [data.Type]);

  React.useEffect(() => {
    const currentHour = new Date().getHours();
    const greet =
      currentHour >= 4 && currentHour < 12
        ? setGreetingMessage(t('messages:Good_Morning'))
        : currentHour >= 12 && currentHour <= 16
        ? setGreetingMessage(t('messages:Good_Afternoon'))
        : currentHour >= 17 || currentHour < 4
        ? setGreetingMessage(t('messages:Good_Evening'))
        : setGreetingMessage('');
  }, []);

  React.useEffect(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className={classes.root}>
      {loading && <KenLoader />}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
        elevation={0}
      >
        <Toolbar classes={{ root: classes.toolbar }}>
          <div
            onClick={() => {
              props.drawerChanges();
            }}
          >
            <img src={menuLeft} className={classes.hamburger} />
          </div>
          <Hidden smDown>
            {/* <Link to={`/${Routes.home}`}>
              {config && (
                <Link to={`/${Routes.home}`}>
                  <img
                    src={config?.logo || ken42Logo}
                    alt={appConfig.logAlt}
                    className={classes.logo}
                  />
                </Link>
              )}
            </Link> */}

            <Typography
              className={clsx(classes.titleContent, {
                [classes.openContent]: openDrawer,
              })}
            >
              {profile.Type === KEY_USER_TYPE.faculty
                ? `${t('messages:Header_Title', {
                    user: data.Name,
                    portal: appConfig.title,
                    greeting: greetingMessage,
                  })}`
                : profile.Type === KEY_USER_TYPE.student
                ? `${t('messages:Header_Title', {
                    user: data.Name,
                    portal: appConfig.studentTitle,
                    greeting: greetingMessage,
                  })}`
                : `${t('messages:Header_Title', {
                    user: getParentName()?.Name,
                    portal: appConfig.parentTitle,
                    greeting: greetingMessage,
                  })}`}
            </Typography>
          </Hidden>

          <Hidden mdUp>
            <Box className={classes.title}>{t('Home')}</Box>
          </Hidden>

         //test
          <div>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              {config.translation && config.translation.enabled && (
                <Grid item>
                  <KenSelect
                    value={ln}
                    onChange={changeLang}
                    options={lang}
                    placeholder={t('Change_Language')}
                  />
                </Grid>
              )}
              {config.isThemeEnabled && (
                <Grid item>
                  <Button color="primary" onClick={() => changeTheme()}>
                    {t('Change_Theme')}
                  </Button>
                </Grid>
              )}
              {/* <Grid item>
                <IconButton className={classes.actionButton}>
                  <img src={SearchIcon} alt="search" className={classes.icon} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton className={classes.actionButton}>
                  <img src={BellIcon} alt="search" className={classes.icon} />
                </IconButton>
              </Grid> */}
              {/* Mailing ability to parent */}
      
              <Grid item className={classes.menuBar}>
                {/* <Typography className={classes.userName}>
                  <span className={classes.textWrap}>{t('labels:Hi')},</span>
                  {data.Type === KEY_USER_TYPE.parent
                    ? getParentName()?.Name
                    : data.Name}
                </Typography> */}
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  className={classes.actionButton}
                 >
                  {uploadedProfilePicture ? (
                    <KenAvatar
                      src={`data:image/png;base64, ${
                        uploadedProfilePicture?.body
                      }`}
                    />
                  ) : (
                    <KenAvatar className={classes.circle} url={profilePicture}>
                      {data.Type === KEY_USER_TYPE.parent
                        ? getParentName()?.Name[0]
                        : data.Name.charAt(0)}
                    </KenAvatar>
                  )}
                </IconButton>
              </Grid>
       
            </Grid>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
              getContentAnchorEl={null}
              PaperProps={{ className: classes.padding }}
            >
              {profile && profile.Type == KEY_USER_TYPE.faculty && (
                <>
                  {' '}
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    <Link
                      to={`/${Routes.facultyProfile}/` + profile.ContactId}
                      className={classes.menuItem}
                    >
                      {t('Profile')}
                    </Link>
                  </MenuItem>
                  {/* <MenuItem>
                    <Link
                      to={`${Routes.subjectDocument}`}
                      className={classes.menuItem}
                    >
                      {t('Subject Documents')}
                    </Link>
                  </MenuItem>
              */}
                </>
              )}

              {profile && profile.Type == KEY_USER_TYPE.parent && (
                <>
                  {' '}
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    <Link
                      to={`/${Routes.studentDetails}/` + profile.ContactId}
                      className={classes.menuItem}
                    >
                      {t('Profile')}
                    </Link>
                  </MenuItem>
                  {/* <MenuItem>
                    <Link
                      to={`${Routes.subjectDocument}`}
                      className={classes.menuItem}
                    >
                      {t('Subject Documents')}
                    </Link>
                  </MenuItem>
              */}
                </>
              )}

              {profile && profile.Type == KEY_USER_TYPE.student && (
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <Link
                    to={`/${Routes.studentDetails}/` + profile.ContactId}
                    className={classes.menuItem}
                  >
                    {t('Profile')}
                  </Link>
                </MenuItem>
              )}

              {/* <MenuItem onClick={handleClickOpen}>
                <div className={classes.menuItem}>
                  {t('Edit Profile Image')}
                </div>
              </MenuItem> */}
              {/* <MenuItem onClick={handleClickOpen}>
                <div className={classes.menuItem}>
                  {t('Edit Profile Image')}
                </div>
              </MenuItem> */}
              <MenuItem>
                <div onClick={logout} className={classes.menuItem}>
                  {t('Sign_Out')}
                </div>
              </MenuItem>
            </Menu>

          
          </div>
        </Toolbar>
        <KenDialog
          open={openDialog}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          positiveButtonText={t('labels:Save')}
          negativeButtonText={t('labels:Cancel')}
          negativeButtonClick={handleCancel}
          // positiveButtonClick={onSaveClick}
          positiveButtonProps={{
            onClick: onSaveClick,
            disabled: !profilePicture,
          }}
          negativeButtonProps={{
            disabled: !profilePicture,
          }}
          maxWidth="xs"
          title={
            <Box className={classes.leftAligned}>
              <Typography className={classes.popupHeader}>
                {t('labels:Edit_Profile_Image')}
              </Typography>
              <CloseIcon
                fontSize="small"
                onClick={handleClose}
                className={classes.pointer}
              />
            </Box>
          }
          titleStyle={classes.titleHead}
          dialogActions={true}
        >
          {/* <Dropzone
                onDrop={acceptedFiles => handleDrop(acceptedFiles)}
                style={{ height: '100%' }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} /> */}
          <Box>
            <Badge
              className={classes.profileEditButton}
              // onChange={imageUpload}
              overlap="circular"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              // style={{
              //   right: 3,
              //   top: 13,
              //   padding: '4px',
              // }}
              badgeContent={
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: classes.dropZone })}>
                      <input {...getInputProps()} />
                      <CameraBadge />
                      {/* <CameraAltRoundedIcon
                              color="secondary"
                              fontSize="large"
                            //   style={{
                            //     borderRadius: '70%',
                            //     backgroundColor: '#fff',
                            //   }}
                            /> */}
                    </div>
                  )}
                </Dropzone>
              }
            >
      
              {profilePicture ? (
                <KenAvatar
                  className={classes.profileCircle}
                  url={profilePicture}
                />
                 ) : uploadedProfilePicture?.body ? (
                <KenAvatar
                  className={classes.profileCircle}
                  src={`data:image/png;base64, ${uploadedProfilePicture?.body}`}
                />
               ) : (
                <KenAvatar
                  className={classes.profileCircle}
                  url={profilePicture}
                />
              )}
            </Badge>
          </Box>
          {/* </div>
                  </section> }
                {/* )} */}
          {/* </Dropzone> */}
        </KenDialog>
      </AppBar>
    </div>
  );
}
