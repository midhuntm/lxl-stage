import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  useTheme,
} from '@material-ui/core';
import SubjectJson from '../ContentSubject/YourSubject.json';
import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KenSelect from '../../../../components/KenSelect';
import { getCourses } from '../../../../utils/ApiService';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  buttonSpace: {
    spacing: 5,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '100%',
    color: '#092682',
  },
  pos: {
    marginBottom: 12,
  },
  shape: {
    // borderRadius: '50%',
    // height: '10px',
    // width: '10px',

    borderRadius: '50%',
    height: '50px',
    width: '44px',
  },

  YourSubfont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '150%',
    display: 'flex',
    color: '#061938',
  },
  ContentFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '120%',
    color: '#061938',
  },
  Roundshape: {
    width: '42px !important',
    height: '38px!important',
    backgroundColor: '#F8F9FB',
    margin: '8px',
  },
}));

export default function Contentsubject(props) {
  const classes = useStyles();
  // const facultyContactID = props;
  const { setSectionDataSend, handleSnackbarOpen } = props;
  const [courses, setCourses] = useState([]);
  const [classOption, setClassOption] = useState([]);
  const [terms, setTerms] = useState([]);
  const profile = getUserDetails();
  const [loading, setLoading] = React.useState(false);

  //
  //const classes = useStyles();
  // const theme = useTheme();
  const { t } = useTranslation();
  const [selectedClassName, setSelectedClassName] = React.useState();
  const [selectedTerms, setSelectedTerms] = React.useState([]);
  // const [classArray, setClassArray] = useState([]);
  //const profile = getUserDetails();
  // const [selectedTerm, setSelectedTerm] = React.useState();
  const [responseData, setResponseData] = useState([]);
  const [termValue, setTermValue] = useState(null);
  const [sectionButtonData, setSectionButtonData] = useState([]);
  // const [subSectData, setSubSectData] = useState([]);
  //

  //Api Integration
  const facultyID = profile?.ContactId;
  React.useEffect(() => {
    setLoading(true);
    getCourses(facultyID)
      .then(response => {
        setResponseData(response);
        // let subOptions2 = [];
        // response?.map(item => {
        //   subOptions2.push({
        //     ...item,
        //     value: item.hed__Term__c,
        //     label: item.hed__Term__c,
        //   });
        // });
        // const termArray = [
        //   ...new Set(subOptions2?.map(item => item.hed__Term__c)),
        // ];
        // setTerms(termArray);
      })
      .catch(err => {
        console.log(err, 'err');
        handleSnackbarOpen('error', t('translations:Something_Wrong'));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCourses(responseData);
  }, [responseData]);

  useEffect(() => {
    if (responseData?.length > 0) {
      let subOptions = [];
      const classNameArray = [
        ...new Set(responseData?.map(item => item.accountname)),
      ];
      classNameArray?.map(item => {
        subOptions.push({
          value: item,
          label: item,
        });
      });

      setClassOption(subOptions);
      setSelectedClassName(subOptions[0].value);
    }
  }, [responseData]);

  useEffect(() => {
    if (selectedClassName) {
      let subOptions2 = [];
      const termArray = [
        ...new Set(
          responseData?.map(item => {
            if (item?.accountname === selectedClassName) {
              return item?.hed__Term__c;
            }
          })
        ),
      ];
      termArray?.map(item => {
        if (item) {
          subOptions2.push({
            value: item,
            label: item,
          });
        }
      });
      setTerms(subOptions2);
      setTermValue(subOptions2[0].value);
    }
  }, [selectedClassName]);

  // useEffect(() => {
  //   if (responseData?.length > 0) {
  //
  //     // setCourses(responseData); //round button display
  //     // setSubSectData(responseData);
  //   }
  // }, [responseData]);
  //;

  const handleClassChange = value => {
    //   setSubject(value)
    const currentClassArray = [];
    courses?.map((data, i) => {
      if (data?.accountname == value) {
        currentClassArray?.push(data);
      }
    });
    setSelectedClassName(value);
    setSelectedTerms(currentClassArray);
  };

  //scrollable tab for subject
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //

  //for selcting subject buttons
  const [section, setSection] = React.useState();
  const HandleClickSection = value => {
    if (value) {
      setSection(value?.CourseOfferingID);
      setSectionDataSend({
        CourseOfferingID: value?.CourseOfferingID,
        hed__Course__cId: value?.hed__Course__cId,
        accountname: value?.accountname,
        section: value?.Section,
        hed__Course__cName: value?.hed__Course__cName,
        Id: value?.Id,
      });
    }
  };
  const handleChangeTerm = item => {
    setSelectedTerms(item);
    setCourses(responseData);
  };
  const getFilterDataByClass = () => {
    const newData = [];

    courses.map(item => {
      //calssname
      if (item.accountname === selectedClassName) {
        newData.push(item);
      }
    });

    courses.map(item => {
      if (item.terms === selectedTerms) {
        newData.push(item);
      }
    });
    setCourses(newData);
  };

  useEffect(() => {
    if (selectedTerms || selectedClassName) {
      getFilterDataByClass();
    }
  }, [selectedTerms, selectedClassName]); //selected classNAme chamge to selectedTerms

  //for duplicate data
  useEffect(() => {
    const newDataForSection = [
      ...new Set(courses.map(d => d.hed__Course__cName)),
    ].map(hed__Course__cName => {
      return {
        hed__Course__cName,
        Section: courses
          .filter(d => d.hed__Course__cName === hed__Course__cName)
          .map(d => d), //section,connectionid,courseid
      };
    });
    setSectionButtonData(newDataForSection);
    setSection(newDataForSection[0]?.Section[0]?.CourseOfferingID);
    setSectionDataSend({
      CourseOfferingID: newDataForSection[0]?.Section[0]?.CourseOfferingID,
      accountname: newDataForSection[0]?.Section[0]?.accountname,
      section: newDataForSection[0]?.Section[0]?.Section,
      hed__Course__cId: newDataForSection[0]?.Section[0]?.hed__Course__cId,
      hed__Course__cName: newDataForSection[0]?.Section[0]?.hed__Course__cName,
      Id: newDataForSection[0]?.Section[0]?.Id,
    });
  }, [courses, selectedTerms]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xs={6}>
          {/* <Box>
            <Typography className={classes.ContentFont}>Content</Typography>
          </Box> */}
          {/* <Box mt={2}>
          <Avatar className={classes.Roundshape}>N</Avatar>
          </Box> */}
        </Grid>

        <Grid item md={3} sm={3} xs={6}>
          {classOption.length > 0 && (
            <KenSelect
              options={classOption}
              value={selectedClassName}
              onChange={e => {
                handleClassChange(e.target.value);
              }}
              defaultValue={e => {
                handleClassChange(classOption[0]?.value);

                return classOption[0]?.value;
              }}
            />
          )}
        </Grid>
        <Grid item md={3} sm={3} xs={6}>
          {terms.length > 0 && (
            <KenSelect
              options={terms}
              value={selectedTerms} //chamge termvalue to selectedTerms
              onChange={e => {
                handleChangeTerm(e.target.value);
              }}
              defaultValue={() => {
                handleChangeTerm(terms[0]?.value);
                return terms[0]?.value;
              }}
            />
          )}
        </Grid>
      </Grid>

      <Paper elevation={0} className={classes.root}>
        <Grid
          item
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={1} sm={12} xs={12}>
            <Typography className={classes.YourSubfont} align="right">
              Subjects
            </Typography>
          </Grid>

          <Grid item md={11} sm={12} xs={12} spacing={2}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="transperent"
              textColor="primary"
              variant="scrollable"
              scrollButtons="desktop"
              aria-label="scrollable auto tabs example"
            >
              {/* //courses or sectionButtonData */}
              {sectionButtonData?.length > 0 &&
                sectionButtonData?.map(e => {
                  return (
                    <Tab
                      style={{ borderRight: 'solid 1px #ccc' }}
                      label={
                        <Box>
                          <Typography
                            className={classes.title}
                            color="secondary"
                            gutterBottom
                          >
                            {e?.hed__Course__cName}
                          </Typography>
                          <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            container
                            style={{ padding: '8px' }}
                          >
                            {e?.Section?.map(e => {
                              return (
                                <Grid>
                                  <Avatar className={[classes.Roundshape]}>
                                    <Button
                                      variant={
                                        section &&
                                        e?.CourseOfferingID === section
                                          ? 'contained'
                                          : 'outlined'
                                      }
                                      onClick={event => {
                                        HandleClickSection(e);
                                      }}
                                      color="primary"
                                      className={classes.shape}
                                    >
                                      {e?.Section}
                                    </Button>
                                  </Avatar>
                                </Grid>
                              );
                            })}
                            {/* <Box>
                            <Avatar className={[classes.Roundshape]}>
                              <Button
                                variant={
                                  section && e?.CourseOfferingID === section
                                    ? 'contained'
                                    : 'outlined'
                                }
                                onClick={event => {
                                  HandleClickSection(e);
                                }}
                                color="primary"
                                className={classes.shape}
                              >
                                {e.Section}
                              </Button>
                            </Avatar>
                          </Box> */}
                          </Grid>
                        </Box>
                      }
                    />
                  );
                })}
            </Tabs>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
