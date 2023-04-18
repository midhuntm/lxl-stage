import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Box } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import ClassListTermWise from '../../../../global_components/KenClassList/ClassListTermWise';
import KenSelect from '../../../../components/KenSelect';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
  newLink: {
    fontSize: '11px',
    lineHeight: '22px',
    spacing: 8,
    color: theme.palette.KenColors.primary,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  ContentFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '120%',
    color: '#061938',
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ContentBreadcrumbs() {
  const classes = useStyles();
  const [courseOfferingId, setCourseOfferingId] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const { t } = useTranslation();
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    setAge(event.target.value);
  };
  const getSelectedSection = section => {
    setSelectedSection(section);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={3} sm={12} xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              className={classes.newLink}
              variant="body2"
              href="#"
              onClick={handleClick}
            >
              GRADES
            </Link>
            <Link
              className={classes.newLink}
              variant="body2"
              href="#"
              onClick={handleClick}
            >
              CLASS VIII-A
            </Link>

            <Typography className={classes.newLink} variant="body2">
              {' '}
              MY CLASSES
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item md={9} sm={12} xs={12}>
          <></>
        </Grid>
      </Grid>

      {/* <Grid>
      <ClassListTermWise
            title={'Content'}
            listTitle={t('headings:Your_Subjects')}
            listSubTitle={t('headings:Your_Sections')}
            getSelectedSection={getSelectedSection}
          />
      </Grid> */}
    </div>
  );
}


