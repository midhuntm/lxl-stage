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
import './Faculty.css';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const FacultyExperience = ({
  teachingDetails,
  industryDetails,
}) => {
  const [teachingDetailsPage, setTeachingDetailsPage] = useState(
    teachingDetails
  );

  const [industryDetailsPage, setIndustryDetailsPage] = useState(
    industryDetails
  );

  const idGenerater = () => {
    let id = Math.random()
      .toString(36)
      .substr(2, 9);
    return id;
  };
  const classes = useStyles();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleChangeTeaching = (evt, i) => {
    console.log('evt.name', evt);
    setTeachingDetailsPage(
      teachingDetailsPage.map((e, index) => {
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

  const handleChangeIndustry = (evt, i) => {
    console.log('evt.name', evt);
    setIndustryDetailsPage(
      industryDetailsPage.map((e, index) => {
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

  const addTeachingRow = () => {
    console.log('teachingDetailsPage', teachingDetailsPage);
    setTeachingDetailsPage(prevState => {
      return [
        ...prevState,
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
      ];
    });
  };

  const addIndustryRow = () => {
    setIndustryDetailsPage(prevState => {
      return [
        ...prevState,
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
      ];
    });
  };

  const deleteTeachingRow = i => {
    setTeachingDetailsPage(prev => {
      return prev.filter(ab => {
        return ab.res.Id !== i;
      });
    });
  };

  const deleteIndustryRow = i => {
    setIndustryDetailsPage(prev => {
      return prev.filter(ab => {
        return ab.res.Id !== i;
      });
    });
  };

  useEffect(() => {
    setTeachingDetailsPage(teachingDetails);
    setIndustryDetailsPage(industryDetails);
  }, [teachingDetails, industryDetails]);
  return (
    <div>
      <Typography variant="h6" className={classes.innerTitle}>
        Teaching:{' '}
      </Typography>{' '}
      <Grid container spacing={2}>
        {teachingDetailsPage.map((academicData, index) => {
          return (
            <>
              <Grid item xs={12} sm={2}>
                <KenInputField
                  label="Institute/School/College"
                  name="Institute"
                  // value={'Qualification'}
                  value={academicData.res.Institute}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <KenInputField
                  label="Position/ Designation"
                  name="Position"
                  // value={'Position /Minor'}
                  value={academicData.res.Position}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <KenInputField
                  label="Role/Responsibilities"
                  name="Role"
                  // value={'Role'}
                  value={academicData.res.Role}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <KenInputField
                  label="Duration"
                  name="Duration"
                  // value={'Duration'}
                  value={academicData.res.Duration}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3} style={{ marginTop: 23 }}>
                {
                  <Button
                    onClick={() => deleteTeachingRow(academicData.res.Id)}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteForeverIcon />}
                  >
                    {' '}
                    {console.log('index', index)}
                    Delete
                  </Button>
                }
              </Grid>
            </>
          );
        })}
      </Grid>
      <Grid item xs={12} sm={12}>
        <div style={{ display: 'flex', whiteSpace: 'pre', marginTop: '8px' }}>
          <div>
            <Button
              onClick={addTeachingRow}
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
                // onClick={() => handleFacaultyDetails()}
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
      <Typography variant="h6" className={classes.innerTitle}>
        Industry:{' '}
      </Typography>{' '}
      <Grid container spacing={2}>
        {industryDetailsPage.map((academicData, index) => {
          return (
            <>
              <Grid item xs={12} sm={2}>
                <KenInputField
                  label="Institute/School/College"
                  name="Institute"
                  // value={'Qualification'}
                  value={academicData.res.Institute}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <KenInputField
                  label="Position/ Designation"
                  name="Position"
                  // value={'Position /Minor'}
                  value={academicData.res.Position}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <KenInputField
                  label="Role/Responsibilities"
                  name="Role"
                  // value={'Role'}
                  value={academicData.res.Role}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <KenInputField
                  label="Duration"
                  name="Duration"
                  // value={'Duration'}
                  value={academicData.res.Duration}
                  dropdownColor="#FFFFFF"
                  onChange={e => {
                    handleChangeInput(e);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3} style={{ marginTop: 23 }}>
                {
                  <Button
                    onClick={() => deleteIndustryRow(academicData.res.Id)}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteForeverIcon />}
                  >
                    {' '}
                    {console.log('index', index)}
                    Delete
                  </Button>
                }
              </Grid>
            </>
          );
        })}
      </Grid>
      <Grid item xs={12} sm={12}>
        <div style={{ display: 'flex', whiteSpace: 'pre', marginTop: '8px' }}>
          <div>
            <Button
              onClick={addIndustryRow}
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
                // onClick={() => handleFacaultyDetails()}
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
    </div>
  );
};

export default FacultyExperience;
