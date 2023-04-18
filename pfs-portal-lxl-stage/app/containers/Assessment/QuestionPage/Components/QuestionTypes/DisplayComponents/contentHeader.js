import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenHeader from '../../../../../../global_components/KenHeader';
import KenButton from '../../../../../../global_components/KenButton';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import KenIcon from '../../../../../../global_components/KenIcon';
import { TRANSACTIONS } from '../../../../../../utils/constants';

const useStyles = makeStyles(theme => ({
  addedQuestionHeader: {
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    // padding: 16,
  },
  title: {
    fontSize: '14px',
    marginLeft: '5px',
  },
}));

export default function ContentHeader(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { label, icon, handlePreview, preview } = props;

  return (
    <Box className={classes.addedQuestionHeader}>
      <KenHeader
        title={
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {icon && typeof icon === 'string' ? (
              <KenIcon iconType="img" icon={icon} variant="extraSmall" />
            ) : (
              <> {icon}</>
            )}
            <Typography className={classes.title}>
              {label || t('labels:Configure_Question')}
            </Typography>
          </Box>
        }
      >
        {preview && (
          <KenButton
            label={
              <Typography style={{ fontSize: '12px' }}>Preview</Typography>
            }
            startIcon={<VisibilityOutlinedIcon />}
            variant="secondary"
            onClick={handlePreview}
          />
        )}
      </KenHeader>
    </Box>
  );
}
