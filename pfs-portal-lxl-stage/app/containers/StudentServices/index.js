import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  getBookRequest,
} from '../../utils/ApiService';
import { getUserDetails } from '../../utils/helpers/storageHelper';
import KenLoader from '../../components/KenLoader';
import KenHeader from '../../global_components/KenHeader/index';
import KenButton from '../../global_components/KenButton';
import KenDialog from '../../global_components/KenDialog';
import KenCard from '../../global_components/KenCard';
import { useTranslation } from 'react-i18next';
import ServiceList from './ServiceList';
import ServiceTabs from './ServiceList/data.json';
import DashboardCases from './DashboardCases';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: '100vh',
    [theme.breakpoints.only('xs')]: {
      padding: '0px 0px 20px 0px',
    },
  },
  headBox: {
    backgroundColor: theme.palette.KenColors.kenWhite,
  },
  form: {
    position: 'relative',
  },
  grid: {
    [theme.breakpoints.only('xs')]: {
      margin: '0px 0px 0px -8px',

      '& > .MuiGrid-item': {
        padding: 8,
      },
    },
  },
  cardHandler: {
    position: 'relative',
    height: '187px',
    // width: '369px',
  },
  cardItem: {
    position: 'relative',
    height: '75px',
  },
  maskWrap: {
    position: 'relative',
    height: '100%',
  },
  heading: {
    color: theme.palette.KenColors.neutral900,
    fontWeight: '600',
  },
  subHead: {
    fontSize: 12,
    paddingRight: 15,
    color: theme.palette.KenColors.neutral900,
  },
  cardText: {
    color: theme.palette.KenColors.neutral400,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    display: 'flex',
  },
  contactText: {
    width: '100%',
    padding: '16px',
    marginTop: '8px',
    borderRadius: '2px',
    textAlign: '-webkit-center',
  },
  statsText: {
    fontSize: 24,
    color: theme.palette.KenColors.kenWhite,
    [theme.breakpoints.only('xs')]: {
      fontSize: '24px',
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: '36px',
    },
  },
  headBtn: {
    marginRight: 20,
  },
  active: {
    borderColor: '#9ecaed',
    boxShadow: '0 0 10px #9ecaed',
  },
  deactive: {
    boxShadow: '0 0 0px #000',
  },
}));

export default function HomePage(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [serviceType, setServiceType] = useState('RAISE A CASE');
  const [addNewServiceItem, setAddNewServiceItem] = React.useState(false);
  const [serviceTabs] = useState(ServiceTabs?.DashboardTabs);
  const [selectedCase, setSelectedCase] = React.useState('Raise A Case');
  const [itemIndex, setItemIndex] = React.useState(1);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  
  //state for loader
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const contactId = getUserDetails().ContactId;
    setLoading(true);
    getBookRequest(contactId)
      .then(res => {
        let data = [];
        if (res.length > 0) {
          res?.map(item => {
            if(item.Type.toLocaleLowerCase() === serviceType.toLocaleLowerCase()){
              data.push({
                hed__Category__c: item.hed__Category__c
                  ? item.hed__Category__c
                  : '-',
                Case_No: item.CaseNumber ? item.CaseNumber : '-',
                // Service_Type: item.Type ? item.Type : '-',
                Subject: item.Subject ? item.Subject : '-',
                Description: item.Description ? item.Description : '-',
                Date: item.CreatedDate
                  ? moment(item.CreatedDate).format('DD/MM/YYYY')
                  : '-',
                Status: item.Status ? item.Status : '-',
                Case_ID: item.Id ? item.Id : '-',
              });
            }
          });
          setTableData(data);
        } else {
          setTableData([]);
        }
        setLoading(false);
        setDataUpdated(false);
      })
      .catch(err => {
        console.log('error in service list', err);
        setTableData([]);
      });
  }, [dataUpdated, serviceType, reloadTable]);

  const cancelItem = () => {
    setAddNewServiceItem(false);
    setOpen(false);
    // setDataUpdated(true);
  };
  const handleSubmit = () => {
    setAddNewServiceItem(false);
    setOpen(false);
    setDataUpdated(true);
  };

  const addNewService = item => {
    setItemIndex(item.index);
    setSelectedCase(item.title);
    setServiceType(
      item.title === 'Make A Request' ? 'MAKE A REQUEST' : 'RAISE A CASE'
    );
  };
  const raiseRequest = () => {
    setAddNewServiceItem(true);
  };
  const closeSignPopup = () => {
    setAddNewServiceItem(false);
  };
  return (
    <>
      <Box>
        <Grid item md={12} />
        {loading && <KenLoader />}
        <Grid item md={12}>
          <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
            <Box pt={2} pb={2} pl={2} pr={2}>
              <Grid container direction="column" spacing={3}>
                <Grid item container direction="row" md={12} spacing={3}>
                  {serviceTabs?.map(item => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={6}
                        onClick={() => addNewService(item)}
                      >
                        <div
                          className={
                            itemIndex === item.index
                              ? classes.active
                              : classes.deactive
                          }
                        >
                          <KenCard className={classes.cardItem}>
                            <Typography className={classes.cardText}>
                              {t(`headings:${item.title}`)}
                            </Typography>
                          </KenCard>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {selectedCase === 'Raise A Case' ? (
          <>
            <Grid item md={12}>
              <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
                <Box mb={1}>
                  <KenHeader
                    title={
                      <Typography className={classes.heading}>
                        {t('headings:RECENT CASES')}
                      </Typography>
                    }
                  >
                    <div style={{ paddingLeft: '10px' }}>
                      <KenButton
                        variant="primary"
                        className={[classes.headerBtn, classes.btnLabels].join(
                          ' '
                        )}
                        onClick={() => raiseRequest()}
                        label={ 'Raise Case'}
                        style={{ marginRight: 20 }}
                      />
                    </div>
                  </KenHeader>
                </Box>
              </Box>
            </Grid>

            <Grid item md={12}>
              <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
                <Box pt={0} pb={0} pl={0} pr={0}>
                  <ServiceList homePage={true} tableData={tableData} setReloadTable={setReloadTable} />
                  {/* <KenGrid columns={columns} data={tableData} pagination={{ disabled: true }} tableTotal={{ disabled: true, checkbox: true }} getRowProps={{ selected: true }} toolbarDisabled={true} /> */}
                </Box>
              </Box>
            </Grid>
          </>
        ) : null}
         {selectedCase === 'Make A Request' ? (
          <>
            <Grid item md={12}>
              <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
                <Box mb={1}>
                  <KenHeader
                    title={
                      <Typography className={classes.heading}>
                        {t('headings:RECENT REQUESTS')}
                      </Typography>
                    }
                  >
                    <div style={{ paddingLeft: '10px' }}>
                      <KenButton
                        variant="primary"
                        className={[classes.headerBtn, classes.btnLabels].join(
                          ' '
                        )}
                        onClick={() => raiseRequest()}
                        label={t(`labels: Make a Request`)}
                        style={{ marginRight: 20 }}
                      />
                    </div>
                  </KenHeader>
                </Box>
              </Box>
            </Grid>

            <Grid item md={12}>
              <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
                <Box pt={0} pb={0} pl={0} pr={0}>
                  <ServiceList homePage={true} tableData={tableData}  />
                </Box>
              </Box>
            </Grid>
          </>
        ) : null}
        <KenDialog
          toggleOpen={setOpen}
          open={addNewServiceItem}
          // toggleOpen={toggleQuery}
          handleClose={() => {
            setAddNewServiceItem(false);
          }}
          onNegativeButtonClick={closeSignPopup}
          onPositiveButtonClick={closeSignPopup}
          dialogActionFlag={false}
          hidePositiveButton={true}
          hideNegativeButton={true}
          titleContainerStyles={{ padding: '0px' }}
        >
          <Grid item md={12}>
            <Box mt={2} mb={2} className={classes.headBox} autoPageSize>
              <Box pt={0} pb={0} pl={0} pr={0}>
                <DashboardCases
                  selectedCase={selectedCase}
                  serviceType={serviceType}
                  cancelItem={cancelItem}
                  handleSubmit={handleSubmit}
                />
              </Box>
            </Box>
          </Grid>
        </KenDialog>
      </Box>
    </>
  );
}
