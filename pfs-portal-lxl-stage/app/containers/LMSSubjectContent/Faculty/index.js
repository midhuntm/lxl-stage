import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Paper,
  Typography,
  InputBase,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import KenLoader from '../../../components/KenLoader';
import KenHeader from '../../../global_components/KenHeader';
import DataSection from '../components/dataSections';
// import SectionsAccordions from '../components/sectionsAccordion';
// import SectionsAccordionDetails from '../components/sectionAccordionDetails';
import FuzzySearch from 'fuzzy-search';
import SearchIcon from '@material-ui/icons/Search';
import SectionsList from '../components/sectionList';
import SectionsListItem from '../components/sectionList';
import {  getCourseContentFaculty, publishUnpublishLMSModule } from '../../../utils/ApiService';
import ActivityCard from '../components/activityCard';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Routes from '../../../utils/routes.json';
import KenButton from '../../../global_components/KenButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      //   backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: '16px 0px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    border: `1px solid #DFE1E6`,
    // margin: '16px'
  },
  searchIcon: {
    padding: '3px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    opacity: '0.54',
    zIndex: 100,
  },
  inputRoot: {
    color: 'inherit',
    backgroundColor: theme.palette.KenColors.neutral10,
    borderRadius: '3px',
    height: '38px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    // width: 'auto',
    height: '38px',
    [theme.breakpoints.up('sm')]: {
      // width: 'auto',
      '&:focus': {
        // width: 'auto',
      },
    },
  },
}));

export default function SubjectContentFaculty(props) {
  const [courseOfferingId, setCourseOfferingId] = useState(
    props?.history?.location?.state?.courseOfferingId
  );
  const [subjectName, setSubjectName] = useState(
    props?.history?.location?.state?.subject
  );
  const classes = useStyles();
  const colors = [
    { bgColor: '#E7F4FB', color: '#138CD1' },
    { bgColor: '#F7EAF1', color: '#965261' },
    { bgColor: '#FAF0FF', color: '#C06DE9' },
    { bgColor: '#DEEDF1', color: '#0A8D9E' },
    { bgColor: '#FEECEB', color: '#FF837C' },
    { bgColor: '#E3EDF9', color: '#1F7FE0' },
    { bgColor: '#FFFADE', color: '#BAA226' },
  ];
  const userDetails = getUserDetails();
  const [expanded, setExpanded] = React.useState(false);
  const [searchItem, setSearchItem] = React.useState('');
  const [searchedSections, setSearchedSections] = React.useState([]);
  const [selectedSection, setSelectedSection] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [updatedSelectedSection, setUpdatedSelectedSection] = React.useState(
    {}
  );
  const [sections, setSections] = React.useState([]);
  const [mainSection, setMainSection] = React.useState([]);
  const history = useHistory();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const searcher = new FuzzySearch(sections, ['name'], {
    caseSensitive: false,
  });

  const onSectionClick = item => {
    setSelectedSection(item);
  };

  const onSearchSections = event => {
    const result = searcher.search(event.target.value);
    setSearchItem(event.target.value);
    setSearchedSections(result);
  };

  useEffect(() => {
    setSearchedSections(sections);
  }, [sections]);

  useEffect(() => {
    setLoading(true);
    // getCourseContent('a0472000004C3CkAAK')
    //   .then(res => {
        getCourseContentFaculty(courseOfferingId, userDetails?.ContactId)
      .then(res => {
        const mainSection = res?.find(item => item?.sectiontype === 'main');
        let subSections = res?.filter(item => item?.sectiontype !== 'main');
        if (mainSection?.modules?.length > 0) {
          subSections = [
            { ...mainSection, name: 'General Course Content' },
            ...subSections,
          ];
        }
        setSections(subSections);
        setMainSection(mainSection);
        res && res.length > 0 && setSelectedSection(subSections[0]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [toggle]);

  function compare(a, b) {
    if (a.modname < b.modname) {
      return -1;
    }
    if (a.modname > b.modname) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    if (selectedSection) {
      const updatedModules = selectedSection?.modules?.filter(
        item =>
          item.modname === 'assign' ||
          item.modname === 'quiz' ||
          item?.modname === 'url' ||
          item?.modname === 'resource'
      );
      updatedModules?.sort(compare);
      const updatedObj = {
        ...selectedSection,
        modules: updatedModules,
      };
      setUpdatedSelectedSection(updatedObj);
    }
  }, [selectedSection]);

  const getActivityVariant = (modname, modplural, contents) => {
    let result = '';
    switch (modname) {
      case 'assign':
        result = 'assignment';
        break;

      case 'quiz':
        result = 'assessment';
        break;

      case 'resource':
        {
          if (modplural === 'Files') {
            let resourceType = '';
            const key = contents[0]['mimetype'];
            switch (key) {
              case 'application/pdf':
                resourceType = 'pdf';
                break;

              case 'application/vnd.ms-excel':
              case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                resourceType = 'excel';
                break;

              case 'video/mp4':
                resourceType = 'video';
                break;

              case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                resourceType = 'ppt';
                break;

              default:
                break;
            }
            result = resourceType;
          }
        }
        break;

      case 'url':
        result = 'url';
        break;

      default:
        break;
    }

    return result;
  };

  const getActivityAction = obj => {
    console.log('obj in getActivityAction', obj);
    let action = '';

    if (obj?.modname)
      if (obj?.modname === 'assign') {
        if (obj?.publish === 0) {
          action = 'Edit';
        } else {
          action = 'Review';
        }
      } else if (obj?.modname === 'quiz') {
        if (obj?.attempts > 0) {
          action = 'Review Quiz';
        } else {
          action = 'Preview';
        }
      }else{
        if (obj?.publish === 0) {
            action = 'Publish';
          } else {
            action = 'Unpublish';
          }
      }

    if (obj?.complitionstatus === 'Completed') {
      action = '';
    }
    return action;
  };

  const getActivityActionEvent = obj => {
    const action = getActivityAction(obj);
    console.log('action for obj', action);
    console.log('obj', obj);
    let event;
    switch (action) {
      case 'Review':
        event = item => {
          history.push({
            pathname: Routes?.assignmentReview,
            state: {
              quizId: item.id,
              submissionHeading: '',
            },
          });
        };
        break;

      case 'Review Quiz':
        event = item => {
          history.push({
            pathname: Routes?.reviewQuiz,
            state: {
              quizId: item?.id,
              quizInfo: {
                quiz: item?.name,
              },
            },
          });
        };
        break;

      case 'Edit':
        event = item => {
          history.push({
            pathname: `/assignment/${item?.id}`,
            state: {
              assignmentId: item?.id,
              assignmentName: item?.name,
              origin: 'subject-content',
              status:
                item?.status === 'Published' ? 'published' : 'unpublished',
              operation: 'update',
            },
          });
        };
        break;
      case 'Preview':
        event = item => {
          history.push({
            pathname: Routes?.assessmentPreview,
            state: {
              data: {
                cmid: item?.id,
                status: item?.status,
                date: '02-04-2021,10:30 AM',
                origin: 'subject-content',
              },
            },
          });
        };
        break;

      case 'Closed':
        event = item => {
          history.push({
            pathname: Routes?.assessmentPreview,
            state: {
              data: {
                cmid: item?.id,
                status: item?.status,
                date: '02-04-2021,10:30 AM',
                origin: 'subject-content',
              },
            },
          });
        };
        break;

      case 'Publish':
        event = item => {
            setLoading(true);
            const payload = {
              method: 'post',
              quizid: item?.id,
              publish: 1,
            };
            publishUnpublishLMSModule(payload)
              .then(res => {
                setLoading(false);
                setToggle(!toggle);
                console.log('res', res);
              })
              .catch(err => {
                setLoading(false);
                console.log('err', err);
              });
        };

        break;
      case 'Unpublish':
        event = item => {
            setLoading(true);
            const payload = {
              method: 'post',
              quizid: item?.id,
              publish: 0,
            };
            publishUnpublishLMSModule(payload)
              .then(res => {
                setLoading(false);
                setToggle(!toggle);
                console.log('res', res);
              })
              .catch(err => {
                setLoading(false);
                console.log('err', err);
              });
        };

        break;

      default:
        break;
    }
    return event;
  };
  return (
    <>
      {loading && <KenLoader />}
      <Box minHeight="100%">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <KenHeader title={subjectName}>
              <KenButton
                variant="primary"
                label="Back"
                onClick={() => history.goBack()}
              />
            </KenHeader>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DataSection title="Course Content">
              <div className={classes.search} style={{ width: 'auto' }}>
                <InputBase
                  value={searchItem}
                  onChange={onSearchSections}
                  // setSearchItem(e.target.value || undefined);
                  placeholder={`${searchedSections.length} topics...`}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon classes={{ root: classes.searchIcon }} />
                    </InputAdornment>
                  }
                />
              </div>
              {searchedSections.map((item, index) => {
                return (
                  <SectionsListItem
                    sectionColor={colors[index % colors.length]?.color}
                    sectionBackgroundColor={
                      colors[index % colors.length]?.bgColor
                    }
                    section={item}
                    onSectionClick={onSectionClick}
                  />
                );
              })}
            </DataSection>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <DataSection title={updatedSelectedSection?.name}>
              {updatedSelectedSection?.modules?.map(item => {
                return (
                  <Box mb={3}>
                    <ActivityCard
                      item={{
                        ...item,
                        type: getActivityVariant(
                          item?.modname,
                          item?.modplural,
                          item?.contents
                        ),
                      }}
                      variant={getActivityVariant(
                        item?.modname,
                        item?.modplural,
                        item?.contents
                      )}
                      primaryText={item?.name}
                      actionText={getActivityAction(item)}
                      handleAction={getActivityActionEvent(item)}
                      secondaryActionText={moment
                        .unix(item?.timeclose || item?.duedate)
                        .format('D MMM')}
                      subjectName={item?.connectionData?.fullname}
                      userType={'Student'}
                    //   time={'13 mins'}
                    //   marks={'50 Marks'}
                      subject={subjectName}
                      section={mainSection?.name}
                    />
                  </Box>
                );
              })}
            </DataSection>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
