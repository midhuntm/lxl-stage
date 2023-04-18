import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Avatar, Typography } from '@material-ui/core';
import KenIcon from '../../global_components/KenIcon';
import { Link } from 'react-router-dom';

function DashboardCard(props) {
  const {
    title,
    variant,
    icon,
    iconType,
    shortTitle,
    rgbaColor,
    backgroundColor,
    redirectUrl,
    handlePopoverClose,
  } = props;

  const lightColor = `rgb(${rgbaColor?.r}, ${rgbaColor?.g}, ${rgbaColor?.b}, 0.1)`;
  const rgbColor = `rgba(${rgbaColor?.r}, ${rgbaColor?.g}, ${rgbaColor?.b}, ${rgbaColor?.a})`;
  const [screenSize, setScreenSize] = useState(window?.innerWidth);
  const [screenType, setScreenType] = useState('web');

  const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      borderRadius: '16px',
      '&:hover': {
        cursor: 'pointer',
      },
      padding: theme.spacing(2),
      paddingTop: theme.spacing(8),
      [theme.breakpoints.down('md')]: {
        height: 214,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(6),
      },
      [theme.breakpoints.down('xs')]: {
        height: 160,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(4),
      },
    },
    smallCard: {
      height: 100,
      borderRadius: '5px',
      padding: theme.spacing(1),
      paddingTop: theme.spacing(2),
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
    },
    avatarDefault: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      boxSizing: 'content-box',
      color: '#fff',
      backgroundColor: rgbColor,
      boxShadow: `${lightColor} 0px 0px 0px 8px`,
      [theme.breakpoints.down('md')]: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      [theme.breakpoints.down('xs')]: {
        boxShadow: `${lightColor} 0px 0px 0px 3px`,
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      boxSizing: 'content-box',
      color: '#fff',
    },
    center: {
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      padding: '16px 64px',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        fontSize: 13,
        fontWeight: 'normal',
      },
      [theme.breakpoints.between('xs', 'md')]: {
        padding: '0px',
      },
    },
    smallTitle: {
      fontSize: 13,
      fontWeight: 'normal',
      padding: '4px 2px',
    },
    titleContainer: {
      position: 'relative',
    },
    titleContainerDefault: {
      height: '140px',
      [theme.breakpoints.down('md')]: {
        height: '100px',
      },
      [theme.breakpoints.down('xs')]: {
        height: '80px',
      },
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    const handleWindowResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    if (screenSize >= 1280) {
      setScreenType('web');
    } else if (screenSize >= 1024 && screenSize < 1280) {
      setScreenType('laptop');
    } else if (screenSize >= 640 && screenSize < 1024) {
      setScreenType('tablet');
    } else {
      setScreenType('mobile');
    }
  }, [screenSize]);

  const getIconVariant = () => {
    console.log('screenType', screenType);
    switch (screenType) {
      case 'web':
        return 'extraLarge';
      case 'laptop':
        return 'large';
      case 'tablet':
        return 'medium';
      case 'mobile':
        return 'small';

      default:
        return 'large';
    }
  };

  const getCardByVariant = () => {
    let variantOfCard = variant;
    if (screenSize <= 300) {
      variantOfCard = 'small';
    }
    switch (variantOfCard) {
      case 'small':
        return (
          <Link
            to={redirectUrl}
            onClick={handlePopoverClose ? handlePopoverClose : () => null}
          >
            <Card
              className={`${classes.root} ${classes.smallCard}`}
              style={{
                backgroundColor: backgroundColor,
              }}
              elevation={0}
            >
              <Box className={classes.box}>
                <Avatar
                  alt="Remy Sharp"
                  style={{
                    backgroundColor: rgbColor,
                    boxShadow: `${lightColor} 0px 0px 0px 3px`,
                  }}
                  className={classes.small}
                >
                  <KenIcon
                    icon={icon}
                    variant="small"
                    iconType={iconType}
                    path={icon}
                  />
                </Avatar>
              </Box>
              <Typography
                className={classes.smallTitle}
                align="center"
                style={{
                  color: rgbColor,
                }}
              >
                {shortTitle}
              </Typography>
            </Card>
          </Link>
        );

      case 'medium':
      default:
        return (
          <Link
            to={redirectUrl}
            onClick={handlePopoverClose ? handlePopoverClose : () => null}
          >
            <Card
              className={classes.root}
              style={{
                backgroundColor: backgroundColor,
              }}
              elevation={0}
            >
              <Box className={classes.box}>
                <Avatar alt="Sharp" className={classes.avatarDefault}>
                  {screenType && (
                    <KenIcon
                      icon={icon}
                      variant={getIconVariant()}
                      iconType={iconType}
                      path={icon}
                    />
                  )}
                </Avatar>
              </Box>
              <Box
                className={`${classes.titleContainer} ${classes.titleContainerDefault}`}
              >
                <Typography
                  className={`${classes.center} ${classes.title}`}
                  align="center"
                  style={{
                    color: rgbColor,
                  }}
                >
                  {title}
                </Typography>
              </Box>
            </Card>
          </Link>
        );
    }
  };

  return <>{getCardByVariant()}</>;
}

export default DashboardCard;
