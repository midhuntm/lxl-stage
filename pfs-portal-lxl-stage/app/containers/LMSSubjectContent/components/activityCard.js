import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KenIcon from '../../../global_components/KenIcon';

import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import CallMadeIcon from '@material-ui/icons/CallMade';
import SubjectIcon from '@material-ui/icons/Subject';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';
import DescriptionIcon from '@material-ui/icons/Description';
import { useHistory } from 'react-router-dom';

// icons
const ExcelIcon =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/excelIcon.svg';
const WordIcon =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/lms-wordFile-icon.png';
const URLIcon =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/link-icon.svg';
const useStyles = makeStyles(theme => ({
  primaryText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#061938',
  },
  secondaryText: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#7A869A',
    paddingLeft: '4px',
  },
  secondaryTextDanger: {
    fontSize: '12px',
    fontWeight: 600,
    paddingLeft: '4px',
    color: 'red',
  },
  primaryActionText: {
    color: '#092682',
    paddingRight: '4px',
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
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
  divider: {
    margin: '16px',
  },
}));

export default function ActivityCard(props) {
  const {
    variant,
    primaryText,
    actionText,
    secondaryActionText,
    subjectName,
    className,
    handleAction,
    item,
    isOverDue = false,
    time,
    marks,
    subject,
    section,
  } = props;
  const classes = useStyles();
  //   const { t } = useTranslation();
  const [cardColor, setCardColor] = useState();
  const [icon, setIcon] = useState();
  const history = useHistory();

  useEffect(() => {
    if (variant) {
      switch (variant) {
        case 'assessment': {
          setCardColor({
            dark: '#704FE1',
            medium: '#BDA9FE',
            light: '#F4EFFF',
            text: '#997AFF',
          });
          setIcon(AssessmentIcon);
          break;
        }

        case 'assignment': {
          setCardColor({
            dark: '#555DB5',
            medium: '',
            light: '#dfefff',
            text: '',
          });
          setIcon(AssignmentIcon);
          break;
        }

        case 'ppt': {
          setCardColor({
            dark: '#1CAEE4',
            medium: '',
            light: '#e3f8ff',
            text: '',
          });
          setIcon(SlideshowIcon);

          break;
        }

        case 'pdf': {
          setCardColor({
            dark: '#E75D3B',
            medium: '',
            light: '#ffeae4',
            text: '',
          });
          setIcon(PictureAsPdfIcon);

          break;
        }

        case 'video': {
          setCardColor({
            dark: '#C29705',
            medium: '',
            light: '#fff4cf',
            text: '',
          });
          setIcon(PlayCircleFilledIcon);
          break;
        }

        case 'excel': {
          setCardColor({
            dark: '#185c37',
            medium: '#33c481',
            light: '#cbf0df',
            text: '',
          });
          setIcon(ExcelIcon);

          break;
        }

        case 'word': {
          setCardColor({
            dark: '#073d92',
            medium: '#277dd4',
            light: '#dae9f4',
            text: '',
          });
          setIcon(WordIcon);

          break;
        }

        case 'url': {
          setCardColor({
            dark: '#704FE1',
            medium: '#BDA9FE',
            light: '#F4EFFF',
            text: '#997AFF',
          });
          setIcon(URLIcon);

          break;
        }

        case 'text':
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
  const previewResource = selectedItem => {
    let type = 'ppt';
    if (selectedItem?.type == 'text') {
      type = 'excel';
    } else if (selectedItem?.type == 'video') {
      type = 'mp4';
    } else {
      type = selectedItem?.type;
    }
    let sectionDataSend = {
      accountname: subject,
      Section: section,
      hed__Course__cName: subject,
    };
    history.push({
      pathname: '/presentationPreview',
      state: {
        resourceId: Number(selectedItem?.id),
        previewType: type,
        sectionDataSend: sectionDataSend,
        origin: 'lms-dashboard',
      },
    });
  };

  return (
    <Box width="100%">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={1}>
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
                iconType={
                  icon === ExcelIcon || icon === WordIcon || icon === URLIcon
                    ? 'img'
                    : 'icon'
                }
                icon={icon}
                styles={{ color: cardColor?.dark }}
                variant={
                  icon === ExcelIcon || icon === WordIcon
                    ? 'extraSmall'
                    : 'medium'
                }
              />
            )}
          </Avatar>
        </Grid>
        <Grid item xs={12} md={11} container spacing={1}>
          <Grid item xs={8} container>
            <Grid item xs={12} className={classes.noWrap}>
              <Typography
                component="span"
                className={classes.primaryText}
                style={{
                  cursor:
                    variant !== 'assignment' && variant !== 'assessment'
                      ? 'pointer'
                      : 'inherit',
                }}
                onClick={() => {
                  if (variant !== 'assignment' && variant !== 'assessment') {
                    previewResource(item);
                  }
                }}
              >
                {primaryText}
              </Typography>
            </Grid>
            {time && marks && (
              <Grid item xs={12}>
                <Box maxWidth="100%" className={classes.noWrap}>
                  {/* <KenIcon
                  iconType="icon"
                  icon={SubjectIcon}
                  styles={{ color: '#7A869A' }}
                /> */}
                  <Typography
                    component="span"
                    className={classes.secondaryText}
                  >
                    {time}
                  </Typography>
                  <Typography component="span" className={classes.divider} />

                  <Typography
                    component="span"
                    className={classes.secondaryText}
                  >
                    {marks}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
          <Grid item xs={4} container style={{ textAlign: 'right' }}>
            <Grid item xs={12}>
             
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
                {/* {variant === 'assignment' || variant === 'assessment' ? ( ) : (
                <> */}
                  {/* {item?.fileurl && (
                    <a
                      href={`${item?.fileurl}?token=${localStorage.getItem(
                        'fileToken'
                      )}`}
                      download
                      target="_blank"
                      className={classes.link}
                    >
                      <IconButton style={{ width: '40px', height: '40px' }}>
                        <KenIcon
                          iconType="icon"
                          icon={GetAppIcon}
                          styles={{ cursor: 'pointer' }}
                        />
                      </IconButton>
                    </a>
                  )} */}
                {/* </>
              )} */}
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
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
