import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  Grid,
  
} from '@material-ui/core';
import Routes from '../../utils/routes.json';
import React from 'react';
import Card1 from '../../assets/learningCard1.png';
import Card2 from '../../assets/learningCard2.png';
import Card3 from '../../assets/learningCard3.png';
import './index.css';
import clock from '../../assets/clock.png';
import calendar from '../../assets/calendar.png'
import { makeStyles } from '@material-ui/core/styles';
import KenButton from '../../global_components/KenButton';
import {useNavigate,useHistory,useLocation, Route} from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  monthlycard: {
    backgroundColor: '#ffff',
    boxShadow: '0px 1px 40px rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    height: '352px',
  },
  CardContent: {
    padding: '20px',
  },
  monthlytitle: {
    height: '35px',
    fontFamily: 'Work Sans',
    fontSize: '18px',
    fontWeight: 600,
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    color:'#000000'
  },
  monthlysubtitle:{
    height: '35px',
    fontFamily: 'Work Sans',
    fontSize: '12px',
    color:'#000000'
  }

}));
export default function MonthlyWorkshop() {
  const classes = useStyles();
  const cartItems = [
    {
      image: Card1,
      Title: 'First week of school by First week of school by First week of school by',
      subTitle: 'World Health day / Earth day / Autism awarness / Dance day',
      time: '03:00PM - 06:00PM',
      date: '10 April 2023 - 13 April 2023',
    },
    {
      image: Card2,
      Title: 'Integrating Technology into Curr',
      subTitle: 'International Labour day / Technology day / Mothers day',
      time: '03:00 PM - 06:00 PM',
      date: '10 May 2023 - 13 May 2023',
    },
    {
      image: Card3,
      Title: 'Integrating the Arts into curr',
      subTitle: 'Environment day / Fathers day / Music day',
      time: '03:00 PM - 06:00 PM',
      date: '10 June 2023 - 13 June 2023',
    },
  ];
  // const navigate = useNavigate();
  const history = useHistory();
  const handleClick = (image,title,subTitle,date,time) => {
    history.push(`${Routes.workshop}`,{state:{image:image,title:title,subTitle:subTitle,date:date,time:time}})
  }
  return (
    <Grid container style={{ marginTop: '20px' }} spacing={2}>
      {cartItems.map((item, index) => (
        <Grid item md={4} sm={2}>
          <div className={classes.monthlycard}>
            <img src={item?.image} style={{ height: '120px', width: '100%' }} />
            <div className={classes.CardContent}> 
                <div className={classes.monthlytitle}>{item?.Title}</div>
                  <div className={classes.monthlysubtitle}>
                    {item?.subTitle}
                  </div>
                    <div  style={{display:'flex',alignItems:'center'}}>
                      <img src={clock} />
                      <div style={{marginLeft : '5px',color : '#565656'}}>
                        {item?.time}
                      </div>
                    </div>
                      <div  style={{display:'flex',alignItems:'center',marginTop:'14px'}}>
                        <img src={calendar} />
                        <div style={{marginLeft : '5px',color : '#565656'}}>
                          {item?.date}
                        </div>
                      </div>
                      <div style={{marginTop:'15px'}}>
                        <KenButton variant="primary" onClick={() =>handleClick(item?.image,item?.Title,item?.subTitle,item?.date,item?.time)}>
                          View workshop
                        </KenButton>  
                      </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
