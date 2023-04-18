import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { deleteAdditionalInfoData, saveResearchSuperVision } from '../../../../utils/ApiService';
import AdditionalInfo from './AdditionalInfo';
import { addRowData, deleteRowHandleData, handleChangeRelationData } from './utility/utility';
import KenLoader from '../../../../components/KenLoader';

const FacultyProfessiona = ({additionalData,setAdditionalData,associationData,setAssociationData}) => {
  const [facultyProfessionPage, setFacultyProfessionPage] = useState(additionalData);
  const [loading, setLoading] = useState(false);

  const handleChangeRelation = (evt, i) => {
    handleChangeRelationData(
      setFacultyProfessionPage,
      facultyProfessionPage,
      evt,
      i
    );
  };

  const handleSave = () => {
     setLoading(true);
    saveResearchSuperVision(facultyProfessionPage).then(res=>{
      console.log("response delete",res);
      setLoading(false);
     }).catch(err=>{
       console.log(err);
       setLoading(false);
     })
  };

  const addRow = () => {
    addRowData(setFacultyProfessionPage, 'PROFESSIONAL ASSOCIATION');
  };

  
  const deleteRowHandle = (infoId) => { 
    deleteRowHandleData(setFacultyProfessionPage, infoId);
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
    setFacultyProfessionPage([...additionalData])
  },[additionalData])

  const onCancelHandle = () => {
    setAssociationData(false);
  };
  return (
    <div>
       {loading && <KenLoader />}
      <Box>
        <AdditionalInfo
          additonalInfoMapData={facultyProfessionPage}
          handleChangeRelation={handleChangeRelation}
          deleteRowHandle={deleteRowHandle}
          addRow={addRow}
          handleSave={handleSave}
          handleCancel={onCancelHandle}
          additionalInfoDetails={associationData}
        />
      </Box>
    </div>
  );
};

export default FacultyProfessiona;
