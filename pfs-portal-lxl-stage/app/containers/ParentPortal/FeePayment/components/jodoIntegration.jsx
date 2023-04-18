import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { getStudentDetails } from '../../../../utils/ApiService';
import { KEY_USER_DETAILS } from '../../../../utils/constants';
import KenLoader from '../../../../components/KenLoader/index';

export default function Jodo() {
  let user = JSON.parse(localStorage.getItem(KEY_USER_DETAILS));
  const [loader, setLoader] = React.useState(true);
  const [account, setAccount] = React.useState();
  const [nfce, setNfce] = React.useState();
  React.useEffect(() => {
    getStudentDetails(user?.ContactId)
      .then(res => {
        if (res.AccountName === 'National Center For Excellence (JBN Branch)') {
          setAccount('https://tinyurl.com/ncfejbn');
          setNfce('JBN');
        } else {
          setAccount('https://tinyurl.com/ncfecvrblri');
          setNfce('CVR');
        }
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      });
  }, []);
  return (
    <div>
      {nfce && account ? (
        <Grid style={{ marginLeft: 8 }}>
          <Typography style={{ marginBottom: 8, fontSize: 14 }}>
            For Fee Payment in Installments Option, please go through the below
            process:
          </Typography>
          <Typography style={{ fontSize: 12 }}>
            Process to Apply - Fully digital and paperless process
          </Typography>
          <Typography style={{ fontSize: 12, marginLeft: 8 }}>
            {' '}
            1. Fill up this 2 minute application in{' '}
            <a href="https://app.jodo.in/" target="_blank">
              Jodo
            </a>
          </Typography>
          <Typography style={{ fontSize: 12, marginLeft: 8 }}>
            {' '}
            2. Select NCFE {nfce} in the name of the school
          </Typography>
          <Typography style={{ fontSize: 12, marginLeft: 8, marginBottom: 8 }}>
            {' '}
            3. Once approved, you will receive a confirmation email from Jodo on
            which the school will also be marked, and the school will reply with
            the exact fees
          </Typography>
          <Typography style={{ fontSize: 12 }}>
            End to end process takes less than 10 minutes
          </Typography>
          <Typography style={{ fontSize: 12 }}>
            If you want to know more click{' '}
            <a href={account} target="_blank">
              here
            </a>{' '}
            or call them at <a tel="9606108182">9606108182</a>
          </Typography>
          <Typography style={{ fontSize: 12 }}>
            The entire Jodo process can be seen in the{' '}
            <a href="https://youtu.be/r0fxAEONMl0" target="_blank">
              explainer video{' '}
            </a>
          </Typography>
        </Grid>
      ) : (
        <div>{loader && <KenLoader />}</div>
      )}
    </div>
  );
}
