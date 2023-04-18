import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import { Link, useHistory } from 'react-router-dom';
import routes from '../../../utils/routes.json';
import { useState } from 'react';
import './quetionPaper.css';
import moment from 'moment';
import ChatLayout from '../../../components/ChatLayout/ChatLayout';
import ChatInput from '../../../components/ChatInput/ChatInput';

const arrayBreadCrumb = [
  // { head: 'ADMIN PORTAL', url: routes.adminManagement },
  {
    head: 'EXAM',
    url: routes.exam
  },
  {
    head: 'Question Paper',
    url: routes.questionPaper,
  },
  {
    head: 'Chat Section',
  },
];

const useStyles = makeStyles((theme) => ({
  breadCrumbWrapper: {
    margin: '15px 0',
  },
  header: {
    color: theme.palette.KenColors.primary,
    padding: '0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeaderTitle: {
    width: '100%',
  },
  addButton: {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
    textTransform: 'none',
    '&:hover': {
      color: 'white',
      borderBottom: '1px solid white',
    },
  },
  mainActions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0 1rem',
  },
  error: {
    color: '#F14B2D',
    background: 'rgba(241, 75, 45, 0.2)',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
  },
  normal: {
    color: '#27AE60',
    background: 'rgba(196, 196, 196, 0.2)',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
  },
  medium: {
    color: '#F2994A',
    background: 'rgba(196, 196, 196, 0.2)',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
  },
  errorText: {
    color: '#F14B2D',
  },
  greenText: {
    color: '#27AE60',
  },
  gridKenClass: {
    '&  table tbody tr td ': {
      padding: '5px',
    },
    '&  table thead tr th ': {
      fontWeight: 'bold',
      color: '#061938',
    },
  },
}));

const chatData = [
  {
    sender: true,
    message: `Hey, Could you please let me know which chapters I have to cover
  in UX/UI paper?`,
    profilePic: 'https://ptetutorials.com/images/user-profile.png',
    time: '3 days ago',
  },
  {
    sender: false,
    message: `Hi Nandhini, you should include first 8 chapters in mid semester
    exam.`,
    profilePic: '',
    time: '3 days ago',
  },
  {
    sender: true,
    message: `Okay, Thank you gentleman!`,
    profilePic: 'https://ptetutorials.com/images/user-profile.png',
    time: '3 days ago',
  },
];

const ChatSection = () => {
  const history = useHistory();
  const classes = useStyles();

  const [chats, setChats] = useState(chatData);
  const [typedMessage, setTypedMessage] = useState(
    'Anytime, You are always welcome!'
  );

  const messageChangeHandler = (e) => {
    setTypedMessage(e.target.value);
  };

  const sendMessageHandler = () => {
    if (!typedMessage) {
      return;
    }

    setChats((prev) => {
      return [
        ...prev,
        {
          sender: false,
          message: typedMessage,
          profilePic: '',
          time: moment(new Date()).fromNow(),
        },
      ];
    });

    setTypedMessage('');
  };

  return (
    <Box>
      <Box className={classes.breadCrumbWrapper}>
        <BreadCrumb array={arrayBreadCrumb} history={history} />
      </Box>
      {/* <AppBar position="static" elevation={0} className={classes.header}> */}
      <Toolbar className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Question Paper
        </Typography>
      </Toolbar>
      {/* </AppBar> */}
      <div className="user-details-main">
        <div className="user-details-left">
          <h3>UX/UI Design</h3>
          <h5>
            Faculty: <span>Nandhini Clament</span>
          </h5>
          <h5>
            Component: <span>Term II</span>
          </h5>
        </div>
        <div className="user-details-left">
          <Button variant="contained" color="success">
            Approve
          </Button>
        </div>
      </div>

      <div className="chat-box-part">
        <ChatLayout chats={chats} />

        <ChatInput
          typedMessage={typedMessage}
          messageChangeHandler={messageChangeHandler}
          sendMessageHandler={sendMessageHandler}
        />
      </div>
    </Box>
  );
};

export default ChatSection;
