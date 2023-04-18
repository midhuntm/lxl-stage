import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import testData from '../DiscussionForum/testData.json';
import KenSelect from '../../../components/KenSelect';
import KenButton from '../../../global_components/KenButton';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
//icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import StarIcon from '@material-ui/icons/Star';
import LockOpenIcon from '@material-ui/icons/LockOpen';
// import symbolA from '../../../assets/icons/symbolA.svg';
import KenInputField from '../../../components/KenInputField';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
// import videoSvg from '../../../assets/icons/videoSvg.svg';
// import previewSvg from '../../../assets/icons/previewSvg.svg';
// import downloadSvg from '../../../assets/icons/downloadSvg.svg';
import Discussions from './Components/Discussions';
import DiscussionReply from './Components/Reply';
import DiscussionDetails from './Components/Discussion Details';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
  containerModify: {
    maxHeight: '70vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
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
      background: '#C4C4C4',
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
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function DiscussionForum(props) {
  const {
    forumID,
    discussionData,
    setDiscussionData,
    setLoading,
    handleSnackbarOpen,
    setActionCall,
    discussionId,
  } = props;

  const classes = useStyles();
  const [lock, setLock] = useState(false);
  const [star, setStar] = useState(false);
  const [pin, setPin] = useState(false);
  const [lockData, setLockData] = useState(null);
  const [starData, setStarData] = useState(null);
  const [pinData, setPinData] = useState(null);

  const [discussionCardClick, setDiscussionCardClick] = useState(null);

  useEffect(() => {
    if (discussionData.length > 0 && discussionCardClick === null) {
      if (discussionId) {
        const obj = discussionData?.find(
          item => item.discussionid === discussionId
        );
        if (obj) {
          setDiscussionCardClick(obj);
        } else {
          setDiscussionCardClick(discussionData[0]);
        }
      } else {
        setDiscussionCardClick(discussionData[0]);
      }
    }
  }, [discussionData]);

  const HandleDiscussionCard = data => {
    setDiscussionCardClick(data);
  };

  const handleLockClick = data => {
    setLock(!lock);
    setLockData(data);
    setActionCall(true);
  };
  const handleStarClick = data => {
    setStar(!star);
    setStarData(data);
    setActionCall(true);
  };
  const handlePinClick = data => {
    setPin(!pin);
    setPinData(data);
    setActionCall(true);
  };
  useEffect(() => {
    if (discussionCardClick !== null) {
      setLock(discussionCardClick?.locked);
      setStar(discussionCardClick?.starred);
      setPin(discussionCardClick?.pinned);
    }
  }, [discussionCardClick]);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={4} sm={4} xs={12}>
          <Discussions
            forumID={forumID}
            discussionData={discussionData}
            setDiscussionData={setDiscussionData}
            testData={testData}
            HandleDiscussionCard={HandleDiscussionCard}
            discussionCardClick={discussionCardClick}
            setDiscussionCardClick={setDiscussionCardClick}
            setActionCall={setActionCall}
            handlePinClick={handlePinClick}
            handleLockClick={handleLockClick}
          />
        </Grid>

        <Grid item md={5} sm={5} xs={12}>
          <DiscussionReply
            lock={lock}
            setLock={setLock}
            star={star}
            setStar={setStar}
            pin={pin}
            setPin={setPin}
            handlePinClick={handlePinClick}
            handleLockClick={handleLockClick}
            handleStarClick={handleStarClick}
            testData={testData}
            discussionCardClick={discussionCardClick}
            lockData={lockData}
            setLockData={setLockData}
            starData={starData}
            setStarData={setStarData}
            pinData={pinData}
            setPinData={setPinData}
            forumID={forumID}
            setLoading={setLoading}
            handleSnackbarOpen={handleSnackbarOpen}
            setActionCall={setActionCall}
          />
        </Grid>

        <Grid item md={3} sm={3} xs={12}>
          <DiscussionDetails
            lock={lock}
            testData={testData}
            discussionCardClick={discussionCardClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
