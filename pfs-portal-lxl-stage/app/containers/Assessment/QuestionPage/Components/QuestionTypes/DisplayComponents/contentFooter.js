import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenHeader from '../../../../../../global_components/KenHeader';
import KenButton from '../../../../../../global_components/KenButton';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

const useStyles = makeStyles(theme => ({
  addedQuestionHeader: {
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    // padding: 16,
  },
  title: {
    fontSize: '14px',
    marginLeft: '5px',
  },
  button: {
    margin: '0px 4px',
  },
}));

export default function ContentFooter(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleSubmit, handleEdit, handleCancel, edit, submit } = props;

  return (
    <Box className={classes.addedQuestionHeader}>
      <KenHeader>
        {submit && (
          <KenButton
            buttonClass={classes.button}
            label={<Typography style={{ fontSize: '12px' }}>Cancel</Typography>}
            variant="secondary"
            onClick={handleCancel}
          />
        )}
        {edit && (
          <KenButton
            buttonClass={classes.button}
            label={
              <Typography style={{ fontSize: '12px' }}>
                Edit Question
              </Typography>
            }
            variant="secondary"
            onClick={handleEdit}
          />
        )}
        {submit && (
          <KenButton
            buttonClass={classes.button}
            label={
              <Typography style={{ fontSize: '12px' }}>
                Save and Finish
              </Typography>
            }
            variant="primary"
            onClick={handleSubmit}
          />
        )}
      </KenHeader>
    </Box>
  );
}
