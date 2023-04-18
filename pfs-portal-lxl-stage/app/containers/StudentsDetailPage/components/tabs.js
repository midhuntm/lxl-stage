import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, Box, Card, Typography } from '@material-ui/core';
import SubjectCard from '../../../components/CardWidgets/subject';
import GraphCard from '../../../components/CardWidgets/graph';
import { useTranslation } from 'react-i18next';
import DownloadReportCard from '../../../components/CardWidgets/downloadReportCard';
import AcademicDetailsCards from '../components/academicDetailsCards.js'
import KenSelect from '../../../components/KenSelect';
import { el } from 'date-fns/locale';

const useStyles = makeStyles(theme => ({
  // root: {
  //     flexGrow: 1,
  //     minWidth: '70vw'
  // },
  detailTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
    padding: '16px 0px 0px 16px',
  },
  detailTitle1: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
  },
  root1: {
    marginTop: theme.spacing(2),
  },
  // subjectCard: {
  //     minWidth: '70vw',
  // },
  border: {
    borderLeft: `3px solid ${theme.palette.KenColors.primary}`,
    borderRadius: 4,
  },
  scrollWrap: {
    // maxHeight: '50vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
}));

function TabPanel(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { children, value, data, index, ...other } = props;
  const [subject, setSubject] = React.useState(data[0].hed__Course__cName);
  const handleClick2 = (event, data) => {
    props.onSelect(event, data);
    setSubject(data.hed__Course__cName);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {/* <Box mt={2} mb={2} className={classes.subjectCard}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12} key={index}>
                  <DownloadReportCard title={data[0]?.hed__Term__c || ''} />
                </Grid>
              </Grid>
            </Card>
          </Box> */}
          <Box mt={2} mb={2} className={classes.subjectCard}>
            <Card>
              <Box p={2}>
                <Typography className={classes.detailTitle1}>
                  {t('headings:Subjects')}
                </Typography>

                <Grid className={classes.root1} container spacing={2}>
                  {data.map((elem, index) => {
                    return (
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        key={index}
                        onClick={e => {
                          handleClick2(e, elem);
                        }}
                      >
                        <div
                          className={
                            subject === elem.hed__Course__cName
                              ? classes.border
                              : null
                          }
                        >
                          <SubjectCard data={elem} />
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Card>
          </Box>
        </>
      )}
    </div>
  );
}

export default function CenteredTabs(props) {
  const classes = useStyles();
  const datakeys = Object.keys(props.value);
  const data = props.value;
  const [notificationCardData, setNotificationCardData] = React.useState();
  const [subject, setSubject] = React.useState('');
  const [opts,setopts] =React.useState([]);
  const [value, setValue] = React.useState(datakeys[0]);
  const [selectedData, setSelectedData] = React.useState();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (Array.isArray(data[0])) {
      setNotificationCardData(data[0][0]);
    }
  }, [props]);

  const handleClick = (event, data, boolean) => {
    setNotificationCardData(data);
  };

  const handleChange = (event) => {
    
    setValue(event.target.value);
    console.log("data",data)
  };
  const handleClick2 = (event, data) => {
    // props.onSelect(event, data);
    setSubject(data.hed__Course__cName);
  };
  useEffect(() =>{
   let opts=[]
   datakeys.forEach(el =>{
      opts.push({
        label:el,
        value:el
      })
    })
  setopts(opts)
  },[])
  useEffect(() =>{
   let selectedData =  data[value].map(el=>{ return el})
   setSelectedData(selectedData)
   setSubject(selectedData.hed__Course__cName);
   },[value])


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper square className={classes.root}>
          {/* <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            {datakeys.map((el, index) => {
              return <Tab key={index} label={el} />;
            })}
          </Tabs> */}
        </Paper>

        {/* {data.map((el, index) => {
          return (
            <TabPanel
              key={index}
              value={value}
              data={el}
              onSelect={handleClick}
              index={index}
            />
          );
        })} */}
         <Box mt={2} mb={2} className={classes.subjectCard}>
            <Card>
              <Box p={2}>
                <Typography className={classes.detailTitle1}>
                  {t('headings:Subjects')}
                </Typography>
                <Grid className={classes.root1} container spacing={2}>
                <KenSelect
                // required={true}
                options={opts}
                value={value}
                onChange={e => {
                  handleChange(e);
                }}
              />
                </Grid>

                <Grid className={classes.root1} container spacing={2}>
                  {selectedData && (selectedData.map((elem, index) => {
                    return (
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        key={index}
                        onClick={e => {
                          handleClick2(e, elem);
                        }}
                      >
                        <div
                          className={
                            subject === elem.hed__Course__cName
                              ? classes.border
                              : null
                          }
                        >
                          <SubjectCard data={elem} />
                        </div>
                      </Grid>
                    );
                  }))}
                </Grid>
              </Box>
            </Card>
          </Box>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.scrollWrap}>
        {/* {notificationCardData && <GraphCard data={notificationCardData} />} */}
        {/* {notificationCardData && <AcademicDetailsCards  data={notificationCardData}/> } */}
        <AcademicDetailsCards  data={notificationCardData}/>
      </Grid>
    </Grid>
  );
}
