import { Box, Typography, makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import {
  getAllEvents,
} from '../../../../utils/ApiService';
import UpcomingEventsView from './UpcomingEventsView';
import KenLoader from '../../../../components/KenLoader';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';
const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  container: {
    padding: '0px',
    maxHeight: '50vh',
    minHeight: '45vh',
    overflowY: 'scroll',
  },
  semiTitle: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 12,
    marginLeft: 12,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function UpcomingEvents(props) {
  const user = getUserDetails();
  const styles = useStyles();
  const [events, setEvents] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [eventData, setEventData] = React.useState();
  // const [eventContactData, setEventContactData] = React.useState();

  const onClickAll = () => {
    setLoading(true);
    getAllEvents(user.ContactId).then(res => {
      let arr = [];
      res?.data.map(item => {
        if (item.isRegistered) {
          item.type = 'Registered';
        } else {
          item.type = 'Un-Registered';
        }
        arr.push(item);
      });
      let newData = { data: arr };
      setEventData(newData);
      setEvents(arr)
      setLoading(false);
    }).catch(err=>{
      setLoading(false);
    })
  };

  React.useEffect(() => {
    onClickAll();
  }, []);

  const handleSelected = (e, name) => {
    switch (name) {
      case 'all':
        const arr = eventData?.data;
        setEvents(arr);
        break;
      case 'registered':
        const arr2 = eventData?.data.filter(item => {
          return item.isRegistered;
        });
        setEvents(arr2);
        break;
      case 'unregistered':
        const arr3 = eventData?.data.filter(item => {
          return !item.isRegistered;
        });
        setEvents(arr3);
        break;
    }
  };

  return (
    <>
      {loading && <KenLoader />}
      <UpcomingEventsView
        events={events}
        handleSelected={handleSelected}
        style={{ padding: '0px' }}
      />
    </>
  );
}
