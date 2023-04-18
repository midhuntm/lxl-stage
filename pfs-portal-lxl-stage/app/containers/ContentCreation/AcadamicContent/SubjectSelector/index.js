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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KenSelect from '../../../../components/KenSelect';
import {
  getCompletedEnrollment,
  getCourses,
} from '../../../../utils/ApiService';
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
  gradeLabel: {
    color: theme.palette.KenColors.neutral900,
    fontSize: 18,
    fontWeight: 600,
  },
}));

export default function SubjectSelector(props) {
  const classes = useStyles();
  // const facultyContactID = props;
  const { setSectionDataSend, handleSnackbarOpen, getSelectedCourse } = props;
  const [courses, setCourses] = useState([]);
  const [classOption, setClassOption] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedTermName, setSelectedTermName] = useState('');
  const profile = getUserDetails();
  const [loading, setLoading] = React.useState(false);

  // const theme = useTheme();
  const { t } = useTranslation();
  const [selectedClassName, setSelectedClassName] = React.useState();
  const [selectedTerms, setSelectedTerms] = React.useState([]);
  const [responseData, setResponseData] = useState([]);
  const [termValue, setTermValue] = useState(null);
  const [sectionButtonData, setSectionButtonData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState({});
  // const [subSectData, setSubSectData] = useState([]);

  //Api Integration
  const facultyID = profile?.ContactId;
  useEffect(() => {
    setLoading(true);
    getCourses(facultyID)
      .then(res => {
        setResponseData(res);
        setLoading(false);
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

  const compare = (a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  useEffect(() => {
    if (responseData?.length > 0) {
      let subOptions = [];
      const termsArray = [...new Set(responseData?.map(item => item.TermName))];
      termsArray?.map(item => {
        subOptions.push({
          value: item,
          label: item,
        });
      });

      subOptions = subOptions.sort(compare);
      setTerms(subOptions);
      setSelectedTermName(subOptions[0].value);
    }
  }, [responseData]);

  useEffect(() => {
    if (selectedTermName) {
      let subOptions2 = [];
      const termArray = [
        ...new Set(
          responseData?.map(item => {
            if (item?.TermName === selectedTermName) {
              return item;
            }
          })
        ),
      ];
      termArray?.map(item => {
        if (item) {
          subOptions2.push({
            ...item,
            value: item.CourseOfferingID,
            label: item?.CourseName + ' - ' + item?.Section,
          });
        }
      });
      subOptions2 = subOptions2.sort(compare);
      setSubjects(subOptions2);
      let currentCourse = subOptions2.find(
        subItem => subItem?.CourseOfferingID == subOptions2[0].value
      );
      setSelectedCourse(currentCourse);

      setSubjectName(subOptions2[0].value);
    }
  }, [selectedTermName]);

  useEffect(() => {
    if (selectedCourse) {
      getSelectedCourse(selectedCourse);
      //   setSectionDataSend(selectedCourse);
    }
  }, [selectedCourse]);

  const handleCourseChange = value => {
    if (value) {
      let currentCourse = subjects.find(
        subItem => subItem?.CourseOfferingID == value
      );
      setSelectedCourse(currentCourse);
      setSubjectName(currentCourse?.value);
    }
  };
  const handleChangeTerm = item => {
    setSelectedTermName(item);
  };

  return (
    <>
      <Grid
        container
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
        data-testid="classList-page"
      >
        <Grid item md={3}>
          <Typography className={classes.gradeLabel}>Course Content</Typography>
        </Grid>
        <Grid item md={6} container spacing={2}>
          <Grid item md={6}>
            {terms.length > 0 && (
              <KenSelect
                options={terms}
                label={'Term'}
                value={selectedTermName} //change term value to selectedTerms
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
          <Grid item md={6}>
            {subjects.length > 0 && (
              <KenSelect
                label={'Course'}
                value={subjectName}
                options={subjects}
                onChange={e => {
                  handleCourseChange(e.target.value);
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}