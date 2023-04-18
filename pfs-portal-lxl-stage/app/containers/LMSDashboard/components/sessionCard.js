import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from '../../AcademicDashboard/components/Progress';
import KenIcon from '../../../global_components/KenIcon';
import KenMultiColorLinearProgressBar from '../../../global_components/KenMultiColorLinearProgressBar';
import DataList from './dataList';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import LinearProgressBar from './linearProgress';
import KenChart from '../../../global_components/KenChart';
// import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    height: '100%',
  },
  border: {
    borderBottom: '1px solid #F4F5F7',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    paddingLeft: '10px',
  },
}));

export default function SessionCard(props) {
  const {
    icon,
    title,
    iconVariant,
    variant,
    data,
    progressData,
    type,
    sessionChartData,
    chart = false,
  } = props;
  const classes = useStyles();
  const [cardColor, setCardColor] = useState();
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    if (variant) {
      switch (variant) {
        case 'purple': {
          setCardColor({
            dark: '#704FE1',
            medium: '#BDA9FE',
            light: '#f1eefc',
            text: '#997AFF',
          });
          return;
        }

        case 'orange':
        default: {
          setCardColor({
            dark: '#FF9D54',
            medium: '#FFD2B0',
            light: '#fff6ef',
            text: '#FF9D54',
          });
          return;
        }
      }
    }
  }, [variant]);

  const getColor = type => {
    let color = '';
    switch (type) {
      case 'dark':
        color = cardColor?.dark;
        break;
      case 'medium':
        color = cardColor?.medium;
        break;
      case 'light':
        color = cardColor?.light;
        break;
      case 'text':
        color = cardColor?.text;
        break;

      default:
        color = cardColor?.text || '';
        break;
    }
    return color;
  };

  useEffect(() => {
    if (data) {
      let obj;
      let array = [];
      data?.map((item, index) => {
        obj = {
          value: item.value,
          iconType: 'icon',
          listIcon: FiberManualRecordRoundedIcon,
          primaryText: item.label,
          color: getColor(item.color),
          //   secondaryText,
        };
        array.push(obj);
      });

      setDataArray(array);
    }
  }, [data, cardColor]);

  return (
    <Paper className={classes.paper} elevation={1}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.left}>
          {typeof icon === 'string' ? (
            <KenIcon
              iconType="img"
              icon={icon}
              styles={{ color: cardColor?.text }}
            />
          ) : (
            <KenIcon
              icon={icon}
              variant={iconVariant}
              styles={{ color: cardColor?.text }}
            />
          )}
          <Typography
            component="span"
            className={classes.title}
            style={{ color: cardColor?.text }}
          >
            {title}
          </Typography>
        </Grid>
        {chart === true ? (
          <>
            <Grid item xs={12}>
              <KenChart data={sessionChartData} title={title} />
            </Grid>
          </>
        ) : (
          <>
            {' '}
            <Grid item xs={12}>
              {progressData !== undefined && cardColor && (
                <LinearProgressBar
                  value={progressData}
                  barBackgroundColor={cardColor?.dark}
                  bottomBackgroundColor={cardColor?.medium}
                  //   bottomBackgroundColor={
                  //     type === 'session' ? cardColor?.medium : cardColor?.light
                  //   }
                  height={'8px'}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <DataList data={dataArray} />
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
}
