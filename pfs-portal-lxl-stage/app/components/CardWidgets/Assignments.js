import React from 'react';
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Divider,
  CardHeader,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Routes from '../../utils/routes.json';
import moment from 'moment';
const forum2 =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/forum2.svg';
const interactivePngIcon =
  'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/interactivePngLogo.png';

import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'auto',
    padding: '0px'
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
    color: theme.palette.KenColors.neutral400,
    marginTop: '5px',
  },
  content: {
    marginTop: '25px',
  },
  type: {
    fontSize: '12px',
    lineHeight: '14px',
    color: theme.palette.KenColors.neutral400,
  },
  circleItem: {
    textAlign: 'center',
  },
  noAssigns: {
    textAlign: 'center',
    marginTop: 16,
  },
  assignment: {
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
  { class: 'Fun Activity - I',img:forum2 },
  { class: 'Film - I',img:interactivePngIcon },
];

export default function Assigments(props) {
  const classes = useStyles();
  const { details, loading } = props;
  const { t } = useTranslation();

  return (
    // <Box p={2} className={classes.assignment} data-testid="assignments">
    //   {
    //     /* header */
    //     // <Typography align="center" color="primary">
    //     //   {t('headings:Assignments')}
    //     // </Typography>
    //   }
    //   {loading ? (
    //     <Grid container justify="center" alignItems="center">
    //       <CircularProgress />
    //     </Grid>
    //   ) : (
    //     <div>
    //       {/* notifications list */}
    //       <Box className={classes.container}>
    //         {details && details.length > 0 ? (
    //           details.map(assignment => (
    //             <AssigmentItem {...assignment} key={assignment.id} />
    //           ))
    //         ) : (
    //           <Box textAlign="center" p={2}>
    //             {t('No_Assignments_Found')}
    //           </Box>
    //         )}
    //       </Box>
    //       {/* <div style={{ paddingTop: 16 }}>
    //         {details
    //           ? details.length > 5 && (
    //             <Typography
    //               align="center"
    //               color="primary"
    //               data-testid="show-more"
    //             >
    //               {t('Show_More')}
    //             </Typography>
    //           )
    //           : null}
    //       </div> */}
    //     </div>
    //   )}
    // </Box>
    <AssigmentItem
    //  {...assignment}
      // key={assignment.id}
       />
  );
}

export function AssigmentItem(props) {
  const { t } = useTranslation();
  const {
    name,
    duedate,
    subject,
    marks = 9,
    total = 10,
    type = 'Submitted',
    id,
    url,
    allowsubmissionsfromdate,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const handleClick = () => {
    // window.open(url);
    history.push(`/${Routes.acadamicContent}`);

  };
  return (
    // <Box pt={2} pb={2} className="bottomDivider" key={id}>
    //   <Grid container>
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
    //       {allowsubmissionsfromdate && (
    //         <Typography className={`${classes.date} ${classes.content}`}>
    //           {t('Submission_Starts_On')} : {moment.unix(allowsubmissionsfromdate).format('LLL')}
    //         </Typography>
    //       )}
    //       <Typography className={classes.date}>
    //         {t('Due_On')} : {moment.unix(duedate).format('LLL')}
    //       </Typography>
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
