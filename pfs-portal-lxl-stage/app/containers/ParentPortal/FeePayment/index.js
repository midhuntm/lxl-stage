import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TabContent from './components/tabs';
import {
  getPaymentSchedule,
  getPaymentHistory,
  addPay,
  feesInfo,
  getStudentDetails,
} from '../../../utils/ApiService';
import moment from 'moment';
import configContext from '../../../utils/helpers/configHelper';
import { getUserDetails } from '../../../utils/helpers/storageHelper';
import { KEY_DATE_FORMAT } from '../../../utils/constants';
import context from '../../../utils/helpers/context';
import KenDialogBox from '../../../components/KenDialogBox/index';
import Jodo from './components/jodoIntegration';
// import fbAnalytics from '../../../utils/Analytics';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
}));

const FeePayment = props => {
  const { drawerChanges } = props;
  const { config } = React.useContext(configContext);
  const classes = useStyles();
  const [tutionFees, setTutionFees] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [resp, setResp] = React.useState();
  const { handleLoader } = React.useContext(context);
  // const { t } = useTranslation();
  const [pendingLoading, setPendingLoading] = React.useState(true);
  const [historyLoading, setHistoryLoading] = React.useState(true);
  const [flag, setFlag] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    drawerChanges('show');
  }, []);
  // React.useEffect(() => {
  //   if (config?.firebaseConfig) {
  //     fbAnalytics(config.firebaseConfig, `parent_feepayment`);
  //   }
  // }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const [html, setHtml] = React.useState();

  const handleHtml = rawHtml => {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
  };

  useEffect(() => {
    handleLoader(true);
    const contactId = getUserDetails().ContactId;

    getStudentDetails(contactId)
      .then(res => {
        res?.Program_Enrollment?.forEach(el => {
          if (el.Program_Plan === '2020-Class 10' && el.Status === 'Current') {
            setFlag(false);
            setTutionFees([]);
            setPendingLoading(false);
            return;
          } else {
            setFlag(true);
            // setPendingLoading(true);
          }
        });
      })
      .catch(err => {
        console.log(err);
        handleLoader(false);
        setFlag(true);
        // setPendingLoading(true);
      });
    if (flag) {
      setPendingLoading(true);
      getPaymentSchedule(contactId, config.orgID)
        .then(res => {
          setResp(res);
          res.data.feesBreakUp.forEach((item, index) => {
            item.dueDate1 = moment(item.dueDate).format('DD MMM YYYY');
            item.check = false;
          });
          setTutionFees(res.data.feesBreakUp);
          handleLoader(false);
          setPendingLoading(false);
        })
        .catch(err => {
          console.log('error in payment schedule', err);
          handleLoader(false);
          setPendingLoading(false);
          // handleSnackbarOpen(KEY_SEVERITY.info, t('Fee_Schedule_Not_Found'));
        });
      feesInfo(contactId, config.orgID)
        .then(res => {
          handleClickOpen();
          const _html = handleHtml(res.toString());
          setHtml(_html);
        })
        .catch(err => {
          console.log('err in feesInfo', err);
        });
    }

    getPaymentHistory(contactId, config.orgID)
      .then(res => {
        if (res.data && res.data.length > 0) {
          const historyItems = [];
          res.data.forEach(el =>
            el.feeType.forEach(item => {
              item.paymentDate = moment(el.paymentDate).format(KEY_DATE_FORMAT);
              item.actions = { receiptUrl: el.receiptUrl };
              historyItems.push(item);
            })
          );
          setPaymentHistory(historyItems);
          handleLoader(false);
          setHistoryLoading(false);
        } else {
          handleLoader(false);
          setHistoryLoading(false);
        }
      })
      .catch(err => {
        console.log('error in payment history', err);
        handleLoader(false);
        setHistoryLoading(false);
        // handleSnackbarOpen(KEY_SEVERITY.info, t('Payment_History_Not_Found'));
      });

    feesInfo(contactId, config.orgID)
      .then(res => {
        handleClickOpen();
        const _html = handleHtml(res.toString());
        setHtml(_html);
      })
      .catch(err => {
        console.log('err in f eesInfo', err);
      });
  }, [flag]);

  return (
    <div className={classes.root}>
      <KenDialogBox
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        html={html}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabContent
            tutionFees={tutionFees}
            resp={resp}
            paymentHistory={paymentHistory}
            pendingLoading={pendingLoading}
            historyLoading={historyLoading}
          />
        </Grid>
      </Grid>

      <Jodo />
    </div>
  );
};

export default FeePayment;
