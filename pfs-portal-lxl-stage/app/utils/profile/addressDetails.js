import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import { Country, State, City } from 'country-state-city';
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  ButtonBase,
  Button,
  Container,
} from '@material-ui/core';
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
// import KenSnackbar from '../../../../components/KenSnackbar';
import FacAddress from '../../containers/FacultyPortal/FacultyProfiles/components/FacAddress.js';

const useStyles = makeStyles(theme => ({
  box1: {
    // maxWidth: 832,
    // minWidth: 400,
    position: 'relative',
  },
  healthGrid: {
    marginTop: theme.spacing(2),
  },
  grid: {
    minWidth: '13.8vw',
  },
  detailTitle1: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral100,
    textTransform: 'uppercase',
  },
  back: {
    fontSize: '12px',
    '&:hover': {
      cursor: 'pointer',
    },
    marginLeft: '-8px',
  },
  iconBack: {
    height: 12,
  },
  loader: {
    minHeight: '100vh',
    minWidth: '100vh',
  },
  breadCrumbWrapper: {
    margin: '15px 0',
  },
  header: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
  },
  boxContainer: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
    marginTop: '26px',
    paddingTop: '62px',
    paddingBottom: '30px',
  },
  boxContainer1: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
    marginTop: '26px',
  },
  imageSection: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
    marginTop: '26px',
  },
  innerTitle: {
    fontSize: 16,
    marginTop: '30px',
  },
  subHeaderTitle: {
    width: '100%',
  },
}));
const AddressDetails = ({
    state,
    setState,
    addressDetails,
    setAddressDetails,
    formValues,
    setFormValues,
    onSubmit,
    onaddAddressRow,
    onCancel
  }) => {
  const { t } = useTranslation();
  const contactId = JSON.parse(localStorage.getItem('userDetails'));
  const [data, setData] = useState(formValues);
  useEffect(() => {
    setData(formValues);
  }, [formValues]);
  const handleSubmit = () => {
    onSubmit();
  };
  const addAddressRow = () => {
    onaddAddressRow();
  };

  const onCancelHandle = () => {
    onCancel();
  };
  console.log("formValues in formValues address details", formValues)
  console.log("formValues in state address details", state)

  return (
    <>
      {addressDetails ? (
        // <div className="faculty-add-div">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              {data?.map((element, index) => {
                console.log('addressData', element);
                return (
                  <FacAddress
                    formValues={data}
                    index={index}
                    element={element}
                    setFormValues={setFormValues}
                  />
                );
              })}
            </Grid>
            <div
              style={{ display: 'flex', whiteSpace: 'pre', marginTop: '8px' }}
            >
              <div>
                <Button
                  onClick={addAddressRow}
                  variant="contained"
                  color="primary"
                  startIcon={<AiOutlinePlus />}
                >
                  Add Row
                </Button>
              </div>
              <div className="btn-save-cancel">
                {' '}
                <div className="save-btn">
                  <Button
                    variant="contained"
                    color="primary"
                    className="btnMargin"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </Button>{' '}
                </div>
                <div>
                  <Button
                    variant="contained"
                    className="cancel-btn"
                    style={{ backgroundColor: 'gray', color: 'white' }}
                    onClick={() => onCancelHandle()}
                  >
                    Cancel
                  </Button>{' '}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        <>
          {data.length > 0 &&
            data.map(address => {
              return (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={11} />
                    <Grid item xs={12} sm={12} style={{ paddingLeft: '20px' }}>
                      <Grid container spacing={2}>
                      <h3>{address?.Addresstype} Address</h3>
                        <Grid item xs={12} sm={12} />
                        {/* <Grid item xs={12} sm={2}>
                          <b className="text-size">Type :</b>
                          <Grid item xs={12}>
                            <Typography> Adresss</Typography>
                          </Grid>
                        </Grid> */}
                        

                        <Grid item xs={12} sm={2}>
                          <b className="text-size">Country :</b>
                          <Grid item xs={12}>
                            <Typography>{address?.Country}</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <b className="text-size">State :</b>
                          <Grid item xs={12}>
                            <Typography>{address?.state}</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <b className="text-size">District :</b>
                          <Grid item xs={12}>
                            <Typography>{address?.district}</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <b className="text-size">Address :</b>
                          <Grid item xs={12}>
                            <Typography>{address?.address}</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <b className="text-size">Pincode :</b>
                          <Grid item xs={12}>
                            <Typography>{address?.pincode}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}
        </>
      )}
    </>
  );
};

export default AddressDetails;
