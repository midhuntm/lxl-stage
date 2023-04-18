import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenInputField from '../../../../../components/KenInputField/index';
import { initial, values } from 'lodash-es';
import Chip from '@material-ui/core/Chip';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.KenColors.neutral10,
    padding: 16,
  },
  header: {
    color: theme.palette.KenColors.neutral900,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
  },
  wrap: {
    marginBottom: 24,
  },
  tagLabel: {
    fontSize: 12,
    color: theme.palette.KenColors.neutral400,
    marginBottom: 4,
  },
  inputBaseClass: {
    background: theme.palette.KenColors.kenWhite,
  },
  chipList: {
    listStyle: 'none',
    marginTop: 8,
    marginLeft: 8,
  },
  chipWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  addLabel: {
    fontStyle: 'italic',
  },
  chipRoot: {
    fontSize: 12,
    color: theme.palette.KenColors.primary,
    background: theme.palette.KenColors.neutral41,
  },
  deleteChipIcon: {
    color: theme.palette.KenColors.primary,
    '&:hover': {
      color: theme.palette.KenColors.primary,
    },
  },
}));

export default function Tags(props) {
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const [initialData, setInitialData] = React.useState('');

  const [updatedData, setUpdatedData] = React.useState([]);

  const handleDelete = chipToDelete => () => {
    const arr = updatedData.filter((item, i) => item.text !== chipToDelete)
    setFieldValue('tags', arr)
    setUpdatedData(arr)
  };

  const handleKeypress = event => {
    if (event.charCode === 13 && initialData.length !== 0) {
      let obj = { "text": initialData }
      const arr = updatedData.concat(obj)
      setTimeout(() => {
        setFieldValue('tags', arr)
        setUpdatedData(arr);
        setInitialData('');
      }, 100);
      event.preventDefault();
    }
  };

  console.log(initialData, 'initial', updatedData);

  return (
    <Box className={classes.container} mt={2}>
      <Typography className={classes.header}>{t('labels:Tags')}</Typography>
      <Grid md={8} xs={8} className={classes.wrap}>
        <KenInputField
          value={initialData}
          label={
            <Typography className={classes.tagLabel}>{t('labels:Tags')}{' '}
              <span className={classes.addLabel}> {`${t('messages:Press_Enter_To_Add')}`}  </span>
            </Typography>
          }
          placeholder="Type to add tags"
          // onChange={handleChange}
          onKeyPress={handleKeypress}
          inputBaseRootClass={classes.inputBaseClass}
          setFieldTouched={setFieldTouched}
          name="tags"
          onChange={(e) => {
            let text = String(e.target.value);
            if (text.replace(/\s+/g, '').length !== 0) {
              setInitialData(e.target.value);
            }
          }}
          errors={errors?.tags}
          touched={touched?.tags}
        />
        <Box className={classes.chipWrap}>
          {updatedData?.map((data, i) => {
            return (
              <li key={data.text} className={classes.chipList}>
                <Chip
                  classes={{
                    root: classes.chipRoot,
                    deleteIcon: classes.deleteChipIcon,
                  }}
                  label={data.text}
                  onDelete={handleDelete(data.text)}
                  className={classes.chip}
                />
              </li>
            );
          })}
        </Box>
      </Grid>
    </Box>
  );
}
