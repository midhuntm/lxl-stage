import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import CardDetail from '../../components/CardWidgets/card';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  boxMargin: {
    marginLeft: 16,
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: 0,
    },
  },
}));
export default function GraphCard(props) {
  const { data } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid
      container
      // direction="row"
      style={{  }}
      spacing={3}
    >
      <Grid item xs={12} sm={12} md={12}>
        <CardDetail
          cardDetail={data?.Percentage_of_classes_attended__c}
          cardName={t('Avg_Attendance')}
          imgSrc={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/Cards/Card%20area%20graph.png'}
          showPercentage={true}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <CardDetail
          cardDetail={data?.hed__Grade__c}
          cardName={t('Overall_Grade')}
          imgSrc={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/Cards/skyBlueGraph.png'}
          showPercentage={false}
        />
      </Grid>
      {/* <Grid item xs={12} sm={12} md={6}>
                <Box >
                    <CardDetail cardDetail={props.data.hed__Grade__c} cardName={"ASSIGNMENT SUBMISSION"} imgSrc={GraphIconGreen} showPercentage={false} />
                </Box>

            </Grid >
            <Grid item xs={12} sm={12} md={6}>
                <Box className={classes.boxMargin}>
                    <CardDetail cardDetail={"At Risk"} cardName={"STANDING"} imgSrc={AtRisk} showPercentage={false} color="#FF7452" />
                </Box>

            </Grid> */}
    </Grid>
  );
}
