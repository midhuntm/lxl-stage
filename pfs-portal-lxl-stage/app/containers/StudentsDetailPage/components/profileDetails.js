import React, { useEffect, useState } from 'react';
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  ButtonBase,
  Button,
  LinearProgress,
} from '@material-ui/core';
import KenInputField from '../../../components/KenInputField';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
import {
  getProfileImageData,
  saveStudentProfileImage,
  saveStudentProfileInfo,
} from '../../../utils/ApiService';
import './profile.css';
import KenLoader from '../../../components/KenLoader';
import imagePic from '../../../assets/ken42Image.png';
import KenSnackBar from '../../../components/KenSnackbar';
import KenButton from '../../../global_components/KenButton';
import KenSelect from '../../../global_components/KenSelect';
import PersonalDetails from '../../../utils/profile/personalDetails';
import KenAvatar from '../../../components/KenAvatar';
import PersAddress from '../../../utils/profile/personalAddress';
import Editpersoaladdress from '../../../utils/profile/Editpersoaladdress';

const useStyles = makeStyles(theme => ({
  parentRoot: {
    borderRadius: '3px',
    margin: '32px 0px 32px 0px',
    position: 'relative',
    padding: '15px 25px 30px',
  },
  parentsRoot: {
    borderRadius: '3px',
    margin: '32px 0px 32px 0px',
    position: 'relative',
    // padding: '15px 25px 30px'
  },
  circle: {
    width: '100px',
    height: '100px',
    lineHeight: '100px',
    borderRadius: '50%',
    color: theme.palette.KenColors.shadowColor,
    textAlign: 'center',
    background: `${theme.palette.KenColors.neutral100}`,
    fontSize: 'xxx-large',
  },
  profile: {
    position: 'absolute',
    top: '32px',
    left: '0px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  studentName: {
    fontWeight: 600,
    fontSize: '16px',
    color: theme.palette.KenColors.neutral900,
    marginTop: '8px',
  },
  rectangle: {
    height: '50px',
    background: 'linear-gradient(96.64deg, #B3D4FF 3.24%, #FED9D7 95.61%)',
    marginLeft: 10,
  },
  profileContainer: {
    position: 'relative',
  },
  heading: {
    padding: '16px',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
  },
  divInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    padding: '0px 16px 16px 16px',
  },
  info: {
    marginBottom: 10,
    fontSize: '12px',
    color: `${theme.palette.KenColors.primary}`,
  },
  divider: {
    margin: '0px 0px 10px 0px',
  },
  menuItemDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.KenColors.neutral40,
    },
  },
  av: {
    width: '36px',
    height: '36px',
    lineHeight: '33px',
    borderRadius: '55%',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    background: `${theme.palette.KenColors.neutral100}`,
  },
  titleDetails: {
    color: `${theme.palette.KenColors.neutral400}`,
    fontSize: 10,
  },
  plainLink: {
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      margin: '30px',
    },
    parentRoot: {
      borderRadius: '3px',
      margin: '32px 0px 32px 0px',
      position: 'relative',
      backgroundColor: '#F4F6FC',
      // height: '100%',
      // marginTop: 0,
    },
  },
  activeMenuItem: {
    borderLeft: `3px solid ${theme.palette.KenColors.cardActiveBorderColor}`,
    borderRadius: 4,
    backgroundColor: theme.palette.KenColors.cardActiveBackground,
    '& $titleName': {
      color: theme.palette.KenColors.cardActiveColor,
    },
  },
  root: {
    padding: 10,
    marginBottom: 9,
  },
  timerBox: {
    background: theme.palette.KenColors.tertiaryGreen49,
    padding: 5,
    borderRadius: 3,
    width: 105,
  },
  timerText: {
    fontWeight: 600,
    fontSize: 24,
    color: theme.palette.KenColors.tertiaryGreen,
  },
  progressBarBox: {
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: '#E5E5E5',
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#27AE60',
    },
  },
  progressBar: {
    height: 8,
    borderRadius: 27,
  },
  colorPrimary: {
    backgroundColor: theme.palette.KenColors.neutral20,
  },
  barColorPrimary: {
    backgroundColor: theme.palette.KenColors.tertiaryGreen49,
  },
  profileCircle: {
    width: '200px',
    height: '200px',
    lineHeight: '75px',
    borderRadius: '10px',
    fontSize: 80,
    color: '#fff',
    textAlign: 'center',
    background: `${theme.palette.KenColors.neutral100}`,
  },
}));
const ProfileDetails = ({
  profileBasicUpdate,
  setProfileBasicUpdate,
  personalDetails,
  state,
  setState,
  currentProfile,
}) => {
  const [data, setData] = useState(state);
  const [image, setImage] = useState();
  const [profileUpdateAcc, setProfileUpdateAcc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [loader, setLoader] = useState(false);
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('userDetails'));
  function handleChangeInput(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }

  console.log('statestatestatestate', data);
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };
  const handleProfileSave = () => {
    setLoader(true);
    console.log('data==============>', data);
    const newData = { ...data, ContactId: user.ContactId };
    saveStudentProfileInfo(newData)
      .then(data => {
        console.log('handleProfileSave', data);
        handleSnackbarOpen('success', 'successfully save');
        setProfileUpdateAcc(false);
        setLoader(false);
      })
      .catch(err => {
        handleSnackbarOpen('error', err.message);
        setProfileUpdateAcc(true);
        setLoader(false);
      });
    // setProfileUpdateAcc(false);
  };
  const getProfileImage = async () => {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const ContactId = JSON.parse(localStorage.getItem('userDetails'))
      ?.ContactId;
    const res = await getProfileImageData(ContactId);
    console.log('getProfileImageData', res);
    setImage(res.files[res.files.length - 1]?.body);
  };

  const updateProfileImage = async data => {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const ContactId = JSON.parse(localStorage.getItem('userDetails'))
      ?.ContactId;
    const imageData = await saveStudentProfileImage(data, ContactId);
    console.log('imageData', imageData);
    const datasss = await getProfileImage(ContactId);
    console.log('data', datasss);
    setLoading(false);
  };

  useEffect(() => {
    setData(state);
    const ContactId = JSON.parse(localStorage.getItem('userDetails'))
      ?.ContactId;
    getProfileImage(ContactId);
    // setLoading(true)
  }, [state, image]);
  console.log('loader', loading);
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      console.log('img---------------------->', reader.result);
    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }

  const progressStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    color: '#27AE60',
  };
  const handleImage = e => {
    setLoading(true);
    let formData = new FormData();
    formData.append('signature', e.target.files[0]);
    updateProfileImage(formData);
  };
  const onCancelHandle = () => {
    setProfileUpdateAcc(false);
  };

  return (
    <>
      {' '}
      {loader && <KenLoader />}
      <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      <Paper
        className={classes.parentsRoot}
        style={{ padding: '20px 25px', backgroundColor: '#fff' }}
      >
        <Grid container spacing={3}>
          {profileUpdateAcc ? (
            <Grid
              container
              xs={12}
              spacing={2}
              style={{ justifyContent: 'right', marginTop: 20 }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  className="cancel-btn"
                  style={{ backgroundColor: 'gray', color: 'white' }}
                  onClick={() => onCancelHandle()}
                >
                  Cancel
                </Button>{' '}
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className="btnMargin"
                  // style={{ minWidth: '100%' }}
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} sm={11}>
              <h2>Welcome, {data.firstName} </h2>
            </Grid>
          )}

          {profileUpdateAcc ? (
            <Grid item xs={11} sm={3}>
              <Paper
                className={classes.parentsRoot}
                style={{
                  height: '100%',
                  marginTop: 0,
                  paddingBottom: '35px',
                  marginBottom: 0,
                  // padding: '20px 25px',
                }}
              >
                {/* <BsFillPersonFill size={260} color="#D7DEE9" /> */}
                {loading && <KenLoader />}
                {image ? (
                  <img
                    style={{ width: '200px', height: '200px', paddingBottom: 'none', }}
                    src={`data:image/png;base64,${image}`}
                    className="add_grp_image"
                  />
                ) : (
                  <BsFillPersonFill
                    style={{
                      height: '100%',
                      width: '100%',
                      border: '1px solid #CCD1D8',
                    }}
                    color="#D7DEE9"
                  />
                  // <img
                  //   style={{ width: '100%', height: '100%' }}
                  //   src={imagePic}
                  //   className="add_grp_image"
                  // />
                )}
                <input
                  style={{
                    paddingTop: '10px',
                    paddingLeft: '2px',
                  }}
                  type="file"
                  // accept="image/*"
                  name="image"
                  id="file"
                  onChange={e => handleImage(e)}
                  // style="display: none;"
                />
              </Paper>
            </Grid>
          ) : (
            <>
              {/* {currentProfile && (
                <Grid item xs={12} sm={1} className="editButton">
                  <AiOutlineEdit
                    size={23}
                    onClick={() => setProfileUpdateAcc(true)}
                  />
                </Grid>
              )} */}
              <Grid item xs={12} sm={3} md={3}>
                {/* <Paper variant="outlined"> */}
                {console.log('image', image)}
                {image ? (
                  // <img
                  //   style={{ width: '100%', height: '100%' }}
                  //   src={`data:image/png;base64,${image}`}
                  //   className="add_grp_image"
                  // />
                  <KenAvatar
                    alt=""
                    src={`data:image/png;base64,${image}`}
                    className={classes.profileCircle}
                    value={data?.firstName?.charAt(0)}
                  />
                ) : (
                  <KenAvatar
                    alt=""
                    src={''}
                    className={classes.profileCircle}
                    // value={data?.firstName?.charAt(0)}
                  />
                )}

                {/* </Paper> */}
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={8} md={9}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <h1 style={{paddingTop:"40px"}}>
                  {data.firstName}&nbsp;{data.lastName}
                </h1>
              </Grid>
              <Grid item md={5}>
                {profileUpdateAcc ? null : (
                  <h3 style={{ color: '#F17227', float: 'right', marginTop:"0px" }}>
                    20% Profile Complete
                  </h3>
                )}
              </Grid>
              <Grid item md={3}>
                {profileUpdateAcc ? null : (
                  <KenButton
                    variant="primary"
                    style={{
                      height: 36,
                      marginRight: '10px',
                      float: 'right',
                      marginTop:"-15px",
                      width: 120,
                    }}
                    onClick={() => setProfileUpdateAcc(true)}
                  >
                    {'Edit Profile'}
                  </KenButton>
                )}
              </Grid>
            </Grid>
            <br /> <br />
            <Grid>
              <PersonalDetails
                state={data}
                personalDetails={profileUpdateAcc}
                setpersonalDetails={setProfileUpdateAcc}
                onChange={e => {
                  handleChangeInput(e);
                }}
                onSubmit={handleProfileSave}
                onCancel={onCancelHandle}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {profileUpdateAcc ? (
            <Editpersoaladdress
              state={data}
              personalDetails={profileUpdateAcc}
              setpersonalDetails={setProfileUpdateAcc}
              onChange={e => {
                handleChangeInput(e);
              }}
              onSubmit={handleProfileSave}
              onCancel={onCancelHandle}
            />
          ) : (
            <PersAddress
              state={data}
              personalDetails={profileUpdateAcc}
              setpersonalDetails={setProfileUpdateAcc}
            />
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default ProfileDetails;
