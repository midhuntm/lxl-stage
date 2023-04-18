import {
  AppBar,
  Button,
  Card,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Tab,
  Tabs,
  Box,
} from '@material-ui/core';
import './index.css';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import image1 from '../../assets/learningmodule.png';
import zoom from '../../assets/zoom-icon.png';
import KenButton from '../../global_components/KenButton';
import KenTabs from '../../components/KenTabs';
import SearchBox from '../../global_components/SearchBox';
import { FiFilter } from 'react-icons/fi';
import MonthlyWorkshop from './MonthlyWorkshop';
const useStyles = makeStyles(theme => ({
  appBar1: {
    width: '100%',
    height: '40px',
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  headerTag1: {
    marginLeft: '20px',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  images: {
    backgroundImage: `url(${image1})`,
    height: '360px',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // backgroundPosition:'center',
    borderRadius: '12px 12px 0px 0px',
  },
  imageline: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  line: {
    marginTop: '15px',
  },
  imageContent: {
    marginTop: '60px',
    marginLeft: '30px',
    fontWeight: '600px',
    fontSize: '36px',
  },
  zoomImage: {
    height: '30px',
    width: '30px',  
    marginLeft: '30px',
    marginTop: '5px',
  },
  button: {
    backgroundColor: '#4A8CFF',
    height: '42px',
    width: '218px',
    border: 'none',
    color: 'white',
    padding: '13px, 32px, 13px, 32px',
    borderRadius: '4px',
    marginLeft: '10px',
  },
  workshop: {
    backgroundColor: 'white',
    height: '30%',
    width: '100%',
  },
  imagediv: {
    width: '100%',
    height: '490px',
    backgroundColor: 'white',
    borderRadius: '10px',
  },
  search: {
    width: '200px',
  },
  input: {
    height: '40px',
    width: '250px',
    border: 'none',
    borderRadius: '5px',
  },
}));
export default function index() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const drawerWidth = 240;
  return (
    <div>
      <Paper elevation={0} style={{ height: '40px', width: '100%' }}>
        <h3 className={classes.headerTag1}>
          <b>Live Workshop</b>
        </h3>
      </Paper>
      <div className={classes.line} />
      <div className={classes.imagediv}>
        <div className={classes.images}>
          <Grid container sm={12} md={12} direction="row">
            <Grid item sm={6} md={6}>
              <h1 className={classes.imageContent}>
                <b>
                  VAP(Live Workshop by <br />
                  Sashi for April)
                </b>
              </h1>
              <Grid style={{ display: 'flex' }}>
                <img src={zoom} className={classes.zoomImage} />
                <button className={classes.button}>Join Zoom Meeting</button>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Grid
          container
          md={12}
          sm={12}
          style={{ display: 'flex', marginTop: '20px' }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '30px',
            }}
            md={3}
          >
            <Typography style={{color:'#000000'}}>
              <b>Date</b>
            </Typography>
            <Typography style={{color:'#000000'}}>05 april 2023 to 09 april 2023</Typography>
          </Grid>
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '30px',
            }}
            md={3}
          >
            <Typography style={{color:'#000000'}}>
              <b>Timing</b>
            </Typography>
            <Typography style={{color:'#000000'}}>09:00 AM to 01:00 PM</Typography>
          </Grid>
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '30px',
            }}
            md={3}
          >
            <Typography style={{color:'#000000'}}>
              <b>About the Workshop</b>
            </Typography>
            <Typography style={{color:'#000000'}}>
              Lorem ipsum is a dummy text to lorem ipsum is a dummy text and
              lorem ipsum.m
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.line} />

      <TabContext value={value} >
        <Paper>
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            <Tab label="Monthly Workshop" value='1'/>
            <Tab label="Articles & Videos" value="2" />
            <Tab label="Certificate Program" value="3" />
          </TabList>
        </Paper>
        <div className={classes.line} />
        <div style={{ display: 'flex',justifyContent:'space-between',width:'100%' }}>
          <div style={{display:'flex',gap:'2'}}>
            <input
              type="text"
              placeholder="search by workshop name"
              className={classes.input}
            />
            <div style={{backgroundColor: 'white',marginLeft: '15px',width: '100px',borderRadius: '5px',display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: '10px 10px 10px 10px',}}>
              Filter{' '}
              <div>
                <FiFilter style={{ fontSize: 'medium', cursor: 'initial' }} />
              </div>
            </div>
          </div>
          <div>
            <KenButton variant="primary">View More</KenButton>
          </div>
        </div>
        <TabPanel value="1"><MonthlyWorkshop/></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
}
