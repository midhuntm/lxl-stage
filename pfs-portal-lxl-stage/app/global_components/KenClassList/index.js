import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  useTheme,
  Box,
  GridListTile,
  GridList,
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

export default function ClassListCard(props) {
  const {
    setCourseOfferingId = () => {},
    getSelectedSection = () => {},
    onCardClick,
    onSectionClick,
    title,
    listTitle,
    facultyContactID,
    hideCoursesDropdown = false,
    courseList = [], //equivalent to subjects
    isSectionActive = () => {},
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState();
  const [currentAccountName, setCurrentAccountName] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [currentCourseItem, setCurrentCourseItem] = React.useState([]);
  const [accountArray, setAccountArray] = React.useState([]);
  const [subjects, setSubjects] = React.useState([...courseList]);
  const [students, setStudents] = React.useState([]);

  const profile = getUserDetails();

  // useEffect(() => {
  //   setSubjects(courseList);
  // }, [courseList]);

  React.useEffect(() => {
    setLoading(true);
    const facultyID = facultyContactID || profile?.ContactId;
    getCourses(facultyID)
      .then(response => {
        setCourses(response);
        if (Array.isArray(response) && response.length > 0) {
          setCourseOfferingId(response[0].CourseOfferingID);
          getSelectedSection(response[0]);
          setCourse(response[0].CourseOfferingID);
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
        console.log(err, 'err');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCourseOfferingId(currentCourseItem[0]?.CourseOfferingID);
    getSelectedSection(currentCourseItem[0]);

    setCourse(currentCourseItem[0]?.CourseOfferingID);

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

    //set subjects
    if (courseList.length > 0) {
      setSubjects(courseList);
    } else {
      setSubjects(subjectArray);
    }
  }, [currentCourseItem]);

  // handle course change method

  const handleCourseChange = value => {
    const currentSectionArray = [];
    courses?.map((data, i) => {
      if (data.accountname == value) {
        if (i === 0) {
          setCourseOfferingId(data.CourseOfferingID);
          getSelectedSection(data);
        }
        currentSectionArray.push(data);
      } else {
        return null;
      }
    });
    setCurrentAccountName(value);
    setCurrentCourseItem(currentSectionArray);
  };

  const handleSectionChange = (CourseOfferingID, section) => {
    setCourseOfferingId(CourseOfferingID);
    getSelectedSection(section);
    setCourse(CourseOfferingID);
  };

  const getButtonVariant = section => {
    if (section.CourseOfferingID) {
      return section.CourseOfferingID === course ? 'primary' : 'secondary';
    } else {
      if (isSectionActive(section)) {
        return 'primary';
      } else return 'secondary';
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
      <div className={classes.sectionsContainer}>
        <div className={classes.listHeading}>
          {' '}
          <Box>
            <Typography className={classes.classLabel}>{listTitle}</Typography>
          </Box>
        </div>
        <div className={classes.gridRoot}>
          <GridList className={classes.gridList} cols={6} cellHeight="auto">
            {subjects?.map((sub, index) => (
              <GridListTile key={sub.subject} className={classes.gridTile}>
                <Box className={classes.coursesWrap}>
                  <Typography key={index} className={classes.subName}>
                    {profile?.Type?.toLowerCase() ===
                    KEY_USER_TYPE.faculty?.toLocaleLowerCase()
                      ? sub.subject
                      : ''}
                  </Typography>

                  <Grid
                    container
                    spacing={1}
                    item
                    className={classes.sectionWrap}
                  >
                    {sub?.sections?.map(section => {
                      return (
                        <Grid
                          key={index}
                          item
                          onClick={() => {
                            handleSectionChange(
                              section.CourseOfferingID,
                              section
                            );
                            onSectionClick(section);
                          }}
                        >
                          <KenButton
                            className={classes.section}
                            variant={getButtonVariant(section)}
                            label={
                              profile?.Type?.toLowerCase() ===
                              KEY_USER_TYPE.student?.toLocaleLowerCase()
                                ? sub.subject
                                : section?.Section?.toLowerCase()
                                    ?.replace('section', '')
                                    ?.toUpperCase()
                            }
                            // label={section?.Section?.toLowerCase()
                            //   ?.replace('section', '')
                            //   ?.toUpperCase()}
                            onClick={() => {
                              setCourseOfferingId(section.CourseOfferingID);
                              onSectionClick(section);
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    </>
  );
}
