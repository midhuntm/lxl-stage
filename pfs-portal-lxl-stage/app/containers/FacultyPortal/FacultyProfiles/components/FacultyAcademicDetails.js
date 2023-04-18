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
} from '@material-ui/core';
import KenInputField from '../../../../components/KenInputField';
import { AiOutlinePlus } from 'react-icons/ai';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { deleteEducationInfo, saveStudentEducationInfo } from '../../../../utils/ApiService';
import KenSelect from '../../../../global_components/KenSelect';
import { Country, State, City } from 'country-state-city';
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
  ButtonStyle: {
    marginTop: '10px',
  },
}));

const FacultyAcademicDetails = ({ academicDetails, setAcademicDetails }) => {
  console.log("academicDetails",academicDetails);
  const [data, setData] = useState(academicDetails);
  const [academicDetailsPage, setAcademicDetailsPage] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('userDetails'));
  const idGenerater = () => {
    let id = Math.random()
      .toString(36)
      .substr(2, 9);
    return id;
  };
  const classes = useStyles();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [countryDropdownOptions, setcountryDropdownOptions] = useState(
    Country.getAllCountries().map((countries, index) => {
      return {
        label: countries.name,
        value: countries.name,
      };
    })
  );

  const handleChangeAcademic = (evt, i) => {
    console.log('evt.name', evt);
   let academicData = academicDetailsPage.map((e, index) => {
      if (i == index) {
        return { ...e, [evt.target.name]: evt.target.value };
      } else {
        return e;
      }
    })
    console.log("academicDetailsPage event",academicData);
    setAcademicDetailsPage(academicData);
  };

  const addAcademicRow = () => {
    console.log('academicDetailsPage', academicDetailsPage);
    setAcademicDetailsPage(prevState => {
      return [
        ...prevState,
        {
          // edHis: {
          //   attributes: {
          //     type: 'hed__Relationship__c',
          //     url:
          //       '/services/data/v54.0/sobjects/hed__Relationship__c/a0N1y000003WFh2EAG',
          //   },
            Id: null,
            hed__Contact__c: user.ContactId,
            level: '',
            university: '',
            country:  '',
            year: '',
          // },
        },
      ];
    });

    // setDeleteRow(true);
  };

  function handleChangeInput(evt) {
    const value = evt.target.value;
    console.log('vvvvvvvvvvvv', value);
    setAcademicDetailsPage([{
      ...academicDetailsPage,
      [evt.target.name]: value,}
    ]);
  }

  const deleteAcademicDetails = id => {
    // const newA = [...academicDetailsPage]
    // console.log('neeeeeee', newA)
    // const newB = newA.filter(ab => {
    //   return ab?.id!= i;
    // });
    // console.log('neeeeeeeB', newB)
    // setAcademicDetailsPage(newB);
    // // setAcademicDetailsPage(prev => {
    // //    prev
    // // });
    setLoading(true);
    deleteEducationInfo(id).then(res=>{
     console.log("response delete",res);
     setLoading(false);
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    })
  };
 
  const handleFacaultyDetails =() =>{
    console.log('handleSaveEducation', academicDetailsPage);
    setLoading(true);
    const payload = [];
    academicDetailsPage.map((item, ind) => {
      payload.push({
        attributes: {
          type: 'hed__Education_History__c',
          referenceId: `ref${ind}`,
        },
        Id: item.id || null,
        hed__Contact__c: user.ContactId,
        Level__c: item.level,
        hed__Educational_Institution_Name__c: item.university,
        Country__c: item.country || '',
        Year_of_Passing__c: item.year,
      });
    });
    saveStudentEducationInfo(payload)
      .then(data => {
        console.log('data-no error', data);
        // handleSnackbarOpen('success', 'successfully save');
        // setEducationAcc(false);
        setLoading(false);
      })
      .catch(err => {
        console.log('data-err', err);
        // handleSnackbarOpen('error', err);
        setLoading(false);
        // setEducationAcc(true);
      });
  }

  useEffect(() => {
    let academicsData =[];
    academicDetails.map(item=>{
     let resp =item.edHis;
     academicsData.push({
      id: resp.Id,
      level:resp.Level__c ,
      country:resp.Country__c,
      university: resp.hed__Educational_Institution_Name__c,
      year: resp.Year_of_Passing__c,
     })
    })
    setAcademicDetailsPage(academicsData);
    console.log("check academicDetails",academicDetails);
  }, [academicDetails]);

  const levels=[
  { label: '12th', value: '12th' },
  { label: 'Graduate', value: 'Graduate' },
  { label: 'Post Graduate', value: 'Post Graduate' },]


  console.log('academicDetailsPage',academicDetailsPage);
  return (
    <Grid container spacing={2}>
      {loading && <KenLoader />}
      {academicDetailsPage.map((academicData, index) => {
        return (
          <>
            <Grid item xs={12} sm={2}>
              {/* <KenInputField
                label="Qualification"
                name="Qualification"
                // value={'Qualification'}
                value={academicData?.Qualification}
                dropdownColor="#FFFFFF"
                onChange={e => {
                  handleChangeAcademic(e,index);
                }}
              /> */}
              <KenSelect
                label="Level"
                name="level"
                value={academicData?.level}
                onChange={e => {
                  handleChangeAcademic(e,index);
                }}
                options={levels}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
            <KenSelect
                label="Country"
                name="country"
                value={academicData?.country}
                onChange={e => {
                  handleChangeAcademic(e,index);
                }}
                options={countryDropdownOptions}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <KenInputField
                label="University"
                name="university"
                // value={'University'}
                value={academicData?.university}
                dropdownColor="#FFFFFF"
                onChange={e => {
                  handleChangeAcademic(e, index);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <KenInputField
                label="Year"
                name="year"
                // value={'Year'}
                value={academicData?.year}
                dropdownColor="#FFFFFF"
                onChange={e => {
                  handleChangeAcademic(e, index);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} style={{ marginTop: 23 }}>
              {
                <>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteForeverIcon />}
                    onClick={e =>
                      deleteAcademicDetails(academicData?.id)
                    }
                  >
                    {console.log('index1231', index)}
                    Delete
                  </Button>
                </>
              }
            </Grid>
          </>
        );
      })}
      <Grid item xs={12} sm={12}>
        <div style={{ display: 'flex', whiteSpace: 'pre', marginTop: '8px' }}>
          <div>
            <Button
              onClick={addAcademicRow}
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
                // onClick={() => handleFacaultyDetails()}
              >
                Cancel
              </Button>{' '}
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default FacultyAcademicDetails;
