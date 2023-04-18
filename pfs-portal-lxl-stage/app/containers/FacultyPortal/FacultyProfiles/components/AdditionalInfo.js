import { Box, Button, Grid, Typography } from '@material-ui/core';
// import React from 'react';
import React, { useEffect, useState } from 'react';

import KenInputField from '../../../../components/KenInputField';
import { AiOutlinePlus } from 'react-icons/ai';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { getUserDetails } from '../../../../utils/helpers/storageHelper';

const AdditionalInfo = ({
  additionalInfoDetails,
  additonalInfoMapData,
  handleChangeRelation,
  deleteRowHandle,
  addRow,
  handleSave,
  handleCancel,
}) => {
  let profile = getUserDetails();

  

  // console.log(profile.Type)
  // profile.Type === 'Faculty'
  return (
    <>
      {additionalInfoDetails ? (
        // <div className="faculty-add-div">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              {additonalInfoMapData.map((relData, index) => {
                console.log('relData', relData);
                return (
                  <>
                    <Grid item xs={12} sm={3}>
                      <KenInputField
                        label="Name"
                        name="name"
                        value={relData.name}
                        dropdownColor="#FFFFFF"
                        onChange={e => handleChangeRelation(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <KenInputField
                        label="Link"
                        name="linkURL"
                        value={relData.linkURL}
                        dropdownColor="#FFFFFF"
                        onChange={e => handleChangeRelation(e, index)}
                        disabled={profile.Type === 'Faculty' ? false : true}
                        
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <KenInputField
                        label="Description"
                        name="description"
                        value={relData.description}
                        dropdownColor="#FFFFFF"
                        onChange={e => handleChangeRelation(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ marginTop: 23 }}>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteForeverIcon />}
                        onClick={e => deleteRowHandle(relData.informationId)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </>
                );
              })}
            </Grid>
            <Grid item xs={12} sm={12}>
              <div
                style={{ display: 'flex', whiteSpace: 'pre', marginTop: '8px' }}
              >
                <div>
                  <Button
                    onClick={e => addRow(e)}
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
                      onClick={e => handleSave(e)}
                    >
                      Save
                    </Button>{' '}
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className="cancel-btn"
                      style={{ backgroundColor: 'gray', color: 'white' }}
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </Button>{' '}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          {additonalInfoMapData.length > 0 ? (
            additonalInfoMapData.map(item => {
              return (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={11} />
                    <Grid item xs={12} sm={12} style={{ paddingLeft: '20px' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} />

                        <Grid item xs={12} sm={4}>
                          <b className="text-size">Name :</b>
                          <Grid item xs={12}>
                            <Typography>{item?.name}</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <b className="text-size">Link :</b>
                          <Grid item xs={12}>
                            <Typography>{item?.linkURL}</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <b className="text-size">Description :</b>
                          <Grid item xs={12}>
                            <Typography>{item?.description}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })
          ) : (
            <Box
              role="alert"
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="row"
            >
              <Typography style={{ fontSize: 16, padding: 10 }}>
                {'No Records'}
              </Typography>{' '}
            </Box>
          )}
        </>
      )}
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={12} />
        {additonalInfoMapData.map((relData, index) => {
          console.log('relData', relData);
          return (
            <>
              <Grid item xs={12} sm={3}>
                <KenInputField
                  label="Name"
                  name="name"
                  value={relData.contactName}
                  dropdownColor="#FFFFFF"
                  onChange={e => handleChangeRelation(e, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <KenInputField
                  label="Link"
                  name="linkURL"
                  value={relData.linkURL}
                  dropdownColor="#FFFFFF"
                  onChange={e => handleChangeRelation(e, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <KenInputField
                  label="Description"
                  name="description"
                  value={relData.description}
                  dropdownColor="#FFFFFF"
                  onChange={e => handleChangeRelation(e, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3} style={{ marginTop: 23 }}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  onClick={e => deleteRowHandle(relData.informationId)}
                >
                  Delete
                </Button>
              </Grid>
            </>
          );
        })}
      </Grid>
      <Grid item xs={12} sm={12}>
        <div style={{ display: 'flex', whiteSpace: 'pre', marginTop: '8px' }}>
          <div>
            <Button
              onClick={e => addRow(e)}
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
                onClick={e => handleSave(e)}
              >
                Save
              </Button>{' '}
            </div>
            <div>
              <Button
                variant="contained"
                className="cancel-btn"
                style={{ backgroundColor: 'gray', color: 'white' }}
                // onClick={() => handleFacaultyDetails()}
              >
                Cancel
              </Button>{' '}
            </div>
          </div>
        </div>
      </Grid> */}
    </>
  );
};

export default AdditionalInfo;
