import React from 'react';
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TelIcon from '../../../assets/icons/phone.svg';
import MailIcon from '../../../assets/icons/Mail.svg';
import MapIcon from '../../../assets/icons/map-pin.svg';
import { KEY_USER_DETAILS } from '../../../utils/constants';
import history from '../../../utils/history';
import Routes from '../../../utils/routes.json';
import { Link } from 'react-router-dom';
import { getUserDetails } from '../../../utils/helpers/storageHelper';

const useStyles = makeStyles(theme => ({
  parentRoot: {
    borderRadius: '3px',
    margin: '32px 0px 32px 0px',
    position: 'relative',
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
  profile: {
    position: 'absolute',
    top: '32px',
    left: '0px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  studentName: {
    fontWeight: 600,
    fontSize: '16px',
    color: theme.palette.KenColors.neutral900,
    marginTop: '8px',
  },
  rectangle: {
    height: '50px',
    background: 'linear-gradient(96.64deg, #B3D4FF 3.24%, #FED9D7 95.61%)',
    marginLeft: 10,
  },
  profileContainer: {
    position: 'relative',
  },
  heading: {
    padding: '16px',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
  },
  divInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    padding: '0px 16px 16px 16px',
  },
  info: {
    marginBottom: 10,
    fontSize: '12px',
    color: `${theme.palette.KenColors.primary}`,
  },
  divider: {
    margin: '0px 0px 10px 0px',
  },
  menuItemDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.KenColors.neutral40,
    },
  },
  av: {
    width: '36px',
    height: '36px',
    lineHeight: '33px',
    borderRadius: '55%',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    background: `${theme.palette.KenColors.neutral100}`,
  },
  titleDetails: {
    color: `${theme.palette.KenColors.neutral400}`,
    fontSize: 10,
  },
  plainLink: {
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  activeMenuItem: {
    borderLeft: `3px solid ${theme.palette.KenColors.cardActiveBorderColor}`,
    borderRadius: 4,
    backgroundColor: theme.palette.KenColors.cardActiveBackground,
    '& $titleName': {
      color: theme.palette.KenColors.cardActiveColor,
    },
  },
}));

export default function ParentDetails(props) {
  const classes = useStyles();
  const { userParent } = props;
  const { t } = useTranslation();
  const handleChildren = details => {
    localStorage.setItem(KEY_USER_DETAILS, JSON.stringify(details));
    history.push(`/${Routes.studentDetails}/${details.ContactId}`);
    window.location.reload();
  };
  const getChildName = () => {
    return getUserDetails().Name || '';
  };
  return (
    <Paper className={classes.parentRoot}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} className={classes.profileContainer}>
          <Box className={classes.rectangle} />
          <Box className={classes.profile}>
            <Box className={classes.circle}>{userParent.Name.charAt(0)}</Box>
            <Typography className={classes.studentName}>
              {userParent.Name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className={classes.heading}>
            {t('headings:Contact')}
          </Typography>
          <Divider className={classes.divider} />
          {userParent.Phone === 'null' || userParent.Phone === '' ? null : (
            <Link
              className={classes.plainLink}
              to="#"
              onClick={e => {
                window.location = `tel:+${userParent.Phone}`;
                e.preventDefault();
              }}
            >
              <div className={classes.divInfo}>
                <img className={classes.img} src={TelIcon} />
                <Typography className={classes.info}>
                  {userParent.Phone}
                </Typography>
              </div>
            </Link>
          )}

          {userParent.mail === 'null' || userParent.mail === '' ? null : (
            <Link
              to="#"
              onClick={e => {
                window.location = `mailto:${userParent.mail}`;
                e.preventDefault();
              }}
              className={classes.plainLink}
            >
              <div className={classes.divInfo}>
                <img className={classes.img} src={MailIcon} />
                <Typography className={classes.info}>
                  {userParent.mail}
                </Typography>
              </div>
            </Link>
          )}

          {userParent.address === 'null' || userParent.address === '' ? null : (
            <div className={classes.divInfo}>
              <img className={classes.img} src={MapIcon} />
              <Typography className={classes.info}>
                {userParent.address}
              </Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className={classes.heading}>
            {t('Change_Child')}
          </Typography>
          {userParent &&
            userParent.RelatedTO.map(el => {
              return (
                <Box
                  className={{
                    [classes.menuItemDiv]: true,
                    [classes.activeMenuItem]: el?.Name === getChildName(),
                  }}
                  onClick={() => {
                    handleChildren(el);
                  }}
                >
                  <div className={classes.av}>{el.Name.charAt(0)}</div>
                  <div style={{ marginLeft: 8 }}>
                    <div className={classes.titleName}>{el.Name}</div>
                  </div>
                </Box>
              );
            })}
        </Grid>
      </Grid>
    </Paper>
  );
}
