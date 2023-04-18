import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import KenInputField from '../../../components/KenInputField';
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
import {
  saveStudentAddressInfo,
  saveStudentEducationInfo,
  saveStudentProfileInfo,
  saveStudentRelationInfo,
} from '../../../utils/ApiService';
import './profile.css';
import KenLoader from '../../../components/KenLoader';
import KenButton from '../../../global_components/KenButton';
import KenSnackBar from '../../../components/KenSnackbar';
import Stepper from '@material-ui/core/Stepper';
import Box from '@material-ui/core/Box';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
// import Button from '@material-ui/core/Button';

const steps = ['Family Information', 'Address Details'];
const useStyles = makeStyles(theme => ({
  parentRoot: {
    borderRadius: '3px',
    margin: '32px 0px 32px 0px',
    position: 'relative',
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
    lineHeight: '10px',
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
  },
  activeMenuItem: {
    borderLeft: `3px solid ${theme.palette.KenColors.cardActiveBorderColor}`,
    borderRadius: 4,
    backgroundColor: theme.palette.KenColors.cardActiveBackground,
    '& $titleName': {
      color: theme.palette.KenColors.cardActiveColor,
    },
  },
  nextBtn: {
    float: 'right',
  },
}));
const PersonalDetails = ({
  profileUpdate,
  educationUpdate,
  addressUpdate,
  relationship,
  setEducationUpdate,
  setAddressUpdate,
  setRelationShip,
  details,
  setDetails,
  expandeds,
  setExpanded,
  relationshipDetails,
  state,
  setState,
  setRelationShipDetails,
  addressDetails,
  setAddressDetails,
}) => {
  console.log(
    'addressDetails',
    addressDetails,
    relationshipDetails,
    details,
    state
  );
  const [detailPage, setDetailPage] = useState(details);
  const [educationAcc, setEducationAcc] = useState(false);
  const [famInfo, setFamInfo] = useState(false);
  const [addressBtn, setAddressBtn] = useState(false);
  const [relationshipBtn, setRelationshipBtn] = useState(false);

  const [data, setData] = useState(state);
  const [loader, setLoader] = useState(false);
  const [expand, setExpand] = useState(false);

  const [addressAcc, setAddressAcc] = useState(true);
  const [idAcc, setIdAcc] = useState(false);
  const [relationshipAcc, setRelationshipAcc] = useState(false);
  const [relationShipPage, setRelationShipPage] = useState(relationshipDetails);
  const [addressPage, setAddressPage] = useState(addressDetails);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  // stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  // end stepper

  useEffect(() => {
    setData(state);
    // getProfileImage();
  }, [state]);

  const handleChangeInput = (evt, i) => {
    console.log('setDetailPage', evt.target.value, evt.target.name, detailPage);
    const details = Object.values(detailPage);
    const value = evt.target.value;
    setDetailPage(
      detailPage?.map((e, index) => {
        if (i == index) {
          return { ...e, [evt.target.name]: evt.target.value };
        } else {
          return e;
        }
      })
    );
  };

  const handleChangeInputAddress = (evt, i) => {
    const value = evt.target.value;
    setAddressPage(
      addressPage.map((e, index) => {
        if (i == index) {
          return {
            ...e,
            add: { ...e.add, [evt.target.name]: evt.target.value },
          };
        } else {
          return { ...e, add: e.add };
        }
      })
    );
  };

  const handleDeleteCurrent = () => {
    setAddressPage([
      ...addressPage,
      {
        add: {
          Id: null,
          current__Address_Type__c: '', // it is
          current__MailingCountry__c: '', // it is
          current__MailingCity__c: '', // it is
          current__MailingStreet__c: '', // it is
          current__MailingPostalCode__c: '', // it is
          current__Parent_Contact__c: '', // it is
        },
      },
    ]);
  };

  const handleDeletePermanent = i => {
    setAddressPage(
      addressPage.map((e, index) => {
        if (i == index) {
          return {
            ...e,
            add: {
              ...e.add,
              attributes: {
                type: 'hed__Address__c',
                referenceId: 'ref1',
                // url:
                //   '/services/data/v54.0/sobjects/hed__Address__c/a001y000005iriyAAA',
              },
              Id: null,
              // Name: 'A-01790',
              hed__Address_Type__c: 'Temporary', // it is
              // hed__Default_Address__c: false,
              // hed__Geolocation__c: null,
              // Is_Permanent_Address_Same__c: false,
              House_Flat_No__c: '',
              // hed__Formula_MailingAddress__c: '',
              hed__MailingCountry__c: '', // it is
              hed__MailingCity__c: '', // it is
              hed__MailingStreet__c: '', // it is
              // hed__Formula_MailingStreetAddress__c:
              //   'Haudin Streetss<br>Banglores,  50000123<br>India',
              hed__MailingPostalCode__c: '', // it is
              hed__Parent_Contact__c: '0030w00000rqMzVAAU', // it is
            },
          };
        } else {
          return { ...e, add: e.add };
        }
      })
    );
  };

  const handleChangeRelation = (evt, i) => {
    console.log('evt.name', evt);
    setRelationShipPage(
      relationShipPage.map((e, index) => {
        if (i == index) {
          return {
            ...e,
            res: { ...e.res, [evt.target.name]: evt.target.value },
          };
        } else {
          return { ...e, res: e.res };
        }
      })
    );
  };
  const handleRelation = () => {
    // setRelationShip(true);
  };

  const handleAddress = () => {
    // setAddressUpdate(true);
  };

  const handleChangeAccordien = panel => (event, isExpanded) => {
    setExpand(isExpanded ? panel : false);
  };

  const handleEdit = panel => (event, isExpanded) => {
    event.stopPropagation();
    console.log('first');
    setEducationAcc(true);
    // setExpand(isExpanded ? panel : false)
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };
  useEffect(() => {
    setLoader(true);
    setDetailPage(details);
    setAddressPage(addressDetails);
    if (Object.values(relationshipDetails).length > 0) {
      console.log('relationshipDetails', relationshipDetails);
      setRelationShipPage(relationshipDetails);
    }
    if (relationShipPage.length > 2) {
      setRelationshipBtn(false);
    } else {
      setRelationshipBtn(true);
    }
    if (addressPage.length > 2) {
      setAddressBtn(false);
    } else {
      setAddressBtn(true);
    }
    setLoader(false);
  }, [details, relationshipDetails, addressDetails]);
  const handleSaveEducation = () => {
    console.log('handleSaveEducation', detailPage);
    setLoader(true);
    saveStudentEducationInfo(detailPage)
      .then(data => {
        console.log('data-no error', data);
        handleSnackbarOpen('success', 'successfully save');
        setEducationAcc(false);
        setLoader(false);
      })
      .catch(err => {
        console.log('data-err', err.message);
        handleSnackbarOpen('error', err.message);
        setLoader(false);
        setEducationAcc(true);
      });
    // setEducationAcc(false);
  };

  const handleSaveAddress = () => {
    setLoader(true);
    console.log('addressPage', addressPage);
    saveStudentAddressInfo(addressPage)
      .then(data => {
        setLoader(false);
        handleSnackbarOpen('success', 'successfully save');
        setAddressAcc(true);
        console.log('data', data);
      })
      .catch(err => {
        console.log('data-err', err.message);
        handleSnackbarOpen('error', err.message);
        setLoader(false);
        setAddressAcc(true);
      });
  };

  function handleChangeInputs(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }
  const addAddress = () => {
    genAddress();
  };

  const genAddress = () => {
    setAddressPage([
      ...addressPage,
      {
        add: {
          attributes: {
            type: 'hed__Address__c',
            referenceId: 'ref1',
            // url:
            //   '/services/data/v54.0/sobjects/hed__Address__c/a001y000005iriyAAA',
          },
          Id: null,
          // Name: 'A-01790',
          hed__Address_Type__c: 'Temporary', // it is
          // hed__Default_Address__c: false,
          // hed__Geolocation__c: null,
          // Is_Permanent_Address_Same__c: false,
          // House_Flat_No__c: '',
          // hed__Formula_MailingAddress__c: '',
          hed__MailingCountry__c: '', // it is
          hed__MailingCity__c: '', // it is
          hed__MailingStreet__c: '', // it is
          // hed__Formula_MailingStreetAddress__c:
          //   'Haudin Streetss<br>Banglores,  50000123<br>India',
          hed__MailingPostalCode__c: '', // it is
          hed__Parent_Contact__c: '0030w00000rqMzVAAU', // it is
        },
      },
      {
        add: {
          attributes: {
            type: 'hed__Address__c',
            referenceId: 'ref1',
            // url:
            //   '/services/data/v54.0/sobjects/hed__Address__c/a001y000005iriyAAA',
          },
          Id: null,
          // Name: 'A-01790',
          hed__Address_Type__c: 'Temporary', // it is
          // hed__Default_Address__c: false,
          // hed__Geolocation__c: null,
          // Is_Permanent_Address_Same__c: false,
          // House_Flat_No__c: '',
          // hed__Formula_MailingAddress__c: '',
          hed__MailingCountry__c: '', // it is
          hed__MailingCity__c: '', // it is
          hed__MailingStreet__c: '', // it is
          // hed__Formula_MailingStreetAddress__c:
          //   'Haudin Streetss<br>Banglores,  50000123<br>India',
          hed__MailingPostalCode__c: '', // it is
          hed__Parent_Contact__c: '0030w00000rqMzVAAU', // it is
        },
      },
    ]);
  };

  const saveIdDetails = () => {
    console.log('saveStudentProfileInfo(data);', data);
    saveStudentProfileInfo(data);
    setIdAcc(false);
  };
  const classes = useStyles();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handledata = e => {
    console.log(e);
    handleNext();
  };
  return (
    <div>
      {loader && <KenLoader />}
      <KenSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                {activeStep == 0 && (
                  <>
                    {relationShipPage.length > 0 &&
                      relationShipPage.map((relation, ind) => {
                        console.log('resas', relation?.res);
                        const newVal = relation?.res;
                        return (
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={11}>
                              <h3>FAMILY INFORMATION</h3>
                            </Grid>
                            <Grid item xs={3}>
                              <KenInputField
                                label="Father Name"
                                name="Name_of_the_Father__c"
                                value={newVal.Name_of_the_Father__c}
                                dropdownColor="#FFFFFF"
                                onChange={e => {
                                  handleChangeRelation(e, ind);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <KenInputField
                                label="Mother Name"
                                name="Name_of_the_Mother__c"
                                value={newVal.Name_of_the_Mother__c}
                                dropdownColor="#FFFFFF"
                                onChange={e => {
                                  handleChangeRelation(e, ind);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <KenInputField
                                label="Primary Contact"
                                name="permanentNumber"
                                dropdownColor="#FFFFFF"
                                // value={newVal?.permanentNumber}
                                onChange={e => {
                                  handleChangeRelation(e, ind);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <KenInputField
                                label="Alternate Contact"
                                name="alternateNumber"
                                dropdownColor="#FFFFFF"
                                // value={newVal?.alternateNumber}
                                onChange={e => {
                                  handleChangeRelation(e, ind);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <KenInputField
                                label="Mail ID"
                                name="mail__Id"
                                dropdownColor="#FFFFFF"
                                // value={newVal?.mail__Id}
                              />
                            </Grid>
                          </Grid>
                        );
                      })}
                    {activeStep === 0 ? (
                      <Grid item xs={12}>
                        <KenButton
                          type="submit"
                          variant="primary"
                          style={{ float: 'right' }}
                          sx={{ mr: 1 }}
                          onClick={()=> handledata()}
                        >
                          Next
                        </KenButton>
                      </Grid>
                    ) : null}
                  </>
                )}
                {activeStep == 1 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={11} />
                    <Grid item xs={12} sm={1} className="editButton">
                      {addressAcc ? (
                        <Button
                          className="save"
                          variant="contained"
                          color="primary"
                          onClick={() => handleSaveAddress()}
                        >
                          Save
                        </Button>
                      ) : (
                        <AiOutlineEdit
                          size={23}
                          onClick={() => setAddressAcc(true)}
                        />
                      )}
                    </Grid>
                    {addressPage.map((addressEle, ind) => {
                      return (
                        <Grid container spacing={2}>
                          {addressEle.add.hed__Address_Type__c ==
                            'Permanent' && (
                            <>
                              <Grid item xs={12} sm={11}>
                                <h3>CURRENT ADDRESS</h3>
                              </Grid>
                              <Grid item xs={10} sm={3}>
                                {addressAcc ? (
                                  <KenInputField
                                    label="House/Flat No"
                                    name="House_Flat_No__c"
                                    value={addressEle.add.House_Flat_No__c}
                                    dropdownColor="#FFFFFF"
                                    onChange={e => {
                                      handleChangeInputAddress(e, ind);
                                    }}
                                  />
                                ) : (
                                  <>
                                    <Typography>
                                      <b>House/Flat No</b>
                                    </Typography>
                                    <br />
                                    {addressEle.add.House_Flat_No__c}
                                  </>
                                )}
                              </Grid>
                              <Grid item xs={10} sm={2}>
                                {addressAcc ? (
                                  <KenInputField
                                    label="Road"
                                    name="hed__MailingStreet__c"
                                    value={addressEle.add.hed__MailingStreet__c}
                                    dropdownColor="#FFFFFF"
                                    onChange={e => {
                                      handleChangeInputAddress(e, ind);
                                    }}
                                  />
                                ) : (
                                  <>
                                    <Typography>
                                      <b>Road</b>
                                    </Typography>
                                    <br />
                                    {addressEle.add.hed__MailingStreet__c}
                                  </>
                                )}
                              </Grid>
                              <Grid item xs={10} sm={2}>
                                {addressAcc ? (
                                  <KenInputField
                                    label="Suburb"
                                    name="hed__MailingCity__c"
                                    value={addressEle.add.hed__MailingCity__c}
                                    dropdownColor="#FFFFFF"
                                    onChange={e => {
                                      handleChangeInputAddress(e, ind);
                                    }}
                                  />
                                ) : (
                                  <>
                                    <Typography>
                                      <b>Suburb</b>
                                    </Typography>
                                    <br />
                                    {addressEle.add.hed__MailingCity__c}
                                  </>
                                )}
                              </Grid>
                              <Grid item xs={10} sm={2}>
                                {addressAcc ? (
                                  <KenInputField
                                    label="Country"
                                    name="hed__MailingCountry__c"
                                    value={addressEle.add.hed__MailingCountry__c
                                      .split('<br>')
                                      .pop()}
                                    dropdownColor="#FFFFFF"
                                    onChange={e => {
                                      handleChangeInputAddress(e, ind);
                                    }}
                                  />
                                ) : (
                                  <>
                                    <Typography>
                                      <b>Country</b>
                                    </Typography>
                                    <br />
                                    {
                                      addressEle.add
                                        .hed__Formula_MailingAddress__c
                                    }
                                  </>
                                )}
                              </Grid>
                              <Grid item xs={10} sm={2}>
                                {addressAcc ? (
                                  <KenInputField
                                    label="Pincode"
                                    name="hed__MailingPostalCode__c"
                                    value={
                                      addressEle.add.hed__MailingPostalCode__c
                                    }
                                    dropdownColor="#FFFFFF"
                                    onChange={e => {
                                      handleChangeInputAddress(e, ind);
                                    }}
                                  />
                                ) : (
                                  <>
                                    <Typography>
                                      <b>Pincode</b>
                                    </Typography>
                                    <br />
                                    {addressEle.add.hed__MailingPostalCode__c}
                                  </>
                                )}
                              </Grid>
                            </>
                          )}
                          <>
                            <Grid item xs={12} sm={12}>
                              <h3>
                                {ind == 0 ? 'CURRENT' : 'PERMANENT'} ADDRESS
                              </h3>
                            </Grid>
                            <Grid item xs={10} sm={3}>
                              {addressAcc ? (
                                <KenInputField
                                  label="HOUSE/STREET"
                                  name="hed__MailingStreet__c"
                                  value={addressEle.add.hed__MailingStreet__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>STREET</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingStreet__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="CITY"
                                  name="hed__MailingCity__c"
                                  value={addressEle.add.hed__MailingCity__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>CITY</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingCity__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="STATE"
                                  name="hed__MailingState__c"
                                  value={addressEle.add.hed__MailingState__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>STATE</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingState__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  name="hed__MailingCountry__c"
                                  label="COUNTRY"
                                  value={addressEle.add.hed__MailingCountry__c}
                                  // value={dataStream.hed__MailingCountry__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>COUNTRY</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingCountry__c}
                                </>
                              )}
                            </Grid>

                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="POSTAL CODE"
                                  name="hed__MailingPostalCode__c"
                                  value={
                                    addressEle.add.hed__MailingPostalCode__c
                                  }
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>POSTAL CODE</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingPostalCode__c}
                                </>
                              )}
                            </Grid>

                            <Grid item xs={10} sm={1}>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AiFillDelete />}
                                onClick={() => handleDeletePermanent(ind)}
                                style={{
                                  marginTop: '1.5em',
                                  paddingLeft: '25px',
                                }}
                                // disabled={addressBtn}
                                // startIcon={<AiOutlinePlus />}
                              />
                            </Grid>
                          </>
                          {/* <>
                            <Grid item xs={12} sm={12}>
                              <h3>CURRENT ADDRESS</h3>
                            </Grid>
                            <Grid item xs={10} sm={3}>
                              {addressAcc ? (
                                <KenInputField
                                  label="STREET"
                                  name="Hous_Flat_No__c"
                                  value={addressEle.add.House_Flat_No__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>STREET</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.House_Flat_No__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="CITY"
                                  name="hed__MailingStreet__c"
                                  value={addressEle.add.hed__MailingStreet__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>CITY</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingStreet__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="POSTAL CODE"
                                  name="hed__MailingCity__c"
                                  value={addressEle.add.hed__MailingCity__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>POSTAL CODE</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingCity__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="STATE"
                                  name="hed__MailingCountry__c"
                                  value={addressEle.add.hed__MailingCountry__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>STATE</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__Formula_MailingAddress__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  name="hed__MailingPostalCode__c"
                                  label="COUNTRY"
                                  value={addressEle.add.hed__MailingPostalCode__c}
                                  // value={dataStream.hed__MailingPostalCode__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>COUNTRY</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingPostalCode__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={1}>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AiFillDelete />}
                                style={{ marginTop: "1.5em", paddingLeft: "25px" }}
                                onClick={() => handleDeleteCurrent()}
                              // disabled={addressBtn}
                              // startIcon={<AiOutlinePlus />}
                              >
                              </Button>
                            </Grid>


                            <Grid item xs={12} sm={12}>
                              <h3>PERMANENT ADDRESS</h3>
                            </Grid>
                            <Grid item xs={10} sm={3}>
                              {addressAcc ? (
                                <KenInputField
                                  label="STREET"
                                  name="House_Flat_No__c"
                                  value={addressEle.add.House_Flat_No__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>STREET</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.House_Flat_No__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="CITY"
                                  name="permanent__MailingCity__c"
                                  value={addressEle.add.hed__MailingStreet__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>CITY</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingStreet__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="POSTAL CODE"
                                  name="hed__MailingCity__c"
                                  value={addressEle.add.hed__MailingCity__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>POSTAL CODE</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingCity__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  label="STATE"
                                  name="hed__MailingCountry__c"
                                  value={addressEle.add.hed__MailingCountry__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>STATE</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__Formula_MailingAddress__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={2}>
                              {addressAcc ? (
                                <KenInputField
                                  name="hed__MailingPostalCode__c"
                                  label="COUNTRY"
                                  value={addressEle.add.hed__MailingPostalCode__c}
                                  // value={dataStream.hed__MailingPostalCode__c}
                                  dropdownColor="#FFFFFF"
                                  onChange={e => {
                                    handleChangeInputAddress(e, ind);
                                  }}
                                  required
                                />
                              ) : (
                                <>
                                  <Typography>
                                    <b>COUNTRY</b>
                                  </Typography>
                                  <br />
                                  {addressEle.add.hed__MailingPostalCode__c}
                                </>
                              )}
                            </Grid>
                            <Grid item xs={10} sm={1}>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AiFillDelete />}
                                onClick={() => handleDeletePermanent(ind)}
                                style={{ marginTop: "1.5em", paddingLeft: "25px" }}
                              // disabled={addressBtn}
                              // startIcon={<AiOutlinePlus />}
                              >
                              </Button>
                            </Grid>
                          </> */}
                        </Grid>
                      );
                    })}
                    {addressAcc && (
                      <>
                        <Grid item xs={12} sm={10} />{' '}
                        <Grid item xs={12} sm={2}>
                          {addressPage.length < 1 && (
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<AiOutlinePlus />}
                              onClick={e => addAddress(e)}
                              // disabled={addressBtn}
                              // startIcon={<AiOutlinePlus />}
                            >
                              Add Address
                            </Button>
                          )}
                        </Grid>
                      </>
                    )}
                  </Grid>
                )}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {activeStep == 1 ? (
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                ) : null}
                <Box sx={{ flex: '1 1 auto' }} />
                {/* {activeStep == 0 ? <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button> : null
                } */}
                {/* {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : 'Complete Step'}
                    </Button>
                  ))} */}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
      {/* <Accordion
        style={{ marginBottom: '10px' }}
        expanded={expand === 'panel1'}
        onChange={handleChangeAccordien('panel1')}
      >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>EDUCATION DETAILS</Typography>
          {!educationAcc && expand && (
            <AiOutlineEdit
              style={{ marginLeft: '10px' }}
              size={23}
              onClick={handleEdit('edit')}
            />
          )}
        </AccordionSummary>

        // <AccordionDetails style={{ padding: '8px 16px 30px 65px' }}>
        //   <Grid container spacing={1}>
        //     <Grid item xs={12} sm={11}>
        //       <h3>12th Level Details:</h3>
        //     </Grid>

        //     <Grid item xs={12} sm={1} className="editButton">
        //       {educationAcc && (
        //         <Button
        //           className="save"
        //           variant="contained"
        //           color="primary"
        //           onClick={() => handleSaveEducation()}
        //         >
        //           Save
        //         </Button>
        //       )}
        //     </Grid>
        //     <Grid item xs={12} sm={4}>
        //       {educationAcc ? (
        //         <KenInputField
        //           label="School Name"
        //           name="hed__Educational_Institution_Name__c"
        //           value={detailPage[0]?.hed__Educational_Institution_Name__c}
        //           dropdownColor="#FFFFFF"
        //           onChange={e => {
        //             handleChangeInput(e, 0);
        //           }}
        //         />
        //       ) :
        //         (
        //           <>
        //             <Typography>
        //               <b> School</b>
        //             </Typography>
        //             <br />
        //             {detailPage[0]?.hed__Educational_Institution_Name__c}
        //           </>
        //         )
        //       }
        //     </Grid>
        //     <Grid item xs={12} sm={4}>
        //       {educationAcc ? (
        //         <KenInputField
        //           label="Country"
        //           name="Country__c"
        //           value={detailPage[0]?.Country__c}
        //           dropdownColor="#FFFFFF"
        //           onChange={e => {
        //             handleChangeInput(e, 0);
        //           }}
        //         />
        //       ) : (
        //         <>
        //           <Typography>
        //             <b>Country</b>
        //           </Typography>
        //           <br />
        //           {detailPage[0]?.Country__c}
        //         </>
        //       )}
        //     </Grid>
        //     <Grid item xs={12} sm={4}>
        //       {educationAcc ? (
        //         <KenInputField
        //           label="Year of Passing"
        //           name="Year_of_Passing__c"
        //           value={detailPage[0]?.Year_of_Passing__c}
        //           dropdownColor="#FFFFFF"
        //           onChange={e => {
        //             handleChangeInput(e, 0);
        //           }}
        //         />
        //       ) : (
        //         <>
        //           <Typography>
        //             <b>Year of Passing</b>
        //           </Typography>
        //           <br />
        //           {detailPage[0]?.Year_of_Passing__c}
        //         </>
        //       )}
        //     </Grid>
        //     <Grid item xs={12} sm={12}>
        //       <h3>Graduate level Details:</h3>
        //     </Grid> */}
      {/* <Grid item xs={12} sm={3}>
              {educationAcc ? (
                <KenInputField
                  label="Graduate Level"
                  name="Level__c"
                  value={detailPage[1]?.Level__c}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e, 1);
                  }}
                />
              ) : (
                <>
                  <Typography>
                    <b>Graduate Level</b>
                  </Typography>
                  <br />
                  {detailPage[1]?.Level__c}
                </>
              )}
            </Grid> */}
      {/* <Grid item xs={12} sm={4}>
              {educationAcc ? (
                <KenInputField
                  label="College"
                  name="hed__Educational_Institution_Name__c"
                  value={detailPage[1]?.hed__Educational_Institution_Name__c}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e, 1);
                  }}
                />
              ) : (
                <>
                  <Typography>
                    <b>College</b>
                  </Typography>
                  <br />
                  {detailPage[1]?.hed__Educational_Institution_Name__c}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {educationAcc ? (
                <KenInputField
                  label="Country"
                  name="Country__c"
                  value={detailPage[1]?.Country__c}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e, 1);
                  }}
                />
              ) : (
                <>
                  <Typography>
                    <b>Country</b>
                  </Typography>
                  <br />
                  {detailPage[1]?.Country__c}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {educationAcc ? (
                <KenInputField
                  label="Year of Passing"
                  name="Year_of_Passing__c"
                  value={detailPage[1]?.Year_of_Passing__c}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e, 1);
                  }}
                />
              ) : (
                <>
                  <Typography>
                    <b>Year of Passing</b>
                  </Typography>
                  <br />
                  {detailPage[1]?.Year_of_Passing__c}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <h3>Post Graduate Level Details:</h3>
            </Grid> */}
      {/* <Grid item xs={12} sm={3}>
              {educationAcc ? (
                <KenInputField
                  label="Post Graduate Level"
                  name="Level__c"
                  value={detailPage[2]?.Level__c}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e, 2);
                  }}
                />
              ) : (
                <>
                  <Typography>
                    <b>Graduate Level</b>
                  </Typography>
                  <br />
                  {detailPage[2]?.Level__c}
                </>
              )}
            </Grid> */}
      {/* <Grid item xs={12} sm={4}>
        {educationAcc ? (
          <KenInputField
            label="College"
            name="hed__Educational_Institution_Name__c"
            value={detailPage[2]?.hed__Educational_Institution_Name__c}
            dropdownColor="#FFFFFF"
            onChange={e => {
              handleChangeInput(e, 2);
            }}
          />
        ) : (
          <>
            <Typography>
              <b>College</b>
            </Typography>
            <br />
            {detailPage[2]?.hed__Educational_Institution_Name__c}
          </>
        )}
      </Grid> */}
      {/* <Grid item xs={12} sm={4}>
        {educationAcc ? (
          <KenInputField
            label="Country"
            name="Country__c"
            value={detailPage[2]?.Country__c}
            dropdownColor="#FFFFFF"
            onChange={e => {
              handleChangeInput(e, 2);
            }}
            required
          />
        ) : (
          <>
            <Typography>
              <b>Country</b>
            </Typography>
            <br />
            {detailPage[2]?.Country__c}
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        {educationAcc ? (
          <KenInputField
            label="Year_of_Passing"
            name="Year_of_Passing__c"
            value={detailPage[2]?.Year_of_Passing__c}
            dropdownColor="#FFFFFF"
            onChange={e => {
              handleChangeInput(e, 2);
            }}
          />
        ) : (
          <>
            <Typography>
              <b>Year of Passing</b>
            </Typography>
            <br />
            {detailPage[2]?.Year_of_Passing__c}
          </>
        )}
      </Grid>
    </Grid> */}
      {/* </Paper> */}
      {/* </AccordionDetails >
      </Accordion >
  <Accordion style={{ marginBottom: '10px' }}>
    <AccordionSummary
      expandIcon={<AiOutlineDown />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>ADDRESS DETAILS</Typography>
    </AccordionSummary>
    <AccordionDetails style={{ padding: '8px 16px 30px 65px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={11} />
        <Grid item xs={12} sm={1} className="editButton">
          {addressAcc ? (
            <Button
              className="save"
              variant="contained"
              color="primary"
              onClick={() => handleSaveAddress()}
            >
              Save
            </Button>
          ) : (
            <AiOutlineEdit size={23} onClick={() => setAddressAcc(true)} />
          )}
        </Grid>
        {addressPage.map((addressEle, ind) => {
          return (
            <Grid container spacing={2}>
              {addressEle.add.hed__Address_Type__c == 'Permanent' && (
                <>
                  <Grid item xs={12} sm={11}>
                    <h3>PERMANENT ADDRESS</h3>
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    {addressAcc ? (
                      <KenInputField
                        label="House/Flat No"
                        name="House_Flat_No__c"
                        value={addressEle.add.House_Flat_No__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>House/Flat No</b>
                        </Typography>
                        <br />
                        {addressEle.add.House_Flat_No__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={2}>
                    {addressAcc ? (
                      <KenInputField
                        label="Road"
                        name="hed__MailingStreet__c"
                        value={addressEle.add.hed__MailingStreet__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>Road</b>
                        </Typography>
                        <br />
                        {addressEle.add.hed__MailingStreet__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={2}>
                    {addressAcc ? (
                      <KenInputField
                        label="Suburb"
                        name="hed__MailingCity__c"
                        value={addressEle.add.hed__MailingCity__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>Suburb</b>
                        </Typography>
                        <br />
                        {addressEle.add.hed__MailingCity__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={2}>
                    {addressAcc ? (
                      <KenInputField
                        label="Country"
                        name="hed__MailingCountry__c"
                        value={addressEle.add.hed__MailingCountry__c
                          .split('<br>')
                          .pop()}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>Country</b>
                        </Typography>
                        <br />
                        {addressEle.add.hed__Formula_MailingAddress__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={2}>
                    {addressAcc ? (
                      <KenInputField
                        label="Pincode"
                        name="hed__MailingPostalCode__c"
                        value={addressEle.add.hed__MailingPostalCode__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>Pincode</b>
                        </Typography>
                        <br />
                        {addressEle.add.hed__MailingPostalCode__c}
                      </>
                    )}
                  </Grid>
                </>
              )}

              {addressEle.add.hed__Address_Type__c == 'Temporary' && (
                <>
                  <Grid item xs={12} sm={12}>
                    <h3>CURRENT ADDRESS</h3>
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    {addressAcc ? (
                      <KenInputField
                        label="STREET"
                        name="House_Flat_No__c"
                        value={addressEle.add.House_Flat_No__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                        required
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>STREET</b>
                        </Typography>
                        <br />
                        {addressEle.add.House_Flat_No__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={2}>
                    {addressAcc ? (
                      <KenInputField
                        label="CITY"
                        name="hed__MailingStreet__c"
                        value={addressEle.add.hed__MailingStreet__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                        required
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>CITY</b>
                        </Typography>
                        <br />
                        {addressEle.add.hed__MailingStreet__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={2}>
                    {addressAcc ? (
                      <KenInputField
                        label="POSTAL CODE"
                        name="hed__MailingCity__c"
                        value={addressEle.add.hed__MailingCity__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                        required
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>POSTAL CODE</b>
                        </Typography>
                        <br />
                        {addressEle.add.hed__MailingCity__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={2}>
                    {addressAcc ? (
                      <KenInputField
                        label="STATE"
                        name="hed__MailingCountry__c"
                        value={addressEle.add.hed__MailingCountry__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                        required
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>STATE</b>
                        </Typography>
                        <br />
                        {addressEle.add.hed__Formula_MailingAddress__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={2}>
                    {addressAcc ? (
                      <KenInputField
                        name="hed__MailingPostalCode__c"
                        label="COUNTRY"
                        value={addressEle.add.hed__MailingPostalCode__c} */}
      {/* // value={dataStream.hed__MailingPostalCode__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => {
                          handleChangeInputAddress(e, ind);
                        }}
                        required
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>COUNTRY</b>
                        </Typography>
                        <br />
                        {addressEle.add.hed__MailingPostalCode__c}
                      </>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          );
        })}
        {addressAcc && (
          <>
            <Grid item xs={12} sm={10} />{' '}
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AiOutlinePlus />}
                onClick={e => addAddress(e)} */}
      {/* // disabled={addressBtn}
              // startIcon={<AiOutlinePlus />}
              >
                Add Address
              </Button>
            </Grid>
          </>
        )}
      </Grid> */}
      {/* <Button variant='contained'>Add Address</Button> */}
      {/* </AccordionDetails>
  </Accordion>{ ' ' } */}
      {/* <Accordion style={{ marginBottom: '10px' }}>
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>ID DETAILS</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '8px 16px 30px 65px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={11}>
                <h3>National ID Number</h3>
              </Grid>
              <Grid item xs={12} sm={1} className="editButton">
                {idAcc ? (
                  <Button
                    variant="contained"
                    className="save"
                    color="primary"
                    onClick={() => saveIdDetails()}
                  >
                    Save
                  </Button>
                ) : (
                  <AiOutlineEdit size={23} onClick={() => setIdAcc(true)} />
                )}
              </Grid>
              <Grid item xs={10} sm={3}>
                {idAcc ? (
                  <KenInputField
                    label="Passport Number"
                    name="PassportNumber"
                    value={data.PassportNumber}
                    dropdownColor="#FFFFFF"
                    onChange={e => {
                      handleChangeInputs(e);
                    }}
                    required
                  />
                ) : (
                  <>
                    <Typography>
                      <b>Passport Number</b>
                    </Typography>
                    <br />
                    {data.PassportNumber}
                  </>
                )}
              </Grid>
              <Grid item xs={10} sm={3}>
                {idAcc ? (
                  <KenInputField
                    label="National Id Number"
                    name="NationalIdNumber"
                    value={data.NationalIdNumber}
                    dropdownColor="#FFFFFF"
                    onChange={e => {
                      handleChangeInputs(e);
                    }}
                    required
                  />
                ) : (
                  <>
                    <Typography>
                      <b>National Id Number</b>
                    </Typography>
                    <br />
                    {data.NationalIdNumber}
                  </>
                )}
              </Grid>
              <Grid item xs={10} sm={3}>
                {idAcc ? (
                  <KenInputField
                    label="TAX File Number(only for Australians)"
                    name="TaxFileNum"
                    value={data.TaxFileNum}
                    dropdownColor="#FFFFFF"
                    onChange={e => {
                      handleChangeInputs(e);
                    }}
                    required
                  />
                ) : (
                  <>
                    <Typography>
                      <b>TAX File Number(only for Australians)</b>
                    </Typography>
                    <br />
                    {data.TaxFileNum}
                  </>
                )}
              </Grid>
              <Grid item xs={10} sm={3}>
                {idAcc ? (
                  <KenInputField
                    label="Emirates Id Number"
                    name="EmiratesIdNum"
                    value={data.EmiratesIdNum}
                    // value={dataStream.EmiratesIdNum}
                    dropdownColor="#FFFFFF"
                    onChange={e => {
                      handleChangeInputs(e);
                    }}
                    required
                  />
                ) : (
                  <>
                    <Typography>
                      <b>Emirates Id Number</b>
                    </Typography>
                    <br />
                    {data.EmiratesIdNum}
                  </>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>{' '} */}
      {/* <Accordion
        // expanded={expandeds}
        // onChange={() => handleChangeAccordien()}
        style={{ marginBottom: '10px' }}
      >
        <AccordionSummary
          expandIcon={<AiOutlineDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>RELATIONSHIP</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: '8px 16px 30px 65px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={11} />
            <Grid item xs={12} sm={1} className="editButton">
              {relationshipAcc ? (
                <Button
                  className="save"
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveRelation()}
                >
                  Save
                </Button>
              ) : (
                <AiOutlineEdit
                  size={23}
                  onClick={() => setRelationshipAcc(true)}
                />
              )}
            </Grid>
            {relationShipPage.map((relData, index) => {
              return (
                <>
                  <Grid item xs={12} sm={12}>
                    <h3>Parent {index + 1}</h3>
                  </Grid>

                  <Grid item xs={10} sm={4}>
                    {relationshipAcc ? (
                      <KenInputField
                        label="Parent Information"
                        name="hed__Type__c"
                        value={relData.res.hed__Type__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => handleChangeRelation(e, index)}
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>Parent Information</b>
                        </Typography>
                        <br />
                        {relData.res.hed__Type__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={4}>
                    {relationshipAcc ? (
                      <KenInputField
                        label="Qualification"
                        name="Currency_type__c"
                        value={relData.res.Currency_type__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => handleChangeRelation(e, index)}
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>Qualification</b>
                        </Typography>
                        <br />
                        {relData.res.Currency_type__c}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={10} sm={4}>
                    {relationshipAcc ? (
                      <KenInputField
                        label="language Spoken at home"
                        name="Language_Spoken_at_Home__c"
                        value={relData.res.Language_Spoken_at_Home__c}
                        dropdownColor="#FFFFFF"
                        onChange={e => handleChangeRelation(e, index)}
                      />
                    ) : (
                      <>
                        <Typography>
                          <b>Language Spoken At Home</b>
                        </Typography>
                        <br />
                        {relData.res.Language_Spoken_at_Home__c}
                      </>
                    )}
                  </Grid>
                </>
              );
            })}
            {relationshipAcc && (
              <>
                <Grid item xs={12} sm={10} />
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AiOutlinePlus />}
                    onClick={e => addRelationship(e)}
                    // disabled={relationshipBtn}
                  >
                    Add Relationship
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default PersonalDetails;
