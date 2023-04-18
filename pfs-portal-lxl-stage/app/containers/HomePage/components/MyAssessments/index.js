import { Typography, makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import Assesment from '../../../../components/CardWidgets/Assesments';
import { useTranslation } from 'react-i18next';
import KenButton from '../../../../global_components/KenButton';
import AddIcon from '../../../../assets/icons/addPlusWhite.svg';
import { Link } from 'react-router-dom';
import Routes from '../../../../utils/routes.json';
import ProtectedComponent from '../../../../utils/rbac/ProtectedComponent';

const useStyles = makeStyles(theme => ({
  title: { fontSize: 16, fontWeight: 600 },
  container: { padding: 16 },
  link: { textDecoration: 'none' },
}));

export default function MyAssessments(props) {

  const { details, loading } = props;
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <div className={styles.container} data-testid="my-assessments" style={{padding: '0px'}}>
      <Grid container direction="row" justify="space-between">
        {/* <Grid item>
          <Typography
            className={styles.title}
            data-testid="my-assessments-label"
          >
            {t('headings:My_Assessments').toUpperCase()}&nbsp;(
            {details ? details.length : '0'})
          </Typography>
        </Grid> */}
        {/* <ProtectedComponent feature="assessments" action="add">
          <Grid item>
            <Link to={`/${Routes.assessment}`} className={styles.link}>
              <KenButton variant="primary" icon={AddIcon}>
                {t('labels:Add_New')}
              </KenButton>
            </Link>
          </Grid>
        </ProtectedComponent> */}
      </Grid>

      <Assesment details={details} loading={loading} />
    </div>
  );
}
