import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import { getUserDetails } from '../../../../../utils/helpers/storageHelper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { BsPin } from 'react-icons/bs';
import { BsPinFill } from 'react-icons/bs';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height: '650px',
  },
  containerModify: {
    maxHeight: '70vh',
    overflowY: 'auto',
    width: '100%',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#00218D',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  containerModify2: {
    maxHeight: '40vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#00218D',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
  hoverEffect: {
    '&:hover': {
      background: '#F0F3FF',
    },
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  headingFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
    color: '#061938',
  },
}));

export default function Discussions(props) {
  const {
    testData,
    HandleDiscussionCard,
    forumID,
    discussionData,
    setDiscussionData,
    discussionCardClick,
    lock,
    setLock,
    pin,
    setPin,
    setActionCall,
    handlePinClick,
    handleLockClick,
  } = props;
  const profile = getUserDetails();
  const classes = useStyles();
  const [favData, setFavData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (discussionData.length > 0) {
      setDisplayData(discussionData);
      const data = discussionData.filter(item => item.starred === true);
      setFavData(data);
    }
  }, [discussionData]);

  const handleStarred = () => {
    setDisplayData(favData);
  };
  const handleAll = () => {
    setDisplayData(discussionData);
  };
  const { t } = useTranslation();

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={8} sm={5} xs={7}>
          <Button
            onClick={handleAll}
            className={classes.headingFont}
          // style={{
          //   borderBottom: '1px solid #F4F5F7',
          //   marginBottom: '16px',
          //   padding: '8px',
          // }}
          >
            All ({discussionData?.length})
          </Button>
        </Grid>
        <Grid item md={4} sm={7} xs={5}>
          <Button
            className={classes.headingFont}
            // style={{
            //   borderBottom: '1px solid #F4F5F7',
            //   marginBottom: '16px',
            //   padding: '8px',
            // }}
            onClick={handleStarred}
          >
            {t('labels:Favourite')} ({favData?.length})
          </Button>
        </Grid>
        <Grid item container spacing={2}>
          <Box className={classes.containerModify}>
            {displayData?.map(e => {
              return (
                <Card
                  variant="outlined"
                  className={classes.hoverEffect}
                  style={{
                    marginBottom: 5,
                    background:
                      discussionCardClick !== null &&
                      discussionCardClick?.discussionid === e?.discussionid &&
                      '#F0F3FF',
                    border:
                      discussionCardClick !== null &&
                        discussionCardClick?.discussionid === e?.discussionid
                        ? 'solid 1px #0077FF'
                        : '',
                  }}
                  onClick={() => {
                    HandleDiscussionCard(e);
                  }}
                >
                  <CardContent style={{ paddingBottom: 0 }}>
                    <Grid
                      container
                      spacing={2}
                      style={{ alignItems: 'center' }}
                    >
                      <Grid item md={8}>
                        {' '}
                        <Typography className={classes.headingFont}>
                          {e.name}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={4}
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          minWidth: 'max-content',
                          padding: 0
                        }}
                      >
                        {profile?.Type === 'Faculty' && (
                          <IconButton
                            onClick={() => {
                              handleLockClick(discussionCardClick);
                            }}
                            // title={lock && lock ? "Unlock" : "Lock"}
                            style={{ padding: 9 }}
                          >
                            {e.locked && (
                              <LockOutlinedIcon
                                fontSize="small"
                                style={{ color: '#de0404' }}
                              />
                            )}
                          </IconButton>
                        )}

                        {profile?.Type === 'Faculty' && (
                          <IconButton
                            onClick={() => {
                              handlePinClick(discussionCardClick);
                            }}
                            // title={pin && pin ? "UnPin" : "Pin"}
                            style={{ padding: 9 }}
                          >
                            {e.pinned && (
                              <BsPinFill
                                fontSize="medium"
                                style={{ color: '#00218D' }}
                              />
                            )}
                          </IconButton>
                        )}
                        <Typography variant="subtitle2">
                          {' '}
                          {moment.unix(e.modified).format('DD MMM ')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item md={12}>
                      <Typography variant="subtitle2">
                        {' '}
                        {parse(`${e.message}`)}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
