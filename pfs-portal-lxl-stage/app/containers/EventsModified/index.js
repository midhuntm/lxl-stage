import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Box,
  Toolbar,
  Switch,
  AppBar,
  IconButton,
  Divider,
  Button,
} from '@material-ui/core';
import SearchBox from '../../global_components/SearchBox';
import kenColors from '../../utils/themes/KenColors';
import { useTranslation } from 'react-i18next';
import Routes from '../../utils/routes.json';
import { createMuiTheme } from '@material-ui/core';
import KenCard from '../../global_components/KenCard';
import KenSelect from '../../components/KenSelect/index';
import KenInputField from '../../components/KenInputField';
import { getEventsData, getEventsFiltersData } from '../../utils/ApiService';
import KenLoader from '../../components/KenLoader';
import moment from 'moment';
import { debounce } from 'lodash';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Event from '../../assets/Event.png';
import KenButton from '../../global_components/KenButton';
import KenHeader from '../../global_components/KenHeader';

import './index.css';

const useStyles = makeStyles(theme => ({
  appBar: {
    background: '#E8ECFF',
    marginBottom: 10,
    borderRadius: 12,
    // width:30%,
  },
  toolBar: {
    justifyContent: 'space-between',
    padding: '0px',
  },
  toolBarContent: {
    display: 'flex',
    // flexDirectio: 'column',
    justifyContent: 'space-between',
    width: ' 100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  root: {
    flexGrow: 1,
  },
  paddingLeft: {
    paddingLeft: '5px',
  },

  topContainer: {
    display: 'inline-flex',
    width: '100%',
    [theme.breakpoints.between(280, 770)]: {
      position: 'relative',
    },
  },
  eventListContainer: {
    // maxHeight: '410px',
    // overflow: 'auto'
  },
  registeredEvent: {
    width: '100%',
    paddingBottom: '10px',
    textAlign: 'left',
    margin: '20px 0px',
    borderBottom: '1px solid #' + kenColors.lightGray,
    color: kenColors.tertiaryRed500,
  },
  eventList: {
    width: '100%',
    paddingBottom: '10px',
    textAlign: 'left',
    margin: '20px 0px',
    borderBottom: '1px solid #' + kenColors.lightGray,
  },
  items: {
    margin: '10px 0px',
  },
  date: {
    margin: '5px 0px',
    color: 'green',
  },
  title: {
    margin: '5px 0px',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.KenColors.primary,
  },
  description: {
    margin: '5px 0px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.KenColors.neutral400,
  },
  SearchBoxContainer: {
    background: '#fff',
    marginBottom: 15,
    position: 'relative',
    top: '23px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  switch: {
    display: 'flex',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '50px',
    },
    [theme.breakpoints.between(280, 770)]: {
      position: 'absolute',
      right: 0,
    },
  },
  eventHeading: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: 15,
    fontWeight: 600,
    lineHeight: '20px',
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  topView: { position: 'relative' },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  typo: {
    fontSize: '12px',
    color: theme.palette.KenColors.primary,
    cursor: 'pointer',
    textAlign: 'center',
  },
  eventDate: {
    fontSize: 22,
    display: 'flex',
    alignItems: 'baseline',
    cursor: 'pointer',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  topView: {
    position: 'relative',
    height: '100vh',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  typo: {
    fontSize: '12px',
    color: theme.palette.KenColors.primary,
    cursor: 'pointer',
    textAlign: 'center',
  },
  searchText: {
    fontSize: '12px',
    color: '#505F79',
    lineHeight: '16px',
    marginBottom: '4px',
    marginLeft: '8px',
  },
  searchBar: {
    marginLeft: 0,
    backgroundColor: '#FAFBFC',
    padding: '10px 26px 10px 12px',
    border: '1px solid #DFE1E6 !important',
  },
  eventDate: {
    fontSize: 22,
    display: 'flex',
    alignItems: 'baseline',
    cursor: 'pointer',
  },
  cardTextContent: {
    height: '110px',
    display: 'flex',
    // 'flex-wrap': 'wrap',
    fontSize: 12,
  },
  eventText: {
    fontWeight: 600,
    fontSize: 14,
  },
  eventTextSecond: {
    fontSize: 12,
    paddingTop: 10,
  },
  cardWrapper: {
    borderRadius: 15,
  },
  cardImage: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: '150px',
    width: '100%',
    objectFit: 'cover',
  },
  cardWrapContent: {
    cursor: 'pointer',
  },
  dateWrap: {
    fontWeight: 700,
    fontSize: 12,
    textAlign: 'center',
    color: ' #3D37F1',
  },
  dateContent: {
    fontWeight: 700,
    fontSize: 24,
    textAlign: 'center',
    color: ' #000',
  },
  eventhandlerContent: {
    width: 150,
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  eventhandlerContent1: {
    width: 150,
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'none',
    },
  },
  annoucementTable: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  noRecord: {
    fontSize: 20,
    fontWeight: 600,
  },
  // cardWrap:{
  //   minHeight:300
  // }
}));

const monthColors = {
  Jan: kenColors.tertiaryGreen300,
  Feb: kenColors.tertiaryBlue300,
  Mar: kenColors.tertiaryTeal300,
  Apr: kenColors.tertiaryPurple300,
  May: kenColors.tertiaryBlue500,
  Jun: kenColors.tertiaryPurple500,
  Jul: kenColors.tertiaryRed500,
  Aug: kenColors.tertiaryTeal500,
  Sep: kenColors.tertiaryYellow500,
  Oct: kenColors.tertiaryGreen500,
  Nov: kenColors.neutral400,
  Dec: kenColors.neutral900,
};

const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      root: {
        bottom: '12px',
        width: '50px',
        padding: '12px 5px',
      },
      track: {
        width: '50px',
        height: '20px',
        borderRadius: '14px',
        backgroundColor: 'white',
        border: '1px solid darkblue',
      },
      switchBase: {
        top: '6px',
        left: '0px',
        color: '#EAF6FF',
      },
      thumb: {
        border: '2px solid darkblue',
        height: 14,
        width: 13,
      },
    },
  },
});

const handleExpandClick = () => {
  setExpanded(!expanded);
};

export default function EventsModified(props) {
  const { history } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const [registeredEvents, setRegisteredEvents] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [searchString, setSearchString] = useState('');

  const [eventsList, setEventsList] = useState();
  const [initialEventsList, setInitialEventsList] = useState(null);

  const delaySearch = useCallback(
    debounce(val => {
      setSearchString(val);
    }, 1000),
    []
  );

  const searchEventsHandler = event => {
    let searchString = event.target.value;
    delaySearch(searchString);
  };

  useEffect(() => {
    setEventsList(props.eventsList);
    setInitialEventsList(props.eventsList);
  }, [props.eventsList]);

  const [locationArray, setLocationArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [typeArray, setTypeArray] = useState([]);
  const [state, setState] = useState({
    location: '',
    category: '',
    type: '',
  });
  const [date, setDate] = useState('');
  const [evntsCardDetails, setEvntsCardDetails] = React.useState(true);
  const [eventId, setEventId] = useState('');
  const [loading, setLoading] = React.useState(false);
  const { location, category, type } = state;
  const [noEvents, setNoEvents] = useState('Fetching Events..');
  const ContactId = JSON.parse(localStorage.getItem('userDetails'))
    ?.ContactId;

  const onCardClick = eventId => {
    setEventId(eventId);
    history.push(`/${Routes.eventDetails}/` + eventId);
  };
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const handleClose = () => {
    setEvntsCardDetails(true);
  };

  useEffect(() => {
    getEventsFiltersData()
      .then(res => {
        console.log(res);
        let data = res?.data;
        const locations = [{ label: 'All', value: 'All' }];
        const category = [{ label: 'All', value: 'All' }];
        const type = [{ label: 'All', value: 'All' }];
        data?.locations.map(item => {
          if (item) {
            locations.push({
              label: item,
              value: item,
            });
          }
        });
        data?.categories.map(item => {
          if (item) {
            category.push({
              label: item,
              value: item,
            });
          }
        });
        data?.types.map(item => {
          if (item) {
            type.push({
              label: item,
              value: item,
            });
          }
        });
        console.log(locations);
        setLocationArray(locations);
        setCategoryArray(category);
        setTypeArray(type);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const handleChangedDate = e => {
    setDate(e.target.value);
  };
  const handleChange = event => {
    const { name, value } = event.target;
    console.log('check value', value);
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    const { location, category, type } = state;
    let formattedDate = date ? moment(date).format('YYYY-MM-DD') : '';
    setLoading(true);
    setNoEvents('Fetching Events..');
    let event = `?contactId=${ContactId}&location=${location == 'All' ? '' : location}&category=${category == 'All' ? '' : category
      }&type=${type == 'All' ? '' : type
      }&date=${formattedDate}&search=${searchString}`;
    getEventsData(event)
      .then(res => {
        setLoading(false);
        let resp = res.data;
        setEventsData(resp)
        setNoEvents('No Events Found');
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        setNoEvents('No Events Found');
      });
  }, [searchString, state, date]);

  return (
    <>
      {loading && <KenLoader />}
      <div>
      <Grid item xs={12} sm={12} md={12}>
          <KenHeader title="Events">
            <KenButton
              variant="primary"
              label="Back"
              onClick={() => history.goBack()}
            />
          </KenHeader>
        </Grid>
        <br/>
      <br/>
      </div>
     
      {/* {evntsCardDetails ? <> */}
      <div className={classes.topView}>
        <Grid item xs={12} sm={12} md={12} style={{ marginTop: 4 }}>
          {/* <Typography>{eventsData[0]?.whatYouGet}</Typography> */}

        </Grid>
        <div
          className={classes.appBar}
          style={{ background: '#fff', padding: 10 }}
        >
          <Toolbar className={classes.toolBar}>
            <Box className={classes.toolBarContent}>
              <Grid item xs={12} className={classes.eventhandlerContent1}>
                <div className={classes.SearchBoxContainer}>
                  {/* <Typography className={classes.searchText}>Search</Typography> */}
                  <SearchBox
                    className={classes.searchBar}
                    searchHandler={searchEventsHandler}
                  />
                </div>
              </Grid>
              <Grid item xs={12} className={classes.eventhandlerContent}>
                <KenSelect
                  label="Location"
                  name="location"
                  placeholder="Location"
                  id="Location"
                  value={location}
                  onChange={handleChange}
                  options={locationArray}
                // className={formErrors.Location && "input-error"}
                />
              </Grid>
              <Grid item xs={12} className={classes.eventhandlerContent}>
                <KenInputField
                  name={'date'}
                  label="Date"
                  type="date"
                  // disabled={readOnly}
                  value={date}
                  // type="datetime-local"
                  required={true}
                  onChange={e => handleChangedDate(e)}
                />
              </Grid>
              <Grid item xs={12} className={classes.eventhandlerContent}>
                <KenSelect
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  options={categoryArray}
                  value={category}
                // className={formErrors.category && "input-error"}
                />
              </Grid>
              <Grid item xs={12} className={classes.eventhandlerContent}>
                <KenSelect
                  label="Type"
                  name="type"
                  onChange={handleChange}
                  options={typeArray}
                  value={type}
                // className={formErrors.type && "input-error"}
                />
              </Grid>
              <Grid item />
            </Box>
            <Box />
          </Toolbar>
        </div>
        <div className={classes.topContainer}>
          <Typography
            className={classes.eventHeading}
            style={{ paddingTop: 20, paddingLeft: '12px' }}
          >
            {t('headings:Upcoming_Events')}
          </Typography>
        </div>
        <div className={classes.cardWrap}>
          {eventsData.length > 0 ? (
            <>
              <Grid
                container
                xs={12}
                sm={12}
                md={12}
                lg={12}
                role="alert"
                // spacing={4}
                alignItems="center"
                style={{ display: 'flex', gridGap: 15 }}
                className={classes.annoucementTable}
              >
                {eventsData.length > 0 && eventsData.map(event => {
                  return (
                    <>
                      <div
                        onClick={e => onCardClick(event.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="event-main-grid">
                          <img
                            src={`data:image/png;base64,${event?.attachment[0]?.attachmentBody
                              }`}
                            alt=""
                            style={{
                              width: '100%',
                              borderRadius: '12px 12px 0px 0px',
                              height: '150px',
                            }}
                          />{' '}
                          &nbsp;
                          <div
                            className="map1"
                            style={{ padding: '0px 0px 10px 0px ' }}
                          >
                            <Typography className="typo-annual">
                              {event.name}
                            </Typography>
                            <div className="d2" style={{ position: 'relative', width: '100%' }}>
                              <div className="displayColumn">
                                <Typography className="wrap">
                                  <AccessTimeIcon className="checkbox" />
                                  {/* {moment((event.eventDate+event.eventTime)).format("hh:mm A") } */}
                                  {moment(event.eventDateTime).format('h:mm A')}
                                </Typography>
                                <Typography className="wrap">
                                  <LocationOnOutlinedIcon className="checkbox" />
                                  {event.location}
                                </Typography>
                                <Typography className="wrap">
                                  <MovieCreationOutlinedIcon className="checkbox" />
                                  {/* {moment((items.eventDate+items.eventTime)).format("hh:mm A") } */}{' '}
                                  Free for all
                                </Typography>
                              </div>
                              <div className="middle1" style={{ position: 'absolute', right: 0 }}>
                                <div className="border">
                                  {moment(event.eventDate).format('DD')}
                                  <span className="aug">
                                    {moment(event.eventDate).format('MMM')}
                                  </span>
                                </div>
                                <div className="bdiv">
                                  <Button
                                    style={{
                                      borderRadius: '4px',
                                      fontSize: '10px',
                                      marginTop: '-12px',
                                      backgroundColor: '#193389',
                                      color: 'white',
                                    }}
                                    type="button"
                                  >
                                    {event.isRegistered ? 'Registered' : 'Register'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </Grid>
            </>
          ) : (
            <Box
              role="alert"
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="row"
              className={classes.annoucementTable}
            >
              <p className={classes.noRecord}>{noEvents}</p>{' '}
            </Box>
          )}
        </div>
      </div>
    </>
  );
}
