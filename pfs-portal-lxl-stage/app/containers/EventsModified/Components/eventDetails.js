import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box, Paper } from '@material-ui/core';
import kenColors from '../../../utils/themes/KenColors';
import { useTranslation } from 'react-i18next';
import { createMuiTheme } from '@material-ui/core';
import KenCard from '../../../global_components/KenCard';
import KenButton from '../../../global_components/KenButton';
import KenGrid from '../../../global_components/KenGrid';
import {
  getEventRegister,
  getEventsData,
  postEventRegister,
} from '../../../utils/ApiService';
import moment from 'moment';
import KenLoader from '../../../components/KenLoader';
import KenDialog from '../../../global_components/KenDialog';
import { useParams } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import './style.css';
import Eventimg from '../../../assets/event1.png';
const useStyles = makeStyles(theme => ({
  appBar: {
    background: '#E8ECFF',
    marginBottom: 10,
    borderRadius: 12,
  },
  toolBar: {
    justifyContent: 'space-between',
  },
  toolBarContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: ' 100%',
  },
  root: {
    margin: '16px 0px 0px 0',
    boxShadow: `0px 0px 9px ${theme.palette.KenColors.shadowColor}`,
    borderRadius: 3,
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
    width: '230px',
    background: '#fff',
    marginBottom: 15,
    position: 'relative',
    top: 10,

    [theme.breakpoints.down('sm')]: {
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
  cardTextContent: {
    height: '100%',
    display: 'flex',
    fontSize: 12,
  },
  eventText: {
    fontWeight: 600,
    fontSize: 14,
    paddingTop: 30,
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
    height: '200px',
    width: '100%',
    objectFit: 'cover',
  },
  cardWrapContent: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
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
    paddingLeft: 20,
  },
  annoucementTable: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  headTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#092682',
    marginLeft: '4px',
  },
  bottomWrap: {
    // position:'fixed',
    // bottom:0,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    background: '#fff',
    height: '80px',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  bottomWrapContent: {
    width: '240px',
  },
  contentWrap: {
    display: 'flex',
    padding: '10px',
  },
  contentTextWrap: {
    color: '#5040A1',
    paddingTop: 10,
  },
  avatartWrapper: {
    padding: 20,
  },
  avatartWrap: {
    paddingLeft: 20,
    color: '#5040A1',
    fontSize: 18,
  },
  imageFlexWrap: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent:'center'
  },
  imageFlexContentWrap: {
    width: 60,
    height: 32,
    paddingRight: '20px',
    marginBottom: 10,
  },
  bottomSection: {
    background: '#fff',
    padding: '25px 25px 20px 25px',
    'box-shadow': '0px -7px 104px -20px rgba(0, 0, 0, 0.2)',
    'border-radius': '40px 40px 0px 0px',
    position: 'fixed',
    bottom: 0,
    right: '1px',
    // width: 'calc(100% - 129px - 70px)',
    width: '100%',
    left: '270px',
  },
  bottomTxt: {
    // fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    /* identical to box height */
    textAlign: 'left',
    // color: activeTheme.general.eventLabel,
    marginBottom: '10px',
  },
  bottomTxtContent: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    /* identical to box height */
    textAlign: 'left',
    color: '#000000',
    // marginBottom: '10px'
  },
  bottomPriceContent: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '24px',
    /* identical to box height */
    textAlign: 'left',
  },
  applyNowBtn: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    paddingRight: 15,
    borderRadius: '32px',
    '&:hover': {
      cursor: 'pointer',
      background: '#fff',
      color: '#FDB813',
      border: '1px solid #FDB813',
    },
    padding: '10px 10px',
  },
  registered__text: {
    fontWeight: '500',
    fontSize: '18px',
    color: theme.palette.KenColors.primary,
    textTransform: 'upperCase',
    paddingTop: 15,
    paddingRight: 15,
  },
}));

export default function EventDetails(props) {
  const { history } = props;
  const { eventId } = useParams();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = useState('');
  const [tabData, setTabData] = useState([]);
  const [applied, setApplied] = useState('false');

  useEffect(() => {
    onEventsCall(eventId);
  }, [eventId]);

  const onEventsCall = eventId => {
    setLoading(true);
    const Id = `?eventId=${eventId}`;
    const ContactId = JSON.parse(localStorage.getItem('userDetails'))
      ?.ContactId;
    getEventsData(Id)
      .then(res => {
        setLoading(false);
        console.log(res);
        setEventsData(res.data);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
    //for table
    setLoading(true);
    getEventRegister(Id)
      .then(res => {
        let eventDetails = res.data;
        setLoading(false);
        console.log(res);
        setTabData(res.data);
        eventDetails.filter(item => {
          if (item.contactId === ContactId && item.eventId === eventId) {
            setApplied('true');
          }
        });
        // console.log("applied",applied);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const columns = [
    {
      Header: (
        <Typography variant="h6" className={classes.headTitle}>
          Attendees
        </Typography>
      ),
      accessor: 'contactName',
      Cell: ({ value, row }) => {
        return (
          <Typography
            className={classes.studentAttendance}
            style={{ textAlign: 'center' }}
          >
            {/* <img
              style={{ width: '32px', height: '20px' }}
              src={imageSideTable}
              className="add_grp_image"
            />{' '} */}
            <span>{value}</span>
          </Typography>
        );
      },
      disableGlobalFilter: true,
    },
  ];
  const onRegister = () => {
    setLoading(true);
    const eventPayloadData = [];
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const ContactId = JSON.parse(localStorage.getItem('userDetails'))
      ?.ContactId;
    eventsData.map(ev => {
      eventPayloadData.push({
        eventRegistrationId: '',
        eventId: ev.id,
        contactId: ContactId,
        applied: true,
      });
    });
    postEventRegister(eventPayloadData)
      .then(res => {
        setMessage('Thank you for Registering');
        setLoading(false);
        console.log(res);
        setOpen(true);
      })
      .catch(err => {
        setMessage('Something went wrong..!');
        setLoading(false);
        console.log(err);
      });
  };
  const onhandleClose = () => {
    // handleClose();
    history.goBack();
  };

  // const handleOpen = () => setOpen(true);
  const handleModalClose = () => {
    onEventsCall(eventId);
    setOpen(false);
  };
  console.log(eventsData);

  return (
    <div className={classes.topView}>
      {loading && <KenLoader />}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end" my={1}>
          {/* <div className={classes.topContainer}>
            <Typography className={classes.eventHeading}>{'Events'}</Typography>
          </div> */}
          {/* <KenButton
            onClick={onhandleClose}
            variant="secondary"
            style={{ width: '120px' }}
          >
            Back
          </KenButton> */}
        </Box>
        {eventsData.map(event => {
          return (
            <>
              <Grid
                item
                xs={12}
                style={{ height: '170vh', background: 'white' }}
              >
                <div className="boxShadow">
                  <div>
                    <img
                      src={`data:image/png;base64,${
                        event?.attachment[0]?.attachmentBody
                      }`}
                      className={classes.cardImage}
                    />
                  </div>
                  <div className="borderC">
                    <div className="DateFormat">
                      <div className="border1">
                        {moment(event.eventDate).format('DD')}

                        <div className="aug1">
                          {moment(event.eventDate).format('MMM')}
                        </div>
                      </div>
                      <div>
                        <Typography className="annualTypo">
                          {event.name}
                        </Typography>
                      </div>
                    </div>
                    {applied === 'false' ?
                    <Button
                      style={{
                        borderRadius: '4px',
                        fontSize: '16px',
                        marginTop: '-6px',
                        backgroundColor: '#193389',
                        color: 'white',
                        textTransform: 'capitalize',
                      }}
                      type="button"
                      onClick={ onRegister}
                    >
                      Register for ₹{event.eventPrice}
                    </Button> :  <Typography className={classes.registered__text}>
                       Registered
                      </Typography>
                       }
                  </div>
                  <div className="mid">
                    <div className="midClild">
                      <Typography className="typo">Date & Time</Typography>
                      <Typography className="typo1">
                        {/* {moment((event.eventDate+event.eventTime)).format("hh:mm A") } */}
                        {moment(event.eventDateTime).format('MMMM DD YYYY, h:mm A')}
                      </Typography>
                    </div>
                    <div className="midClild">
                      <Typography className="typo">LOCATION</Typography>
                      <Typography className="typo1">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP6eZSr4hiJeLntUzmJVrmWlqfEFTiMj-ZkWwWrOWrOm55FQ05xTdwMPcdkUVroLYJZ1k&usqp=CAU"
                          width={'22px'}
                        />{' '}
                       {event.location}
                      </Typography>
                    </div>
                    <div className="midClild">
                      <Typography className="typo">Duration</Typography>
                      <Typography className="typo1">
                        {event.eventDuration}
                      </Typography>
                    </div>
                    <div className="midClild">
                      <Typography className="typo">ATTENDEES</Typography>
                      <Typography className="typo1">{event?.attendees}</Typography>
                    </div>
                    <div className="midClild">
                      <Typography className="typo">POSTED ON</Typography>
                      <Typography className="typo1">{moment(event.dateOfPosted).format('DD/MM/YYYY')}</Typography>
                    </div>
                    <div className="last">
                      <Typography className="typo2">CATEGORIES</Typography>
                      <div className="flex">
                        <div className="border2Child">Festival</div>
                        <div className="border2">Cultural Events</div>
                      </div>
                    </div>
                  </div>
                  {/* <div className='flex'> */}

                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <div className="lastChild">
                        <Typography className="typoP">
                          About the event
                        </Typography>
                        <Typography className="typoContent">
                          {event.description}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className="lastChild">
                        <Typography className="mapTypoP">
                          What to expect
                        </Typography>
                        {event.whatYouGet.split(';').map((item, index) => {
                          return (
                            <div className="map">
                              <DoneIcon className="icon" />
                              <Typography className="mapTypoC">
                                {item}
                              </Typography>
                            </div>
                           );
                        })} 
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}
