import React, { useState } from 'react';
import './components/Faculty.css';

import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  Tab,
  Tabs,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  withStyles,
  Fab,
  LinearProgress,
} from '@material-ui/core';
import {
  getAdditionalInfoData,
  getProfileImageData,
  getStudentDetails,
  getStudentInfo,
  saveStudentProfileImage,
} from '../../../utils/ApiService';
import { useTranslation } from 'react-i18next';
import FacultyDetails from './components/FacultyDetails';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import KenInputField from '../../../components/KenInputField';
import KenAvatar from '../../../components/KenAvatar';
import { AiOutlineDown } from 'react-icons/ai';
import FacultyAcademicDetails from './components/FacultyAcademicDetails';
import FacultyExperience from './components/FacultyExperience';
import FacultyResearchSupervision from './components/FacultyResearchSupervision';
import FacultyResearchPublications from './components/FacultyResearchPublications';
import FacultyConferences from './components/FacultyConferences';
import FacultyBook from './components/FacultyBook';
import FacultyProfessiona from './components/FacultyProfessional';
import FacultyOthers from './components/FacultyOthers';
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
import imagePic from '../../../assets/Ken42logo.png';

import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FacultyAddress from './components/FacultyAddress';
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

  header: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
  },
  boxContainer: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
    marginTop: '26px',
    // paddingTop: '62px',
    paddingBottom: '30px',
  },
  boxContainer1: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
    marginTop: '26px',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00218D',
  },

  addButton: {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
    textTransform: 'none',
    '&:hover': {
      color: 'white',
      borderBottom: '1px solid white',
    },
  },

  error: {
    color: '#FFFFFF',
    background: '#EB5757',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },

  profileCircle: {
    width: '129px',
    height: '129px',
    lineHeight: '75px',
    borderRadius: '50%',
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    background: `${theme.palette.KenColors.neutral100}`,
  },

  AccordionDetailsStyle: {
    display: 'block',
    width: '100%',
  },
  titleName: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    paddingBottom: '15px',
  },
  profileTitleText: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
  },
  profileTitleTextGreen: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#27AE60',
    paddingTop: '2px',
  },
}));

const progressStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  color: '#27AE60',
  // color: row > 0 ? '#27AE60' : '#EF4060',
};
// const ProgressCell = row => {
//   // const { status } = row.row.values;

//   const progressStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'start',
//     color: row > 0 ? '#27AE60' : '#EF4060',
//   };
// };

const facultyProfile = props => {
  const idGenerater = () => {
    let id = Math.random()
      .toString(36)
      .substr(2, 9);
    return id;
  };
  const { contactId } = props.match.params;

  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(1);

  const [profilePicUpdate, setProfilePicUpdate] = useState('');
  const [state, setState] = useState({});
  const [addressState, setAddressState] = useState([]);

  const [relationshipDetails, setRelationShipDetails] = useState([
    {
      res: {
        attributes: {
          type: 'hed__Relationship__c',
          url:
            '/services/data/v54.0/sobjects/hed__Relationship__c/a0N1y000003WFh2EAG',
        },
        Id: idGenerater(),
        name: 'Test',
        link: 'Test',
      },
    },
  ]);
  const [personalDetails, setpersonalDetails] = React.useState(false);
  const [academicDetails, setAcademicDetails] = React.useState([]);

  const [teachingDetails, setTeachingDetails] = React.useState([
    {
      res: {
        attributes: {
          type: 'hed__Relationship__c',
          url:
            '/services/data/v54.0/sobjects/hed__Relationship__c/a0N1y000003WFh2EAG',
        },
        Id: idGenerater(),
        Institute: '',
        Position: '',
        Role:
          '',
        Duration: '',
      },
    },
  ]);

  const [industryDetails, setIndustryDetails] = React.useState([
    {
      res: {
        attributes: {
          type: 'hed__Relationship__c',
          url:
            '/services/data/v54.0/sobjects/hed__Relationship__c/a0N1y000003WFh2EAG',
        },
        Id: idGenerater(),
        Institute: '',
        Position: '',
        Role: '',
        Duration: '',
      },
    },
  ]);

  const [addressDetails, setAddressDetails] = React.useState([]);
  const [ bookDetails,setBookDetails ] = React.useState([]);
  const [bookData,setBookData] = React.useState(false);
  const [otherDetails, setOtherDetails] = React.useState([]);
  const [othersData,setOthersData] = React.useState(false);
  const [researchDetails, setResearchDetails] = React.useState([]);
  const [researchData,setResearchData] = React.useState(false);
  const [reasearchPublications, setReasearchPublications] = React.useState([]);
  const [publicationsData,setPublicationsData] = React.useState(false);
  const [conferenceDetails, setConferenceDetails] = React.useState([]);
  const [conferenceData,setConferenceData] = React.useState(false);
  const [associationDetails, setAssociationDetails] = React.useState([]);
  const [associationData,setAssociationData] = React.useState(false);
  const [image, setImage] = React.useState();

  const handleChangeAccordien = id => {
    setExpanded(id);
  };

  const getStudentInfoData = async () => {
    const res = await getStudentInfo(contactId);
    console.log('ressssssss', res);
    const profileDetails = {
      BirthDate: res.BirthDate,
      CountryOfResidence: res.CountryOfResidence,
      Email: res.Email,
      firstName: res.firstName,
      Gender: res.Gender,
      lastName: res.lastName,
      Phone: res.Phone,
    };
    setAddressState(res.address);
    // let a = res[1].map(e => e.edHis);
    setState(profileDetails);
    // setProfileName(false);

    setProfilePicUpdate(
      profileDetails.firstName + ' ' + profileDetails.lastName
    );
    // setDetails(res.educationHistory.map(e => e.edHis));
    // setRelationShipDetails(res.relationship);
    setAddressDetails(res.address);
    setAcademicDetails(res.educationHistory);
  };
  // console.log('profileDetails', state);
  console.log(state,'statestate');
  React.useEffect(() => {
    const ContactId = JSON.parse(localStorage.getItem('userDetails'))
      ?.ContactId;
    getProfileImage(ContactId);
    // setLoading(true)
    console.log(ContactId,'ContactId');
  }, [image]);
  React.useEffect(() => {
    // getStudentData();
    getStudentInfoData();
    getAdditionalInfoData(contactId)
      .then(resp => {
        let data = resp.data;
        // infoData.map(el => {
        //   if (el.infoType === 'BOOK') {
        //     setBookDetails([{ ...el }]);
        //   } else if (el.infoType ==='OTHERS') {
        //     setOtherDetails([{ ...el }]);
        //   } else if (el.infoType === 'RESEARCH SUPERVISION') {
        //     setResearchDetails([{ ...el }]);
        //   } else if (el.infoType === 'RESEARCH & PUBLICATIONS') {
        //     setReasearchPublications([{ ...el }]);
        //   } else if (el.infoType === 'CONFERENCES') {
        //     setConferenceDetails([{ ...el }]);
        //   } else if (el.infoType === 'PROFESSIONAL ASSOCIATION') {
        //     setAssociationDetails([{ ...el }]);
        //   }
        // });
        // console.log(infoData);
        let result = [];
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          const isExist = result.find(res => res.infoType == item.infoType);
          if (isExist) {
            result.map(ele => {
              if (ele.infoType == item.infoType) {
                return (ele = {
                  ...ele,
                  data: ele?.data?.push(item),
                });
              }
            });
          } else {
            // item.count = 1;
            let obj = item;
            let dataItem = [];
            dataItem.push(obj);
            result.push({
              infoType: item.infoType,
              data: dataItem,
            });
          }
        }
        console.log(result);
        console.log('INFO TYPE RESULT', result);
        const research = result.filter(
          item => item.infoType == 'RESEARCH & PUBLICATIONS'
        );
        const researchSuper = result.filter(
          item => item.infoType == 'RESEARCH SUPERVISION'
        );
        const conference = result.filter(
          item => item.infoType == 'CONFERENCES'
        );
        const book = result.filter(item => item.infoType == 'BOOK');
        const association = result.filter(
          item => item.infoType == 'PROFESSIONAL ASSOCIATION'
        );
        const others = result.filter(item => item.infoType == 'OTHERS');
        setBookDetails(book.length > 0 ? book[0].data : []);
        setOtherDetails(others.length > 0 ? others[0].data : []);
        setResearchDetails(researchSuper.length > 0 ? researchSuper[0].data : []);
        setReasearchPublications(research.length > 0 ? research[0].data : []);
        setConferenceDetails(conference.length > 0 ? conference[0].data : []);
        setAssociationDetails(association.length > 0 ? association[0].data : []);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const classes = useStyles();

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
    // setLoading(false);
  };

  const handleImage = e => {
    // setLoading(true);
    let formData = new FormData();
    formData.append('signature', e.target.files[0]);
    updateProfileImage(formData);
  };
  const handleClick =() =>{
    props.history.goBack();
  }
  return (
    <Box>
      <div
        onClick={handleClick}
        style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}
      >
        <ArrowBackIcon className={classes.iconBack} color="primary" />
        <Typography className={classes.back} color="primary" >
          {t('Back')}
        </Typography>
      </div>
      {/* <AppBar position="static" elevation={0} className={classes.header}>
        <Toolbar
          style={{
            justifyContent: 'space-between',
            marginLeft: '79%',
          }}
        >
          <Typography variant="h6" className={classes.title}>
            {/* My Profile   {/*
          </Typography>  {/*
          {/*   <Grid
            item
            xs={6}
            style={{
              display: 'flex',
              justifyCpaddingBottom: 2,
              ntent: 'end',
            }}
          >
          */}
      {/* <Button
              // startIcon={<RiFilterLine />}
              variant="outlined"
              // color="primary"
              style={{ marginRight: '15px' }}
              // className={classes.addButton}
              // onClick={handleFilterDialog}
            >
              Cancel
            </Button> */}
      {/*
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
                onClick={() => setProfilePicUpdate(false)}
              >
                Save
              </Button>
            */}
      {/* {profilePicUpdate ? (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '15px' }}
                onClick={() => setProfilePicUpdate(false)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '15px' }}
                onClick={() => setProfilePicUpdate(true)}
              >
                update
              </Button>
            )} */}
      {/* </Grid>*/}
      {/*   </Toolbar>
      </AppBar>
      */}
      <AppBar position="static" elevation={0} className={classes.boxContainer}>
        <Toolbar
          className="faculty-edit-button"
          style={{
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" className={classes.title}>
            {/* My Profile */}
          </Typography>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'end' }}>
            {/* <Button
              // startIcon={<RiFilterLine />}
              variant="outlined"
              // color="primary"
              style={{ marginRight: '15px' }}
              // className={classes.addButton}
              // onClick={handleFilterDialog}
            >
              Cancel
            </Button> */}
            {/*   {profilePicUpdate ? (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '15px' }}
                onClick={() => setProfilePicUpdate(false)}
              >
                Save
              </Button>
            ) : (
              <AiOutlineEdit
                size={23}
                onClick={() => setProfilePicUpdate(true)}
              />
            )}
            */}
            {/* {profilePicUpdate ? (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '15px' }}
                onClick={() => setProfilePicUpdate(false)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '15px' }}
                onClick={() => setProfilePicUpdate(true)}
              >
                update
              </Button>
            )} */}
          </Grid>
        </Toolbar>

        <Toolbar
          style={{
            justifyContent: 'space-between',
          }}
        >
          {' '}
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'start' }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={
                <label htmlFor="image">
                  <input
                    style={{ display: 'none' }}
                    id="image"
                    name="image"
                    type="file"
                    onChange={e => handleImage(e)}
                  />

                  <Fab
                    size="small"
                    component="span"
                    aria-label="add"
                    style={{ backgroundColor: '#0065fd', color: '#fff' }}
                  >
                    <AiOutlineEdit />
                  </Fab>
                </label>

                // <input
                //   type="file"
                //   // accept="image/*"
                //   name="image"
                //   id="file"

                //   // onChange={e => handleImage(e)}
                //   // style="display: none;"
                // />
              }
            >
              <KenAvatar
                alt="Travis Howard"
                src={`data:image/png;base64,${image}`}
                className={classes.profileCircle}
              />
            </Badge>

            {/* <KenAvatar
                className={classes.profileCircle}
                url="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              />
              <input
                type="file"
                // accept="image/*"
                name="image"
                id="file"
                // onChange={e => handleImage(e)}
                // style="display: none;"
              /> */}
          </Grid>
          <Grid
            item
            xs={10}
            style={{ display: 'flex', justifyContent: 'start' }}
          >
            <div>
              <Typography variant="h1" className={classes.titleName}>
                {profilePicUpdate ? profilePicUpdate : ''}
              </Typography>
              <></>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 1 ? true : false}
          onChange={() => handleChangeAccordien(1)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              PERSONAL DETAILS{' '}
              {expanded === 1 && !personalDetails && (
                <AiOutlineEdit
                  size={23}
                  onClick={() => setpersonalDetails(true)}
                />
              )}
            </Typography>{' '}
          </AccordionSummary>
          <AccordionDetails>
            <FacultyDetails
              state={state}
              personalDetails={personalDetails}
              setpersonalDetails={setpersonalDetails}
              setState={setState}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' ,display:"inline-block"}}
          expanded={expanded === 2 ? true : false}
          onChange={() => handleChangeAccordien(2)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              ADDRESS DETAILS{' '}
              {expanded === 2 && !personalDetails && (
                <AiOutlineEdit
                  size={23}
                  onClick={() => setpersonalDetails(true)}
                />
              )}
            </Typography>{' '}
          </AccordionSummary>

          <AccordionDetails style={{ display: 'inline-block', width: '100%' }}>
            <FacultyAddress
              state={addressDetails}
              setpersonalDetails={setpersonalDetails}
              addressDetails={personalDetails}
              setState={setState}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 3 ? true : false}
          onChange={() => handleChangeAccordien(3)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              ACADEMIC DETAILS (highest qualification to be mentioned in the
              first row)
            </Typography>{' '}
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetailsStyle}>
            <FacultyAcademicDetails
              academicDetails={academicDetails}
              setAcademicDetails={setAcademicDetails}
              setpersonalDetails={setpersonalDetails}
              personalDetails={personalDetails}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 4 ? true : false}
          onChange={() => handleChangeAccordien(4)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              EXPERIENCE: (latest work experience details to be mentioned in the
              first row)
            </Typography>{' '}
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetailsStyle}>
            <FacultyExperience
              teachingDetails={teachingDetails}
              setTeachingDetails={setTeachingDetails}
              industryDetails={industryDetails}
              setIndustryDetails={setIndustryDetails}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 5 ? true : false}
          onChange={() => handleChangeAccordien(5)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              RESEARCH SUPERVISION
              {expanded === 5 &&(
                <AiOutlineEdit
                  size={23}
                  onClick={() => setResearchData(true)}
                />
              )}
            </Typography>{' '}
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetailsStyle}>
            <FacultyResearchSupervision
              setAdditionalData={setResearchDetails}
              additionalData={researchDetails}
              researchData={researchData}
              setResearchData={setResearchData}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 6 ? true : false}
          onChange={() => handleChangeAccordien(6)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              RESEARCH & PUBLICATIONS{' '}
              {expanded === 6 &&(
                <AiOutlineEdit
                  size={23}
                  onClick={() => setPublicationsData(true)}
                />
              )}
            </Typography>{' '}
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetailsStyle}>
            <FacultyResearchPublications
              setAdditionalData={setReasearchPublications}
              additionalData={reasearchPublications}
              setPublicationsData={setPublicationsData}
              publicationsData={publicationsData}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      {/* ss */}
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 7 ? true : false}
          onChange={() => handleChangeAccordien(7)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              CONFERENCES{' '}
              {expanded === 7 &&(
                <AiOutlineEdit
                  size={23}
                  onClick={() => setConferenceData(true)}
                />
              )}
            </Typography>{' '}
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetailsStyle}>
            <FacultyConferences
              setAdditionalData={setConferenceDetails}
              additionalData={conferenceDetails}
              setConferenceData={setConferenceData}
              conferenceData={conferenceData}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 8 ? true : false}
          onChange={() => handleChangeAccordien(8)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              BOOK{' '}
              {expanded === 8 &&(
                <AiOutlineEdit
                  size={23}
                  onClick={() => setBookData(true)}
                />
              )}
            </Typography>{' '}
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetailsStyle}>
            <FacultyBook
              setAdditionalData={setBookDetails}
              additionalData={bookDetails}
              setBookData={setBookData}
              bookData= {bookData}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 9 ? true : false}
          onChange={() => handleChangeAccordien(9)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={classes.title}>
              PROFESSIONAL ASSOCIATION{' '}
              {expanded === 9 &&(
                <AiOutlineEdit
                  size={23}
                  onClick={() => setAssociationData(true)}
                />
              )}
            </Typography>{' '}
           
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetailsStyle}>
            <FacultyProfessiona
              setAdditionalData={setAssociationDetails}
              additionalData={associationDetails}
              setAssociationData={setAssociationData}
              associationData={associationData}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.boxContainer1}>
        <Accordion
          // style={{ marginBottom: '10px' }}
          expanded={expanded === 10 ? true : false}
          onChange={() => handleChangeAccordien(10)}
        >
          <AccordionSummary
            expandIcon={<AiOutlineDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="tete"
          >
            <Typography variant="h6" className={classes.title}>
              OTHERS{' '}
              {expanded === 10 &&(
                <AiOutlineEdit
                  size={23}
                  onClick={() => setOthersData(true)}
                />
              )}
            </Typography>{' '}
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetailsStyle}>
            <FacultyOthers
              setAdditionalData={setOtherDetails}
              additionalData={otherDetails}
              setOthersData={setOthersData}
              othersData={othersData}
            />
          </AccordionDetails>
        </Accordion>
      </AppBar>
    </Box>
  );
};

export default facultyProfile;
