import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenCard from '../../../../global_components/KenCard/index';
import KenButton from '../../../../global_components/KenButton';
//icons
const lmsVideoIcon =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/video-icon.svg';
import KenIcon from '../../../../global_components/KenIcon';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  hoverEffect: {
    '&:hover': {
      background: '#F0F3FF',
    },
  },

  accordian: {
    width: '100%',
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  presentationHeadingStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#1CAEE4',
  },
  fileHeadingStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#008877',
  },
  videoHeadingStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#C29705',
  },
  pdfHeadingStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#E75D3B',
  },
  linkHeadingStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#793BCC',
  },
  filenameStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#505F79',
    cursor: 'pointer',
  },
  filesizeStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '13px',
    lineHeight: '20px',
    color: '#7A869A',
  },
  statusStyle: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '150%',
    color: '#52C15A',
  },
  containerModify: {
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
    textAlign: 'center',
    '&:hover': {
      background: '#F0F3FF',
    },
  },
  resourceIconBox: {
    marginBottom: 10,
  },
  excelText: {
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
  },
  excelImgTitle: {
    marginBottom: 10,
    width: 56,
    height: 56,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(3),
      width: 'auto',
    },
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    paddingLeft: theme.spacing(1),
  },
  searchIcon: {
    fill: `${theme.palette.KenColors.neutral100} !important`,
  },
  topicList: {
    marginTop: '14px',
    textAlign: 'center',
  },
}));

export default function ContentResources(props) {
  const {
    chapterData,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [hide, setHide] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);

  const Hideshow = () => {
    setHide(!hide);
  };
  const Hideshow1 = () => {
    setHide1(!hide1);
  };
  const Hideshow2 = () => {
    setHide2(!hide2);
  };
  const Hideshow3 = () => {
    setHide3(!hide3);
  };

  const [openmodel, setOpenmodel] = React.useState(false);
  const Grading = () => {

    history.push('/Grading');
  };

  return (
    <div className={classes.root}>
      {/* popper for editbox */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item md={4} sm={7} xs={4}>
          <Typography component="div" color="secondary">
            <Box m={1} fontWeight="fontWeightBold">
              {chapterData.name}
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <KenCard>
          <Grid container md={12} sm={12} xs={12}>
            <Grid item md={4} style={{ marginTop: '7px' }}>
              <Typography className={classes.videoHeadingStyle}>
                <span>
                  <img
                    src={lmsVideoIcon}
                    alt=""
                    style={{ width: '40px', height: '40px' }}
                  />
                  &nbsp; Film
                </span>
              </Typography>
            </Grid>
            <Grid item md={4} onClick={Hideshow}>
              {hide ? (
                <KenButton
                  variant="warning"
                  style={{
                    height: 36,
                    marginRight: '10px',
                    marginTop: 10,
                    color: '#00B25D',
                    background: '#0000000a',
                  }}
                >
                  {'Published'}
                </KenButton>
              ) : (
                <KenButton
                  variant="warning"
                  style={{
                    height: 36,
                    marginRight: '10px',
                    marginTop: 10,
                    color: 'red',
                    background: '#0000000a',
                  }}
                >
                  {'Unpublished'}
                </KenButton>
              )}
            </Grid>
            <Grid item md={4} className={classes.topicList}>
              <KenButton
                variant="primary"
                style={{
                  height: 36,
                  marginRight: '10px',
                  float: 'right',
                  marginTop: "-10px",
                  width: 120,
                }}
                onClick={Grading}
              >
                {'Grading'}
              </KenButton>
            </Grid>
          </Grid>
        </KenCard>
      </Grid>
      <Grid container spacing={1}>
        <KenCard>
          <Grid container md={12} sm={12} xs={12}>
            <Grid item md={4} style={{ marginTop: '7px' }}>
              <Typography
                variant="body1"
                gutterBottom
                color="secondary"
                className={classes.presentationHeadingStyle}
              >
                <span>
                  <img
                    src={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/presentation-icon.svg`}
                    alt=""
                    style={{ width: 40, height: 40 }}
                  />
                  &nbsp;Fun Activity
                </span>
              </Typography>
            </Grid>
            <Grid item md={4} onClick={Hideshow1}>
              {hide1 ? (
                <KenButton
                  variant="warning"
                  style={{
                    height: 36,
                    marginRight: '10px',
                    marginTop: 5,
                    color: '#00B25D',
                    background: '#0000000a',
                  }}
                >
                  {'Published'}
                </KenButton>
              ) : (
                <KenButton
                  variant="warning"
                  style={{
                    height: 36,
                    marginRight: '10px',
                    marginTop: 5,
                    color: 'red',
                    background: '#0000000a',
                  }}
                >
                  {'Unpublished'}
                </KenButton>
              )}
            </Grid>
            <Grid item md={4} className={classes.topicList}>
              <KenButton
                variant="primary"
                style={{
                  height: 36,
                  marginRight: '10px',
                  float: 'right',
                  marginTop: "-10px",
                  width: 120,
                }}
                onClick={Grading}
              >
                {'Grading'}
              </KenButton>
            </Grid>
          </Grid>
        </KenCard>
      </Grid>
      <Grid container spacing={1}>
        <KenCard>
          <Grid container md={12} sm={12} xs={12}>
            <Grid item md={4} style={{ marginTop: '7px' }}>
              <Typography
                variant="body1"
                gutterBottom
                color="secondary"
                className={classes.presentationHeadingStyle}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: '#cbf0df',
                    color: '#185c37',
                    height: '40px',
                    width: '40px',
                  }}
                >
                  <KenIcon
                    iconType={'img'}
                    icon={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/excelIcon.svg`}
                    styles={{
                      color: '#185c37',
                      height: '23px',
                      width: '23px',
                    }}
                  />
                </Avatar>
                <span style={{ color: '#185c37' }}>
                  &nbsp; Action Time
                </span>
              </Typography>
            </Grid>
            <Grid item md={4} onClick={Hideshow2}>
              {hide2 ? (
                <KenButton
                  variant="warning"
                  style={{
                    height: 36,
                    marginRight: '10px',
                    marginTop: 5,
                    color: '#00B25D',
                    background: '#0000000a',
                  }}
                >
                  {'Published'}
                </KenButton>
              ) : (
                <KenButton
                  variant="warning"
                  style={{
                    height: 36,
                    marginRight: '10px',
                    marginTop: 5,
                    color: 'red',
                    background: '#0000000a',
                  }}
                >
                  {'Unpublished'}
                </KenButton>
              )}
            </Grid>
            <Grid item md={4} className={classes.topicList}>
              <KenButton
                variant="primary"
                style={{
                  height: 36,
                  marginRight: '10px',
                  float: 'right',
                  marginTop: "-10px",

                  width: 120,
                }}
                onClick={Grading}
              >
                {'Grading'}
              </KenButton>
            </Grid>
          </Grid>
        </KenCard>
      </Grid>
      <Grid container spacing={1}>
        <KenCard>
          <Grid container md={12} sm={12} xs={12}>
            <Grid item md={4} style={{ marginTop: '7px' }}>
              <Typography
                variant="body1"
                gutterBottom
                color="secondary"
                className={classes.presentationHeadingStyle}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: '#cbf0df',
                    color: '#185c37',
                    height: '40px',
                    width: '40px',
                  }}
                >
                  <KenIcon
                    iconType={'img'}
                    icon={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/presentation-icon.svg`}
                    styles={{
                      color: '#185c37',
                      height: '23px',
                      width: '23px',
                    }}
                  />
                </Avatar>
                <span style={{ color: '#800000' }}>
                  &nbsp; Workbook Pdf
                </span>
              </Typography>
            </Grid>
            <Grid item md={4}>
              <KenButton
                variant="warning"
                style={{
                  height: 36,
                  marginRight: '10px',
                  marginTop: 5,
                  color: 'red',
                  background: '#0000000a',
                }}
              >
                {'view'}
              </KenButton>
            </Grid>
          </Grid>
        </KenCard>
      </Grid>
    </div>
  );
}
