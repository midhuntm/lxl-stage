import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CssBaseline, Grid, Divider, Button, Typography } from '@material-ui/core';
import zoom from '../../assets/zoom-icon.png';
// import VideocamIcon from '@material-ui/core/icons/Videocam';
import KenButton from '../../global_components/KenButton';
const useStyles = makeStyles(theme => ({
  workshopCard: {
    backgroundColor: '#ffff',
    height: '100%',
    width: '100%',
  },
  image: {
    height: '280px',
    width: '100%',
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
  title: {
    fontFamily: 'work Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '30px',
    color: '#000000',
  },
  dateValue:{
    fontFamily:'Work Sans',
    fontStyle :'normal',
    fontWeight : 500,
    fontSize : '16px',
    color : '#000000'
  },
  date :{
    fontFamily:'Work Sans',
    fontStyle :'normal',
    fontWeight : 500,
    fontSize : '12px',
    color : '#000000',
    textTransform:'uppercase'
  }
}));
export default function Workshop() {
  const classes = useStyles();
  const location = useLocation();
  console.log(location, 'location');
  const { image, title, subTitle ,date,time} = location.state.state;
  console.log(title, 'image');

  return (
    <div className={classes.workshopCard}>
      <img src={image} className={classes.image} />
      <div style={{ padding: '30px 30px 30px 30px' }}>
        <Grid
          container
          style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}
        >
          <Grid item lg={9}>
            <div style={{ display: 'flex',gap:'3',alignItems:'center',height:'72px' }}>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:'1px solid #000',width:'50px',borderRadius:'5px',height:'70px'}}>
                <main style={{fontSize:'40px',fontWeight:600,color: '#000000'}}>12</main>
                <main style={{fontSize:'12px',fontWeight:600,color: '#000000'}}>oct</main>
              </div>
              <div style={{marginLeft:'10px'}}>
                <h2>{title}</h2>
              </div>
            </div>
          </Grid>
          <Grid item lg={3}>
            <div>
              <img src={zoom} className={classes.zoomImage}/>
              <button className={classes.button}>Join Zoom Meeting</button>
            </div>
          </Grid>
        </Grid>
        <div style={{ marginTop: '20px' }} />
        <Divider />
            <Grid container direction='row' style={{marginTop:'10px'}}>
              <Grid item lg={2}>
                  <Typography className={classes.date}>DATE</Typography>
                  <Typography className={classes.dateValue}>{date}</Typography>
              </Grid>
                <Grid item lg={2}>
                    <Typography className={classes.date}>TIMING</Typography>
                    <Typography className={classes.dateValue}>{time}</Typography>
                </Grid>
                  <Grid item lg={2}>
                    <Typography className={classes.date}>DURATION</Typography>
                    <Typography className={classes.dateValue}>3 hours</Typography>
                  </Grid>
                    <Grid item lg={2}>
                      <Typography className={classes.date}>CATEGORIES</Typography>
                      <div style={{display:'flex'}}>
                        <div style={{border:'1px solid black',borderRadius:'10px',height:'20px',width:'100px',display:'flex',alignItems:'center'}}>
                            personality skill
                        </div>
                            <div  style={{border:'1px solid black',borderRadius:'5px',height:'20px',width:'100px',display:'flex'}}>
                                presentation skill
                            </div>
                      </div>      
                    </Grid>
            </Grid>
      </div>
    </div>
  );
}
