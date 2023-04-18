import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  useTheme,
  Box,
  GridListTile,
  GridList,
  Button,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { getCourses, getStudentListDetails } from '../../utils/ApiService';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import KenSelect from '../../components/KenSelect';
import KenLoader from '../../components/KenLoader';
import KenButton from '../KenButton';
import { KEY_USER_TYPE } from '../../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.KenColors.kenWhite,
    borderRadius: 3,
  },
  sectionsContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.KenColors.kenWhite,
  },
  sectionWrap: {
    display: 'flex',
    marginTop: 8,
  },
  subName: {
    fontSize: 14,
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
  },
  classLabel: {
    minWidth: 70,
    padding: '20px',

    //styles from figma
    // fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    alignItems: 'center',
    color: theme.palette.KenColors.tertiaryGray50,
  },
  gradeLabel: {
    color: theme.palette.KenColors.neutral900,
    fontSize: 18,
    fontWeight: 600,
  },
  coursesWrap: {
    padding: '16px 32px',
  },
  dropdownWrap: {
    color: theme.palette.KenColors.neutral700,
    fontSize: 14,
  },
  dropdownWrapSelected: {
    fontSize: 14,
  },
  inputBaseClass: {
    fontSize: 14,
    background: theme.palette.KenColors.kenWhite,
  },
  //   sectionCircle: {
  //     minWidth: '44px',
  //     width: '44px',
  //     height: '44px',
  //     lineHeight: '500px',
  //     borderRadius: ' 50%',
  //     fontSize: '10px',
  //   },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'end',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    '&::-webkit-scrollbar': {
      height: '6px',
      cursor: 'pointer',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.KenColors.customizeScrollTrack,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.KenColors.neutral12,
    },
  },
  gridTile: {
    padding: '16px 32px',
    borderRight: `0.6px solid ${
      theme.palette.KenColors.classesListBorderColor
    }`,
    minWidth: 'fit-content',
    // height: 'auto !important',
  },
  listHeading: {
    minWidth: 'fit-content',
  },
}));

export default function ClassListTermWise(props) {
  const {
    setCourseOfferingId = () => {},
    getSelectedSection = () => {},
    onCardClick,
    onSectionClick,
    title,
    listTitle,
    listSubTitle,
    facultyContactID,
    hideCoursesDropdown = false,
    courseList = [], //equivalent to subjects
    isSectionActive = () => {},
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [currentAccountName, setCurrentAccountName] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [currentCourseItem, setCurrentCourseItem] = React.useState([]);
  const [accountArray, setAccountArray] = React.useState([]);
  const [subjects, setSubjects] = React.useState([...courseList]);
  const [students, setStudents] = React.useState([]);
  const [subjectOptions, setSubjectOptions] = React.useState([]);
  const [sectionOptions, setSectionOptions] = React.useState([]);
  const [termOptions, setTermOptions] = React.useState([]);
  const profile = getUserDetails();
  const [selectedSubject, setSelectedSubject] = React.useState();
  const [selectedSection, setSelectedSection] = React.useState();
  const [selectedTerm, setSelectedTerm] = React.useState();
  const [terms, setTerms] = useState([]);
  const [termValue, setTermValue] = useState(null);

  React.useEffect(() => {
    setLoading(true);
    const facultyID = facultyContactID || profile?.ContactId;

    getCourses(facultyID)
      .then(response => {
        setCourses(response);
        if (Array.isArray(response) && response.length > 0) {
          setCourseOfferingId(response[0].CourseOfferingID);
          getSelectedSection(response[0]);
          // setCourse(response[0].CourseOfferingID);
          getStudentListDetails(response[0].CourseOfferingID).then(resp => {
            setStudents(resp);
          });
        } else {
          setLoading(false);
        }

        const accountNameArray = [
          ...new Set(response?.map(item => item.accountname)),
        ];

        setAccountArray(accountNameArray);
        setLoading(false);
      })
      .catch(err => {
        // console.log(err, 'err');
        setLoading(false);
      });
  }, []);
  // handle course change method

  const handleCourseChange = value => {
    //   setSubject(value)
    const currentTermArray = [];
    courses?.map((data, i) => {
      if (data.accountname == value) {
        currentTermArray.push(data);
      }
    });
    setCurrentAccountName(value);
    setCurrentCourseItem(currentTermArray);
  };

  useEffect(() => {
    setCourseOfferingId(currentCourseItem[0]?.CourseOfferingID);

    //get same subjects along with sections
    const hedTerms = [...currentCourseItem];
    const hedResult = hedTerms.reduce(function(r, a) {
      r[a.hed__Term__c] = r[a.hed__Term__c] || [];
      r[a.hed__Term__c].push(a);
      return r;
    }, Object.create(null));

    //convert object into array with keys - term and subjects
    const termArray = [];
    for (const [key, value] of Object.entries(hedResult)) {
      let obj = {
        hed__Term__c: key,
        subject: value,
      };
      termArray.push(obj);
    }
    setTerms(termArray);
    //get same subjects along with sections
    const sections = [...currentCourseItem];
    const result = sections.reduce(function(r, a) {
      r[a.hed__Course__cName] = r[a.hed__Course__cName] || [];
      r[a.hed__Course__cName].push(a);
      return r;
    }, Object.create(null));

    //convert object into array with keys - subjects and sections
    const subjectArray = [];
    for (const [key, value] of Object.entries(result)) {
      let obj = {
        subject: key,
        sections: value,
      };
      subjectArray.push(obj);
    }
    setSubjects(subjectArray);
  }, [currentCourseItem]);
  //terms options
  useEffect(() => {
    let options = [];
    const hedTerms = terms?.map((hedterm, index) => {
      options.push({
        ...hedterm,
        value: hedterm.hed__Term__c,
        label: hedterm.hed__Term__c,
      });
    });
    setTermOptions(options);
    setSelectedTerm(options.length > 0 ? options[0].value : '');
    // setTermValue(options.length > 0 ? options[0].value : '');
  }, [terms]);

  useEffect(() => {
    const selectedHedTerm = terms?.find(
      term => term?.hed__Term__c === selectedTerm.value
    );
    if (selectedHedTerm) {
      let subOptions = [];
      selectedHedTerm?.subject?.map(item => {
        subOptions.push({
          ...item,
          value: item.hed__Course__cName,
          label: item.hed__Course__cName,
        });
      });
      setSubjectOptions(subOptions);
      setSelectedSubject(subOptions.length > 0 ? subOptions[0].value : '');
    }
  }, [selectedTerm]);

  useEffect(() => {
    const selectedSub = subjects?.find(sub => sub?.subject === selectedSubject);
    if (selectedSub) {
      let sectionOpts = [];
      selectedSub?.sections?.map(item => {
        sectionOpts.push({ ...item, value: item.Section, label: item.Section });
      });
      setSectionOptions(sectionOpts);
    }
  }, [selectedSubject]);

  const changeTerm = item => {
    setSelectedTerm(item);
    setTermValue(item.value);
  };

  const changeSubject = event => {
    setSelectedSubject(event.target.value);
  };
  useEffect(() => {
    if (sectionOptions?.length > 0) {
      handleSectionChange(sectionOptions[0].value);
    }
  }, [sectionOptions]);

  const handleSectionChange = sectionName => {
    const option = sectionOptions.find(sec => sec.value === sectionName);
    if (option) {
      setSelectedSection(option);
      // getSelectedSection(option);
      //   setCourseOfferingId(option.KenLoaderCourseOfferingID);
      getSelectedSection(option);
      //   setCourse(option.CourseOfferingID);
    }
  };

  return (
    <>
      {loading && (
        <div data-testid="loader">
          <KenLoader />
        </div>
      )}
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
          <Typography className={classes.gradeLabel}>{title}</Typography>
        </Grid>
        <Grid item md={3}>
          {!hideCoursesDropdown && accountArray.length > 0 && (
            <KenSelect
              menuItemSelectedClass={classes.dropdownWrapSelected}
              menuItemRootClass={classes.dropdownWrap}
              value={currentAccountName}
              options={accountArray}
              inputBaseRootClass={classes.inputBaseClass}
              onChange={e => {
                handleCourseChange(e.target.value);
              }}
              defaultValue={() => {
                handleCourseChange(accountArray[0]);
                return accountArray[0];
              }}
            />
          )}
        </Grid>
      </Grid>
      <Paper elevation={0}>
        <Box p={1} my={2}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              {termOptions.map(item => {
                return (
                  <Button
                    variant={
                      termValue && termValue === item.label
                        ? 'contained'
                        : 'outlined'
                    }
                    color={
                      termValue && termValue === item.label ? 'primary' : ''
                    }
                    size="small"
                    style={{ margin: '8px' }}
                    onClick={() => {
                      changeTerm(item);
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <div className={classes.sectionsContainer}>
        <div className={classes.listHeading}>
          {' '}
          <Box>
            <Typography className={classes.classLabel}>{listTitle}</Typography>
          </Box>
        </div>
        <Grid item md={5}>
          <KenSelect
            menuItemSelectedClass={classes.dropdownWrapSelected}
            menuItemRootClass={classes.dropdownWrap}
            options={subjectOptions}
            inputBaseRootClass={classes.inputBaseClass}
            value={
              selectedSubject
                ? selectedSubject
                : subjectOptions.length > 0
                ? subjectOptions[0].value
                : ''
            }
            onChange={changeSubject}
          />
        </Grid>
        <div className={classes.listHeading}>
          {' '}
          <Box>
            <Typography className={classes.classLabel}>
              {listSubTitle}
            </Typography>
          </Box>
        </div>
        <Grid item md={3}>
          <KenSelect
            menuItemSelectedClass={classes.dropdownWrapSelected}
            menuItemRootClass={classes.dropdownWrap}
            options={sectionOptions}
            value={
              selectedSection
                ? selectedSection.value
                : sectionOptions.length > 0
                ? sectionOptions[0].value
                : ''
            }
            onChange={e => {
              handleSectionChange(e.target.value);
            }}
            inputBaseRootClass={classes.inputBaseClass}
          />
        </Grid>
      </div>
    </>
  );
}
