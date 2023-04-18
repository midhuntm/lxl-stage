import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  text: {
    fontWeight: 600,
    fontSize: '12px',
  },
  container: {
    width: 'fit-content',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    marginRight: '8px',
    // height: '24px',
    // width: '24px',
    borderRadius: '50%',
    textAlign: 'center',
    padding: '5px',
  },
  icon: {
    height: '15px',
    width: '15px',
  },
  content: {
    backgroundColor: '#EEF7FF',
    padding: '16px',
    width: 'fit-content',
  },
  concat: {
    textAlign: 'center',
    margin: '8px 0px',
  },
}));

export default function OptionCardContent(props) {
  const classes = useStyles();
  const { data } = props;

  const Content = ({ textColor, bgColor, icon, text, borderColor }) => {
    return (
      <Box
        data-testid="custom-content"
        className={classes.container}
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor || textColor}`,
          padding: icon ? '5px 10px' : '10px',
        }}
      >
        {icon && (
          <Box className={classes.iconContainer} data-testid="custom-icon">
            {icon}
          </Box>
        )}
        <Typography
          className={classes.text}
          style={{ color: textColor }}
          data-testid="custom-text"
        >
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Box className={data?.length > 1 ? classes.content : ''}>
        {Array.isArray(data) &&
          data.length > 0 &&
          data?.map(
            ({ textColor, bgColor, icon, text, borderColor, concatWith }) => {
              return (
                <Box>
                  <Content
                    textColor={textColor}
                    bgColor={bgColor}
                    icon={icon}
                    text={text}
                    borderColor={borderColor}
                  />
                  {concatWith && (
                    <Box
                      className={`${classes.concat} ${classes.text}`}
                      data-testid="custom-concat"
                    >
                      {concatWith}
                    </Box>
                  )}
                </Box>
              );
            }
          )}
      </Box>
    </>
  );
}
