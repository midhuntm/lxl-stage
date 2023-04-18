import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ChemIcon from '../../assets/Chemistry2.png';
import { Grid } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/GetApp';
import KenButton from '../../global_components/KenButton';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minWidth: '33vw',
    // height: 56,
    padding: 16,
    border: `1px solid ${theme.palette.KenColors.neutral20}`,
    '&:hover': {
      //   cursor: 'pointer',
    },
  },
  img: {
    marginRight: 8,
  },
  startIcon: {
    height: '40px',
  },
  endIcon: {
    textAlign: 'right',
  },
  buttonGrid: {
    paddingTop: '20px',
    textAlign: 'right',
  },
}));

export default function DownloadReportCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Paper
      elevation={0}
      className={classes.root}
      data-testid="download-report-card"
    >
      <Grid container spacing={0} alignContent="center">
        <Grid item key="1" className={classes.endIcon} xs={12} md={9}>
          <List aria-label="download report card">
            <ListItem>
              <ListItemIcon>
                <img
                  src={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/Cards/Assesments.svg'}
                  className={classes.startIcon}
                  data-testid="assessment-image"
                />
              </ListItemIcon>
              <ListItemText primary={props.title} data-testid="program-name" />
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          key="2"
          // className={classes.endIcon}
          md={3}
          xs={12}
          className={classes.buttonGrid}
        >
          {/* <KenButton
            data-testid="download-button"
            label={t('labels:Download_Report_Card')}
            variant="secondary"
            startIcon={<DownloadIcon className={classes.img} />}
            size="small"
            onClick={() => console.log('downloading content!')}
          /> */}
        </Grid>
      </Grid>
    </Paper>
  );
}
