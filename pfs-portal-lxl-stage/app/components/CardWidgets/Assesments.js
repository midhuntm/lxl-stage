import React, { useEffect } from 'react';
import { Box, Typography, Grid, makeStyles,Divider} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import Routes from '../../utils/routes.json';
import { withRouter } from 'react-router';
import moment from 'moment';

const forum2 =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/forum2.svg';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
const interactivePngIcon =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/interactivePngLogo.png';

const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'auto',
  },
  heading: {
    fontWeight: '600',
    color: theme.palette.KenColors.neutral100,
    textTransform: 'uppercase',
  },
  Name: {
    fontSize: '14px',
    lineHeight: '16px',
    color: theme.palette.KenColors.primary,
    '&:hover': {
      cursor: 'pointer',
    },
    textTransform: 'capitalize',
    marginRight: '5px',
  },
  date: {
    fontSize: '14px',
    lineHeight: '16px',
    marginBottom: '10px',
    color: theme.palette.KenColors.neutral400,
    marginTop: '5px',
  },
  type: {
    fontSize: '12px',

    color: theme.palette.KenColors.neutral400,
  },
  circleItem: {
    textAlign: 'center',
  },
  content: {
    marginTop: '25px',
  },
  assessment: {
    overflow: 'auto',
    maxHeight: '45vh',
    overflowX: 'hidden',
    padding: '0px',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#787878`,
      opacity: '0.1',
      outline: `1px solid #787878`,
    },
  },
  assesmentItem: {
    padding: '12px 0px',
  },
  head1: {
    fontSize: '14px',
    fomtWeight: 500,
    color: '#061938',
    marginTop:'8px'
  },
  head2: {
    fontSize: '12px',
    fomtWeight: 400,
    color: '#7A869A',
    marginTop: '2px'
  }

}));

const data = [
  { class: 'Film - I',img:interactivePngIcon },
  { class: 'Fun Activity - I',img:forum2 },
];

function Assesments(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { details, loading, history } = props;

  return (
    // <Box
    //   p={2}
    //   // style={{ overflow: 'auto', maxHeight: '45vh' }}
    //   data-testid="assessments"
    //   className={classes.assessment}
    // >
    //   {loading ? (
    //     <Grid container justify="center" alignItems="center">
    //       <CircularProgress />
    //     </Grid>
    //   ) : (
    //     <div>
    //       {/* notifications list */}
    //       <Box className={classes.container}>
    //         {details && details.length > 0 ? (
    //           details.map(assesment => (
    //             <AssesmentsItem
    //               key={assesment.id}
    //               history={history}
    //               {...assesment}
    //             />
    //           ))
    //         ) : (
    //           <Box textAlign="center" p={2}>
    //             {t('No_Assessments_Found')}
    //           </Box>
    //         )}
    //       </Box>
    //       {/* {details
    //         ? details.length > 5 && (
    //           <div style={{ paddingTop: 16 }} data-testid="show-more">
    //             <Typography align="center" color="primary">
    //               {t('Show_More')}
    //             </Typography>
    //           </div>
    //         )
    //         : null} */}
    //     </div>
    //   )}
    // </Box>
    <AssesmentsItem
    // key={assesment.id}
    history={history}
    // {...assesment}
  />
  );
}

export function AssesmentsItem(props) {
  const { t } = useTranslation();
  const {
    name,
    subject,
    duedate,
    timeclose,
    timeopen,
    marks = 6,
    history,
    total = 10,
    type = 'Appeared',
    url,
  } = props;
  const classes = useStyles();
  const handleClick = () => {
    history.push(`/${Routes.acadamicContent}`);
  };
  return (
    // <Box pt={2} pb={2} className="bottomDivider" style={{ padding: '0px' }}>
    //   <Grid container>
    //     <Grid item xs={9}>
    //       <Box
    //         onClick={() => {
    //           handleClick();
    //         }}
    //         className={classes.assesmentItem}
    //       >
    //         <Typography className={classes.Name} component="span">
    //           {name}
    //         </Typography>
    //         {subject && (
    //           <Typography variant="caption" component="span">
    //             {subject}
    //           </Typography>
    //         )}
    //       </Box>
    //       {timeopen && (
    //         <Typography className={`${classes.date}`} >
    //           {t('Submission_Starts_On')} : {moment.unix(timeopen).format('LLL')}
    //         </Typography>
    //       )}
    //       {timeclose && (
    //         <Typography className={classes.date}>
    //           {t('Due_On')} : {moment.unix(timeclose).format('LLL')}
    //         </Typography>
    //       )}
    //     </Grid>
    //     <Grid item alignItems="flex-end">
    //       {/* <Typography className={classes.circleItem}>
    //         <div>
    //           <CircularProgressWithLabel
    //             circleColor={getColor((marks / total) * 100)}
    //             value={(marks / total) * 100}
    //             label={`${marks}/${total}`}
    //           />
    //         </div>
    //       </Typography>
    //       <Typography variant="body2" className={classes.type}>
    //         {type}
    //       </Typography> */}
    //     </Grid>
    //   </Grid>

    //   {/* <Grid container>
    //     <Grid item xs={9}>
    //       <div
    //         onClick={() => {
    //           handleClick();
    //         }}
    //       >
    //         <Typography className={classes.Name} component="span">
    //           {name}
    //         </Typography>
    //         {subject && (
    //           <Typography variant="caption" component="span">
    //             {subject}
    //           </Typography>
    //         )}
    //       </div>
    //       <Typography className={classes.date}>{duedate}</Typography>
    //     </Grid>
      
    //   </Grid> */}
    // </Box>
    
 <Box pt={'5px'}>
 {data.map((users) => (
   <>
     <Box p={'8px'}
     // onClick={() => { handleClick(); }}
     //  className={classes.assesmentItem}
     >
       <Grid container spacing={6}>
         <Grid item xs={2}>
           <img
             src={users.img}
             alt="Forum"
             height="40px"
             width="40px"/>
         </Grid>
         <Grid item xs={10}>
           <Typography className={classes.head1}>{users.class}</Typography>
         </Grid>
       </Grid>
     </Box>
     <br />
     <Divider style={{ mt: '2px' }} />
   </>
 )
 )}
</Box>
  );
}
export default withRouter(Assesments);
