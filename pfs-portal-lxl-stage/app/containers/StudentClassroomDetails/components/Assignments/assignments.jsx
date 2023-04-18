import React from 'react';
import { Grid, Typography, makeStyles, Box } from '@material-ui/core';
import { StudentActivities } from '../../../../utils/ApiService';
import {KEY_STATUS} from '../../../../utils/constants';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles(theme=>({
  cards: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardList: {
    border: `1px solid ${theme.palette.KenColors.neutral20}`,
    boxShadow: `5px 7px 2px ${theme.palette.KenColors.kenWhite}`,
    borderLeft: `1.5px solid ${theme.palette.KenColors.tertiaryRed500}`,
    padding: 16,
    marginRight: 16,
    borderRadius: 3,
  },
  cardData: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  cardContent: {
    fontSize: 12,
    color: theme.palette.KenColors.primary,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  circleDot: {
    background: theme.palette.KenColors.neutral100,
    width: 40,
    borderRadius: '50%',
    height: 40,
  },
  circle: {
    color: theme.palette.KenColors.neutral100,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueDates: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dueDate: {
    fontSize: 10,
    marginTop: 10,
  },
  subHead:{
    fontSize: 12, color: '#061938'
  }
}));

export default function Assignments(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const { ContactId, Id } = props.location.state.student;
  const [details, setDetails] = React.useState();
  React.useEffect(() => {
    StudentActivities(ContactId, Id).then(res => {
      if (res.status === KEY_STATUS.failed) {
        setDetails();
      } else {
        setDetails(res.courses[0].activities.assignment);
      }
    });
  }, []);
  const handleClick = url => {
    window.open(url);
  };
  return (
    <div>
      <Grid md={12} xs={6} />

      <Grid item spacing={2}>
        <div className={classes.cards}>
          {details && details.length > 0 ? (
            details.map(el => {
              return (
                <Grid item md={3}>
                  <div className={classes.cardList}>
                    <Grid
                      container
                      display="flex"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={9} xd={12}>
                        <h3
                          className={classes.cardContent}
                          onClick={() => {
                            handleClick(el.url);
                          }}
                        >
                          {el.name}
                        </h3>
                      </Grid>
                      <Grid item md={3}>
                        <div className={classes.circleDot}>
                          <h5 className={classes.circle}>---</h5>
                        </div>
                      </Grid>
                    </Grid>
                    <div className={classes.dueDates}>
                      <h1 className={classes.dueDate}>
                        Due:{' '}
                        <span className={classes.subHead}>
                          {el.gradingduedate}
                        </span>
                      </h1>
                    </div>
                  </div>
                </Grid>
              );
            })
          ) : (
            <Typography>{t("No_Assignments_Found")}</Typography>
          )}
        </div>
      </Grid>
    </div>
  );
}
