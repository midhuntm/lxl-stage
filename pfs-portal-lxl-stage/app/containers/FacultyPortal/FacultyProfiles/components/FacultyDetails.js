import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Faculty.css';
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  ButtonBase,
  Button,
} from '@material-ui/core';
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
import { saveStudentProfileInfo } from '../../../../utils/ApiService';
import { KEY_STATUS } from '../../../../utils/constants';

import KenInputField from '../../../../components/KenInputField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KenSelect from '../../../../global_components/KenSelect';
import PersonalDetails from '../../../../utils/profile/personalDetails';
import KenLoader from '../../../../components/KenLoader';
import KenSnackBar from '../../../../components/KenSnackbar';

const useStyles = makeStyles(theme => ({
  box1: {
    // maxWidth: 832,
    // minWidth: 400,
    position: 'relative',
  },
  healthGrid: {
    marginTop: theme.spacing(2),
  },
  grid: {
    minWidth: '13.8vw',
  },
  detailTitle1: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
    textTransform: 'uppercase',
  },
  back: {
    fontSize: '12px',
    '&:hover': {
      cursor: 'pointer',
    },
    marginLeft: '-8px',
  },
  iconBack: {
    height: 12,
  },
  loader: {
    minHeight: '100vh',
    minWidth: '100vh',
  },
  breadCrumbWrapper: {
    margin: '15px 0',
  },
  header: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
  },
  boxContainer: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
    marginTop: '26px',
    paddingTop: '62px',
    paddingBottom: '30px',
  },
  boxContainer1: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
    marginTop: '26px',
  },
  imageSection: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
    marginTop: '26px',
  },
  innerTitle: {
    fontSize: 16,
    marginTop: '30px',
  },
  subHeaderTitle: {
    width: '100%',
  },
}));

const FacultyDetails = ({
  state,
  setState,
  personalDetails,
  setpersonalDetails,
}) => {
  const contactId = JSON.parse(localStorage.getItem('userDetails'));

  const { t } = useTranslation();
  const [data, setData] = useState(state);
  // const [personalDetails, setpersonalDetails] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(KEY_STATUS.success);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const classes = useStyles();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [addressCheckBox, setAddressCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  function handleChangeInput(evt) {
    const value = evt.target.value;
    console.log('vvvvvvvvvvvv', value);
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }
  const handleFacaultyDetails = () => {
    setLoading(true);
    const newData = {
      ...data,
      ContactId: contactId.ContactId,
    };
    saveStudentProfileInfo(newData)
      .then(res => {
        if (res) {
          handleSnackbarOpen(
            KEY_STATUS.success,
            t('messages:Profile Updated!')
          );
          setpersonalDetails(false);
          setLoading(false);
        }
      })
      .catch(err => {
        handleSnackbarOpen(KEY_STATUS.failed, t(err));
        setLoading(false);
      });
  };

  useEffect(() => {
    setData(state);
  }, [state]);
  const handleChange123 = event => {
    console.log('event', event.target);

    setAddressCheckBox(event.target.checked);
  };
  // useEffect(() => {}, [addressCheckBox]);
  const onCancelHandle = () => {
    setpersonalDetails(false);
  };
  return (
    <>
      {loading && <KenLoader />}
      
      <PersonalDetails
        state={data}
        personalDetails={personalDetails}
        setpersonalDetails={setpersonalDetails}
        onChange={e => {
          handleChangeInput(e);
        }}
        onSubmit={handleFacaultyDetails}
        onCancel={onCancelHandle}
      />
      {/* <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      /> */}
    </>

    // <>
    //   {personalDetails ? (
    //     <Grid container spacing={2}>
    //       <KenSnackbar
    //         message={snackbarMessage}
    //         severity={snackbarSeverity}
    //         autoHideDuration={2000}
    //         open={openSnackbar}
    //         handleSnackbarClose={handleSnackbarClose}
    //         position="Bottom-Right"
    //       />
    //       <Grid item xs={12} sm={3}>
    //         <KenInputField
    //           label="First Name"
    //           name="firstName"
    //           value={data.firstName}
    //           dropdownColor="#FFFFFF"
    //           onChange={e => {
    //             handleChangeInput(e);
    //           }}
    //         />
    //       </Grid>

    //       <Grid item xs={12} sm={3}>
    //         <KenInputField
    //           label="Family/Last Name"
    //           name="lastName"
    //           value={data.lastName}
    //           dropdownColor="#FFFFFF"
    //           onChange={e => {
    //             handleChangeInput(e);
    //           }}
    //         />
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         {/* <KenInputField
    //           label="Gender"
    //           name="Gender"
    //           value={data.Gender}
    //           dropdownColor="#FFFFFF"
    //           onChange={e => {
    //             handleChangeInput(e);
    //           }}
    //         /> */}
    //         <KenSelect
    //           label="Gender"
    //           name="Gender"
    //           options={gender}
    //           value={data.Gender}
    //           onChange={e => {
    //             handleChangeInput(e);
    //           }}
    //           required={true}
    //         />
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         <KenInputField
    //           label="Date of Birth"
    //           name="BirthDate"
    //           value={data.BirthDate}
    //           dropdownColor="#FFFFFF"
    //           type="date"
    //           onChange={e => {
    //             handleChangeInput(e);
    //           }}
    //         />
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         <KenInputField
    //           label="Nationality"
    //           name="CountryOfResidence"
    //           value={data.CountryOfResidence}
    //           dropdownColor="#FFFFFF"
    //           onChange={e => {
    //             handleChangeInput(e);
    //           }}
    //         />
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         <KenInputField
    //           label="Email ID"
    //           name="EmailID"
    //           value={data.Email}
    //           dropdownColor="#FFFFFF"
    //           onChange={e => {
    //             handleChangeInput(e);
    //           }}
    //           disabled={true}
    //         />
    //       </Grid>

    //       <Grid item xs={12} sm={3}>
    //         <KenInputField
    //           label="Mobile Number"
    //           name="Phone"
    //           value={data.Phone}
    //           dropdownColor="#FFFFFF"
    //           onChange={e => {
    //             handleChangeInput(e);
    //           }}
    //         />
    //       </Grid>
    //       <Grid item xs={12} sm={3} />
    //       <div className="btn-save-cancel">
    //         <div className="save-btn">
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             className="btnMargin"
    //             // style={{ minWidth: '100%' }}
    //             onClick={() => handleFacaultyDetails()}
    //           >
    //             Save
    //           </Button>{' '}
    //         </div>
    //         <div>
    //           <Button
    //             variant="contained"
    //             className="cancel-btn"
    //             style={{ backgroundColor: 'gray', color: 'white' }}
    //             onClick={() => onCancelHandle()}
    //           >
    //             Cancel
    //           </Button>{' '}
    //         </div>
    //       </div>
    //     </Grid>
    //   ) : (
    //     <Grid container spacing={2}>
    //       <Grid item xs={12} sm={3}>
    //         <b className="text-size">Nationality:</b>
    //       </Grid>
    //       <Grid item xs={12} sm={8}>
    //         <Typography>{data.CountryOfResidence}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         <b className="text-size">Gender:</b>
    //       </Grid>
    //       <Grid item xs={12} sm={8}>
    //         <Typography>{data.Gender}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         <b className="text-size">Birthday :</b>
    //       </Grid>
    //       <Grid item xs={12} sm={8}>
    //         <Typography>{data.BirthDate}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         <b className="text-size">Phone :</b>
    //       </Grid>
    //       <Grid item xs={12} sm={8}>
    //         <Typography>{data.Phone}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         <b className="text-size">Email :</b>
    //       </Grid>
    //       <Grid item xs={12} sm={8}>
    //         <Typography>{data.Email}</Typography>
    //       </Grid>
    //       <Grid item xs={12} sm={3}>
    //         <b className="text-size">Country of Residence :</b>
    //       </Grid>
    //       <Grid item xs={12} sm={8}>
    //         <Typography>{data.CountryOfResidence}</Typography>
    //       </Grid>
    //     </Grid>
    //   )}
    // </>
  );
};

export default FacultyDetails;
