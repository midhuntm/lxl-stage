import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { deleteAdditionalInfoData, saveResearchSuperVision } from '../../../../utils/ApiService';
import AdditionalInfo from './AdditionalInfo';
import {
  addRowData,
  deleteRowHandleData,
  handleChangeRelationData,
} from './utility/utility';
import KenLoader from '../../../../components/KenLoader';

const FacultyOthers = ({additionalData,setAdditionalData,othersData,setOthersData}) => {
  const [facultyOthersPage, setFacultyOthersPage] = useState(additionalData);
  const [loading, setLoading] = useState(false);

  const handleChangeRelation = (evt, i) => {
    handleChangeRelationData(setFacultyOthersPage, facultyOthersPage, evt, i);
  };
  const addRow = () => {
    addRowData(setFacultyOthersPage, 'OTHERS');
  };
  const handleSave = () => {
    setLoading(true);
    saveResearchSuperVision(facultyOthersPage).then(res=>{
      console.log("response delete",res);
      setLoading(false);
     }).catch(err=>{
       console.log(err);
       setLoading(false);
     })
  };
  const deleteRowHandle = (infoId) => { 
    deleteRowHandleData(setFacultyOthersPage, infoId);
    // let infoId = facultyBookPage.filter((event,ind) => { return event.informationId === id})
    setLoading(true);
    let data =[
        {
        "informationId": infoId
        }]
    deleteAdditionalInfoData(data).then(res=>{
      console.log("response delete",res);
      setLoading(false);
     }).catch(err=>{
       console.log(err);
       setLoading(false);
     })
  };
  useEffect(()=>{
    setFacultyOthersPage([...additionalData])
  },[additionalData])
  
  const onCancelHandle = () => {
    setOthersData(false);
  };
  return (
    <div>
      {loading && <KenLoader />}
      <Box>
        <AdditionalInfo
          additonalInfoMapData={facultyOthersPage}
          handleChangeRelation={handleChangeRelation}
          deleteRowHandle={deleteRowHandle}
          addRow={addRow}
          handleSave={handleSave}
          additionalInfoDetails={othersData}
          handleCancel={onCancelHandle}
        />
      </Box>
    </div>
  );
};

export default FacultyOthers;
