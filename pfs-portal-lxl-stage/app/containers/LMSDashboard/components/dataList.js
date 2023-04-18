import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KenIcon from '../../../global_components/KenIcon';

const useStyles = makeStyles(theme => ({
  iconRoot: {
    minWidth: 0,
  },
  primaryText: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize',
    color: '#7A869A',
    paddingLeft: '10px',
  },
  actionText: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#061938',
  },
}));

export default function DataList(props) {
  const { data = [] } = props;
  const classes = useStyles();
  //   const { t } = useTranslation();

  return (
    <Box>
      {data?.map(item => {
        return (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Box>
              <KenIcon
                iconType={item?.iconType}
                icon={item?.listIcon}
                styles={{ color: item?.color }}
              />
              <Typography component="span" className={classes.primaryText}>
                {item?.primaryText}:
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.actionText}>
                {' '}
                {item?.value}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
