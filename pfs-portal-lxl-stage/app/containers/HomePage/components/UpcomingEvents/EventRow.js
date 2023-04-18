import { Grid, makeStyles, Typography, Divider} from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import Routes from '../../../../utils/routes.json';
import { Link } from 'react-router-dom';
import { AiOutlineCalendar } from 'react-icons/ai';

const useStyles = makeStyles(theme => ({
  title: {
    color: '#092682',
    fontSize: 12,
    fontWeight: 600,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  content: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 12,
  },
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  link: {
    textDecoration: 'none',
  },
  typeReg: {
    marginLeft: 16,
    padding: '0px 4px',
    backgroundColor: theme.palette.KenColors.tertiaryGreen504,
    fontSize: 12,
    color: theme.palette.KenColors.kenWhite,
    borderRadius: 9,
  },
  typeUnReg: {
    marginLeft: 16,
    padding: '0px 4px',
    backgroundColor: theme.palette.KenColors.tertiaryRed503,
    fontSize: 12,
    color: theme.palette.KenColors.kenWhite,
    borderRadius: 9,
  },
  innerContainer: { borderBottom: '0.5px solid #E3E3E3' },
}));
const EventRow = props => {
  const styles = useStyles();
  const { event } = props;

  return (
    <div>
      <Grid container className={styles.container}>
        <Grid item md={2}>
          <div
            style={{
              borderRadius: '27px',
              backgroundColor: '#F4F5F7',
              width: '43px',
              height: '43px',
            }}
          >
            <center>
              <br />
              <b>
                <AiOutlineCalendar
                  style={{ color: '#092682', width: '20px', height: '20px' }}
                />
              </b>
            </center>
          </div>
        </Grid>
        <Grid item md={10} style={{ margin: '-10px 0px' }}>
          <h5 style={{ marginBottom: '8px' }}>Events</h5>
          <Link
            to={{ pathname: `/${Routes.eventDetails}/${event?.id}` }}
            className={styles.link}
          >
            <h3>
              <Typography className={styles.title} data-testid="event-title">
                {event?.name}
              </Typography>
            </h3>
          </Link>
        </Grid>
      </Grid>
      <Divider />
      {/* <Grid
        container
        className={styles.container}
        direction="row"
        justify="space-between"
       >
        <Grid container direction="row">
        <AiOutlineCalendar style={{color:"#092682",width:"20px",height:"20px"}} />Events<br/>
        </Grid>
        <Grid item>
          <Grid container direction="row">
           
            <Link
              to={{ pathname: `/${Routes.eventDetails}/${event?.id}`}}
              className={styles.link}
            >
              <Typography className={styles.title} data-testid="event-title">
                {event?.name}
              </Typography>
            </Link>
            {event?.type && (
              <Typography
                data-testid="event-type-tag"
                className={
                  event?.type === 'Registered'
                    ? styles.typeReg
                    : styles.typeUnReg
                }
              >
                {event?.type}
              </Typography>
            )}
          </Grid>
          {event?.description && (
            <Typography
              className={styles.content}
              data-testid="event-description"
            >
              {event?.description?.substring(0, 70)}...
            </Typography>
          )}
        </Grid>
        <Grid item>{moment(event?.eventDate).format('DD MMM')}</Grid>
      </Grid> */}
    </div>
  );
};

export default EventRow;
