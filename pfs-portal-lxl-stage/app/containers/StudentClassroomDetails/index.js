import React from 'react';
import './container.scss';
import SimpleTabs from './components/Tabs/tab.jsx';
import Avatar from '../../components/KenAvatar/index';
import CircularProgressWithLabel from '../../components/ChartWidgets/CircularProgressWithLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  iconBack: {
    height: 12,
  },
  back: {
    fontSize: '12px',
    '&:hover': {
      cursor: 'pointer',
    },
    marginLeft: '-8px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
}));

const StudentClassroomDetails = props => {
  const { ContactName, ProgramName } = props.location.state.student;
  const handleClick = () => {
    props.history.goBack();
  };
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <div onClick={handleClick} className={classes.container}>
        <ArrowBackIcon className={classes.iconBack} color="primary" />
        <Typography className={classes.back} color="primary">
          {t('Back')}
        </Typography>
      </div>
      <Box position="relative">
        {/* <ComingSoonComponent /> */}
        <div className="wrapper">
          <div className="overall-container">
            <div className="header">
              <div className="header-cont">
                <div className="woman-img">
                  <Avatar value={ContactName.charAt(0)} size="large" />
                </div>
                <div className="student-details">
                  <p>{ContactName}</p>
                  <p>{ProgramName}</p>
                </div>
              </div>
              <div className="Progressbar">
                <div className="Attendence-bar">
                  <div>
                    <CircularProgressWithLabel
                      value={(76 / 100) * 100}
                      label="76%"
                    />
                  </div>
                  <div className="progress-title">
                    {t('headings:Attendence')}
                  </div>
                </div>
                <div className="Attendence-bar">
                  <div>
                    <CircularProgressWithLabel
                      value={(6.7 / 10) * 100}
                      label="6.7/10"
                    />
                  </div>
                  <div className="progress-title">{t('Grade')}</div>
                </div>

                <div className="Attendence-bar">
                  <div>
                    <CircularProgressWithLabel
                      value={(12 / 15) * 100}
                      label="12/15"
                    />
                  </div>
                  <div className="progress-title">{t('Submitted')}</div>
                </div>
                <div className="Attendence-bar">
                  <div>
                    <CircularProgressWithLabel
                      value={(28 / 100) * 100}
                      label="28%"
                    />
                  </div>
                  <div className="progress-title">{t('Percentage')}</div>
                </div>
              </div>
            </div>
            <div className="tabs">
              <SimpleTabs {...props} />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
export default StudentClassroomDetails;
