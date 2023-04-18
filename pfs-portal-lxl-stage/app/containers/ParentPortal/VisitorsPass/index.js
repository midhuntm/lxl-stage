import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TabContent from "./components/tabs";
import { Typography, Button } from '@material-ui/core';
import AddIcon from "../../../assets/Add.png";
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btn: {
    position: 'absolute',
    right: '0px',
    margin: '18px',
    border: `1px solid ${theme.palette.KenColors.neutral40}`,
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    paddingLeft: '0px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fonts: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
  },
  heading: {
    padding: '16px',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100
  }
}));



const VisitorsPass = () => {
  const classes = useStyles();
  const {t} = useTranslation();

  const authorizedVisitors = [
    {
      visitorName: 'Varsha Sree',
      purpose: 'Parents meeting',
      validTill: '01/10/2020',
    },
    {
      visitorName: 'Vanditha Zha',
      purpose: 'To pick up the kid',
      validTill: '01/10/2020',
    },
    {
      visitorName: 'Avantika Puri',
      purpose: 'Meeting with Prof. Awasthi',
      validTill: '01/10/2020',
    },
    {
      visitorName: 'Vijaya Saha',
      purpose: 'Parents Meeting',
      validTill: '01/10/2020',
    },
    {
      visitorName: 'Radhika Saraf',
      purpose: 'Parents meeting and to pick up the kid',
      validTill: '01/10/2020',
    },
    {
      visitorName: 'Ramesh Joshi',
      purpose: 'Meeting with Principal',
      validTill: '01/10/2020',
    },
  ];


  const visitorsHistory = [
    {
      visitorName: 'Kumar Singh',
      purpose: 'Parents meeting and to pick up the kid',
      visitDate: '01/08/2020',
    },
    {
      visitorName: 'Devika Nehe',
      purpose: 'Pick up the kid',
      visitDate: '12/05/2020',
    },
    {
      visitorName: 'Adnan Khan',
      purpose: 'Parents meeting',
      visitDate: '30/06/2020',
    },
    {
      visitorName: 'Arya Kapoor',
      purpose: 'Meeting with principal',
      visitDate: '01/02/2020',
    },
    {
      visitorName: 'Sandhya Sarin',
      purpose: 'Parents meeting and to pick up the kid',
      visitDate: '22/10/2019',
    },
    {
      visitorName: 'Priya Raut',
      purpose: 'Pick up the kid',
      visitDate: '30/10/2020',
    },
  ]


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <div style={{ position: 'relative', display: 'flex' }}>
              <Typography className={classes.heading}>{t("headings:Visitor_Pass")}</Typography>
              <Button className={classes.btn} color='primary'><img src={AddIcon} style={{ margin: ' 0px 8px' }} />{t("labels:New_Visitor")}</Button>

              {/* <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <>
                    <Button className={classes.btn} color='primary'  {...bindTrigger(popupState)}><img src={AddIcon} style={{ margin: ' 0px 8px' }} />New Visitor</Button>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <Box p={2}>
                      <Grid container spacing={3} >
                          <Grid item xs={12}>
                            <Typography>ADD NEW VISITOR</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Visitor Name</Typography>
                            <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Valid Till</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Purpose</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Popover>
                  </>
                )}
              </PopupState> */}
            </div>

            <TabContent
              authorizedVisitors={authorizedVisitors}
              visitorsHistory={visitorsHistory}
              loading={false}
            ></TabContent>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default VisitorsPass;