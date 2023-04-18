import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TelIcon from '../../../assets/icons/phone.svg';
import MailIcon from '../../../assets/icons/Mail.svg';
import MapIcon from '../../../assets/icons/map-pin.svg';
import ProfilePic from '../../../assets/Images/new-profile.png';
import Avatar from '../../../components/KenAvatar/index';
import { useTranslation } from 'react-i18next';

let newProfile;
if (localStorage.getItem('image')) {
  newProfile = localStorage.getItem('image');
} else {
  newProfile = ProfilePic;
}

const useStyles = makeStyles(theme => ({
  root: {
    // minWidth:350,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  rectangle: {
    height: '50px',
    background: 'linear-gradient(96.64deg, #B3D4FF 3.24%, #FED9D7 95.61%)',
  },
  photo: {
    height: '85px',
    borderRadius: '50%',
  },
  details: {
    marginTop: '-75px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  circle: {
    width: '100px',
    height: '100px',
    lineHeight: '100px',
    borderRadius: '50%',
    color: theme.palette.KenColors.shadowColor,
    textAlign: 'center',
    background: `${theme.palette.KenColors.neutral100}`,
    fontSize: 'xxx-large',
  },
  studentName: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.KenColors.neutral900,
  },
  studentBranch: {
    fontSize: '12px',
    color: theme.palette.KenColors.neutral400,
    paddingLeft: 8,
    paddingRight: 8,
  },
  divider: {
    marginTop: '35px',
  },
  heading: {
    padding: '16px',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
  },
  img: {
    padding: '0px 16px 16px 16px',
  },
  addressSpan: {
    marginTop: 10,
    maxWidth: '200px',
    fontSize: '12px',
    color: theme.palette.KenColors.neutral700,
    marginBottom: '28px',
  },
  divInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    marginBottom: 10,
    fontSize: '12px',
    color: `${theme.palette.KenColors.primary}`,
  },
  root2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
    maxWidth: 300,
    border: `1px solid ${theme.palette.KenColors.neutral20}`,
    boxSizing: 'border-box',
    borderRadius: '3px',
    padding: '8px',
    marginLeft: '16px',
    marginBottom: 8,
  },
  professor: {
    fontSize: '12px',
    color: theme.palette.KenColors.neutral700,
    paddingLeft: '8px',
    marginRight: '21px',
    maxWidth: '128px',
  },
  advisior: {
    paddingRight: 16,
    maxHeight: 300,
    overflow: 'auto',
    paddingBottom: 16,
  },
  advisorChange: {
    fontSize: 14,
    fontWeight: 600,
    width: '30%',
  },
}));

export default function DetailCard(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  var data = props.data;
  const { AcademicProgram } = props;

  return (
    <Card className={classes.root}>
      <Box className={classes.rectangle} />
      <Grid className={classes.details}>
        <Grid item>
          {localStorage.getItem('image') ? (
            <img className={classes.photo} src={newProfile} />
          ) : (
            <p className={classes.circle}>{data.Name.charAt(0)}</p>
          )}
        </Grid>
        <Grid item>
          <Typography className={classes.studentName}>{data.Name}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.studentBranch}>
            {AcademicProgram}
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      {(data.phone || data.mail || data.address) && (
        <Grid>
          <Typography className={classes.heading}>
            {t('headings:Contact')}
          </Typography>
          {data.Phone === 'null' || data.Phone === '' ? null : (
            <div className={classes.divInfo}>
              <img className={classes.img} src={TelIcon} />
              <Typography className={classes.info}>{data.Phone}</Typography>
            </div>
          )}

          {data.mail === 'null' || data.mail === '' ? null : (
            <div className={classes.divInfo}>
              <img className={classes.img} src={MailIcon} />
              <Typography className={classes.info}>{data.mail}</Typography>
            </div>
          )}

          {data.address === 'null' || data.address === '' ? null : (
            <div className={classes.divInfo}>
              <img className={classes.img} src={MapIcon} />
              <Typography className={classes.info}>{data.address}</Typography>
            </div>
          )}
        </Grid>
      )}
      <Grid>
        <Divider />
        {props.teacherData && (
          <Grid>
            <Typography className={classes.heading}>
              {t('Academic_Advisor')}
            </Typography>
            <Grid className={classes.advisior}>
              {props.teacherData.map(el => {
                return (
                  <Grid className={classes.root2}>
                    <Box
                      display="flex"
                      direction="row"
                      justifyContent="space-between"
                      style={{ width: '100%' }}
                    >
                      <Box display="flex" alignItems="center" direction="row">
                        <Avatar value={el.Name.charAt(0)} />
                        <Typography className={classes.professor}>
                          {el.Name}
                        </Typography>
                      </Box>
                      {el.mail && (
                        <a href={`mailto:${el.mail}`} target="_blank">
                          <img src={MailIcon} />
                        </a>
                      )}
                    </Box>
                    {/* <Typography
											className={classes.advisorChange}
											color='primary'
										>
											{t("Change")}
										</Typography> */}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
