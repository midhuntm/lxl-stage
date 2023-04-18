import React, { useState, useEffect } from 'react';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { Grid, Typography, Box, Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KenIcon from '../../../../../global_components/KenIcon';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SubjectIcon from '@material-ui/icons/Subject';
import DescriptionIcon from '@material-ui/icons/Description';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { FiBook } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  primaryText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#061938',
    paddingLeft: '10px',
  },
  secondaryText: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#7A869A',
    paddingLeft: '10px',
  },
  subTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#7A869A',
    paddingLeft: '10px',
  },
  secondaryTextDanger: {
    fontSize: '12px',
    fontWeight: 600,
    paddingLeft: '10px',
    color: 'red',
  },
  primaryActionText: {
    color: '#092682',
    paddingRight: '10px',
  },
  medium: {
    width: "47px",
    height: "47px",
  },
  link: {
    color: '#000000',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.KenColors.primary,
    },
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export default function ActivityCard(props) {
  const { variant, title, subTitle, secondaryText } = props;
  const classes = useStyles();
  const [cardColor, setCardColor] = useState();
  const [icon, setIcon] = useState();

  
  useEffect(() => {
    if (variant) {
      switch (variant) {
        case 'fun': {
          setCardColor({
            dark: '#7D5CCE',
            medium: '#BDA9FE',
            light: '#F4EFFF',
            text: '#997AFF',
          });
          setIcon(TagFacesIcon);
          break;
        }

        case 'action': {
          setCardColor({
            dark: '#039AD2',
            medium: '',
            light: '#E7F8FF',
            text: '',
          });
          setIcon(DirectionsRunIcon);
          break;
        }

        case 'film': {
          setCardColor({
            dark: '#C29705',
            medium: '',
            light: '#fff4cf',
            text: '',
          });
          setIcon(PlayCircleFilledIcon);
          break;
        }

        default: {
          setCardColor({
            dark: '#FF9D54',
            medium: '#FFD2B0',
            light: '#fff6ef',
            text: '#FF9D54',
          });
          setIcon(DescriptionIcon);
          break;
        }
      }
    }
  }, [variant]);


  const history = useHistory();

  const Movetonext = () => {
    history.push('/academicContent');
  };
  return (
    <Box width="100%"  >
      <Grid container spacing={4} alignItems="center"  onClick={Movetonext}>
        <Grid item xs={2}>
          <Avatar
            style={{
              backgroundColor: cardColor?.light,
              color: cardColor?.dark,
            }}
            variant="rounded"
            className={classes.medium}
          >
            {icon && (
              <KenIcon
                iconType="icon"
                icon={icon}
                styles={{ color: cardColor?.dark }}
                variant="large"
              />
            )}
          </Avatar>
        </Grid>
        <Grid item xs={10} container spacing={1}>
          <Grid item xs={12} container>
            <Grid item xs={12} className={classes.noWrap}>
              <Typography component="span" className={classes.primaryText}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box maxWidth="100%" className={classes.noWrap}>
                {/* <KenIcon
                  iconType="icon"
                  icon={SubjectIcon}
                  styles={{ color: '#7A869A' }}
                /> */}
                <Typography
                  component="span"
                  className={classes.subTitle}
                  //   noWrap
                >
                  Grade 6
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box maxWidth="100%" className={classes.noWrap}>
                &nbsp;&nbsp;
                <KenIcon
                  iconType="icon"
                  icon={FiBook}
                  styles={{ color: '#7A869A' }}
                />
                <Typography
                  component="span"
                  className={classes.secondaryText}
                  //   noWrap
                >
                  {secondaryText}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {/* <Grid item xs={4} container style={{ textAlign: 'right' }}>
            <Grid item xs={12}>
              {variant === 'assignment' || variant === 'assessment' ? (
                <Box
                  onClick={() => handleAction(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <Typography
                    className={`${classes.primaryText} ${
                      classes.primaryActionText
                    }`}
                    component="span"
                  >
                    {actionText}
                  </Typography>
                  {actionText && (
                    <KenIcon iconType="icon" icon={CallMadeIcon} />
                  )}
                </Box>
              ) : (
                <>
                </>
              )}
            </Grid>

            {(variant === 'assignment' || variant === 'assessment') && (
              <Grid item xs={12}>
                <Box>
                  <Typography
                    className={
                      isOverDue
                        ? classes.secondaryTextDanger
                        : classes.secondaryText
                    }
                  >
                    {secondaryActionText}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid> */}
        </Grid>
      </Grid>
      <Divider style={{margin:"10px 0px"}}/>
    </Box>
  );
}
