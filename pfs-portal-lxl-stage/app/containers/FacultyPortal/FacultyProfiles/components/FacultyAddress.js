import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import { Country, State, City } from 'country-state-city';

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
  Container,
} from '@material-ui/core';
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
import {
  saveFacultyAddressInfo,
  saveStudentProfileInfo,
} from '../../../../utils/ApiService';
import KenSnackbar from '../../../../components/KenSnackbar';
import { KEY_STATUS } from '../../../../utils/constants';
import KenSelect from '../../../../components/KenSelect';

import KenInputField from '../../../../components/KenInputField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FacAddress from './FacAddress';
import AddresDetails from '../../../../utils/profile/addressDetails';
import KenLoader from '../../../../components/KenLoader';

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

const FacultyAddress = props => {
  const { state, setState, addressDetails, setpersonalDetails } = props;
  console.log('props', props);
  const { t } = useTranslation();
  const [data, setData] = useState(state);
  console.log("data in faculty Address",state);
  console.log("data in faculty Address",data);
  const contactId = JSON.parse(localStorage.getItem('userDetails'));

  const [formValues, setFormValues] = useState([]);

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

  useEffect(() => {
    setData(state);
  }, [state]);

  const handleFacaultyDetails = () => {
    setLoading(true);
    const newvalues = formValues.map((form, index) => {
      return {
        attributes: {
          type: 'hed__Address__c',
          referenceId: `ref${index}`,
        },
        Id: form.id || null,
        hed__Address_Type__c: form.Addresstype,
        hed__Parent_Contact__c: contactId.ContactId,
        House_Flat_No__c: '12th',
        hed__MailingStreet__c: form.address,
        hed__MailingCity__c: form.distract,
        hed__MailingCountry__c: form.Country,
        hed__MailingPostalCode__c: form.pincode,
        hed__MailingState__c: form.state,
      };
    });
    const payload = {
      records: newvalues,
    };
    console.log('formValuesformValuesformValues', newvalues);
    saveFacultyAddressInfo(payload)
      .then(res => {
        if (res) {
          handleSnackbarOpen(
            KEY_STATUS.success,
            t('messages:Address Updated!')
          );
          setAddressDetails(false);
          setpersonalDetails(false);
          setLoading(false);
        }
      })
      .catch(err => {
        handleSnackbarOpen(KEY_STATUS.failed, t(err));
        setLoading(false);
      });
    setAddressDetails(false);
  };
  const addAddressRow = () => {
    setFormValues(prevState => {
      return [
        ...prevState,
        {
          id: null,
          Addresstype: '',
          Country: '',
          state: '',
          distract: '',
          address: '',
          pincode: '',
        },
      ];
    });

    // setDeleteRow(true);
  };

  const handleChange123 = event => {
    console.log('event', event.target);

    setAddressCheckBox(event.target.checked);
  };
  const onCancelHandle = () => {
    setpersonalDetails(false);
  };

  useEffect(() => {
    let formData = [];
    if (data.length > 0) {
      data.map(el => {
        let item = el.add;
        formData.push({
          id: item.Id,
          Addresstype: item.hed__Address_Type__c,
          Country: item.hed__MailingCountry__c,
          state: item.hed__MailingState__c,
          distract: item.hed__MailingCity__c,
          address: item.hed__MailingStreet__c,
          pincode: item.hed__MailingPostalCode__c,
        });
      });
    } else {
      formData.push({
        id: null,
        Addresstype: '',
        Country: '',
        state: '',
        distract: '',
        address: '',
        pincode: '',
      });
    }
  
    setFormValues(formData);
  }, [data]);
  console.log("formValues in faculty address details", formValues)
  return (
    <>
     {loading && <KenLoader />}
      <AddresDetails
        // state={data}
        setpersonalDetails={setpersonalDetails}
        addressDetails={addressDetails}
        formValues={formValues}
        setFormValues={setFormValues}
        onChange={e => {
          handleChangeInput(e);
        }}
        onSubmit={handleFacaultyDetails}
        onCancel={onCancelHandle}
        onaddAddressRow={addAddressRow}
      />
      {/* {personalDetails ? (
        // <div className="faculty-add-div">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <KenSnackbar
              message={snackbarMessage}
              severity={snackbarSeverity}
              autoHideDuration={2000}
              open={openSnackbar}
              handleSnackbarClose={handleSnackbarClose}
              position="Bottom-Right"
            />

            <Grid container spacing={2}>
              {formValues?.map((element, index) => {
                console.log('addressData', element);
                return (
                  <FacAddress
                    formValues={formValues}
                    index={index}
                    element={element}
                    setFormValues={setFormValues}
                  />
                );
              })}
            </Grid>
            <div
              style={{ display: 'flex', whiteSpace: 'pre', marginTop: '8px' }}
            >
              <div>
                <Button
                  onClick={addAddressRow}
                  variant="contained"
                  color="primary"
                  startIcon={<AiOutlinePlus />}
                >
                  Add Row
                </Button>
              </div>
              <div className="btn-save-cancel">
                {' '}
                <div className="save-btn">
                  <Button
                    variant="contained"
                    color="primary"
                    className="btnMargin"
                    onClick={() => handleFacaultyDetails()}
                  >
                    Save
                  </Button>{' '}
                </div>
                <div>
                  <Button
                    variant="contained"
                    className="cancel-btn"
                    style={{ backgroundColor: 'gray', color: 'white' }}
                    onClick={() => onCancelHandle()}
                  >
                    Cancel
                  </Button>{' '}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        // </div>
        // <Box >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={11} />
          <Grid item xs={12} sm={12} style={{ paddingLeft: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} />
              <Grid item xs={12} sm={2}>
                <b className="text-size">Type :</b>
                <Grid item xs={12}>
                  <Typography>Permanent</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">Country :</b>
                <Grid item xs={12}>
                  <Typography>India</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">State :</b>
                <Grid item xs={12}>
                  <Typography>Gujarat</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">District :</b>
                <Grid item xs={12}>
                  <Typography>Ahmedabad</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">Address :</b>
                <Grid item xs={12}>
                  <Typography>Ahmedabad</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">Pincode :</b>
                <Grid item xs={12}>
                  <Typography>380060</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} />
              <Grid item xs={12} sm={2}>
                <b className="text-size">Type :</b>
                <Grid item xs={12}>
                  <Typography>Permanent</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">Country :</b>
                <Grid item xs={12}>
                  <Typography>India</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">State :</b>
                <Grid item xs={12}>
                  <Typography>Karnataka</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">City :</b>
                <Grid item xs={12}>
                  <Typography>Bengaluru</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">Address :</b>
                <Grid item xs={12}>
                  <Typography>
                    67 Nima Crest, Ground floor 4th cross, J C Industrial
                    Layout, Yelachenahalli,
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={2}>
                <b className="text-size">Pincode :</b>
                <Grid item xs={12}>
                  <Typography>560062</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        // </Box>
      )} */}
    </>
  );
};

export default FacultyAddress;
