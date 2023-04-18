import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Checkbox, Grid, Typography } from '@material-ui/core';
import KenCheckBox from '../../../../../../global_components/KenCheckbox/index';
import { useTranslation } from 'react-i18next';
import AssessmentData from '../../../../AssessmentDetails.json';
import { values } from 'lodash';
import OptionLabel from '../ReviewOptions/OptionLabel';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px',
  },
  circle: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  label: {
    fontSize: '14px',
    marginLeft: '4px',
    color: theme.palette.KenColors.neutral400,
  },
  dflex: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
  pLeft: {
    paddingLeft: 8,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '150%',
  },
  box: {
    width: 32,
    height: 32,
  },
  selectBox: {
    background: '#FFFFFF',
    border: '1px solid #DFE8FF',
    borderRadius: 3,
    padding: '8px 12px',
  },
  background: {
    background: '#FFFFFF',
    borderRadius: '3px',
  },
  wrap: {
    marginBottom: 24,
  },
  sWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectWrap: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: 24
  },
  selectText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '150%',
    color: '#092682',
  },
  pLeft: {
    paddingLeft: 5
  }
}));

export default function AssignstudentDetails(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [studentData, setStudentData] = useState(AssessmentData.StudentDetails);
  const [totalCount, setTotalCount] = useState(AssessmentData.StudentDetails.length)
  const [selectedCount, setSelectedCount] = useState(0)
  const [selectAll, setSelectAll] = useState(false)
  const [unSelectAll, setUnselectAll] = useState(true)

  const selectAllStudents = (e) => {
    setSelectAll(e.target.checked)
    setUnselectAll(!e.target.checked)

  }
  const unSelectAllStudents = (e) => {
    setUnselectAll(e.target.checked)
    setSelectAll(!e.target.checked)

  }
  useEffect(() => {
    if (selectAll) {
      let data = studentData.map((item, idx) => {
        item['checked'] = true
        return item
      })
      setStudentData(data)
      setSelectedCount(data.length)
    }
    else {
      let data = studentData.map((item, idx) => {
        item['checked'] = false
        return item
      })
      setStudentData(data)
    }
  }, [selectAll])

  useEffect(() => {
    if (unSelectAll) {
      let data = studentData.map((item, idx) => {
        item['checked'] = false
        return item
      })
      setStudentData(data)
    }
    else {
      let data = studentData.map((item, idx) => {
        item['checked'] = true
        return item
      })
      setStudentData(data)
      setSelectedCount(data.length)
    }
  }, [unSelectAll])

  useEffect(() => {
    let trueCount = studentData.filter(item => item.checked == true).length
    if (trueCount == totalCount) {
      setSelectAll(true)
      setUnselectAll(false)
    }
    else if (trueCount == 0) {
      setSelectAll(false)
      setUnselectAll(true)
    }

    setSelectedCount(trueCount)
  }, [studentData])


  const onStudentCheck = (e, item) => {
    let data = studentData.map((ele, i) => {
      if (ele.studentId == item.studentId) {
        ele.checked = e.target.checked
      }
      return ele
    })
    setStudentData(data)
  }

  return (
    <>
      <Grid item container className={classes.background}>
        <Grid className={classes.selectWrap}>
          <Grid className={classes.selectBox}>
            {t('labels:No_student_Selected')}{" "}
            {selectedCount}/{totalCount}
          </Grid>
          <KenCheckBox
            label={"Select All"}
            value={selectAll}
            name="selectAll"
            onChange={selectAllStudents}
          />
          <KenCheckBox
            label={"Unselect All"}
            value={unSelectAll}
            name="unSelectAll"
            onChange={unSelectAllStudents}
          />
        </Grid>
        {studentData.map((item, idx) => {
          return (
            <Grid md={3} className={classes.dflex}>
              <Grid>
                <KenCheckBox
                  id={idx}
                  label={<><Grid><Avatar alt="user" className={classes.grey}>
                    {item.studentName?.charAt(0)}</Avatar></Grid>
                    <p className={classes.pLeft}>{item.studentName}</p></>}
                  value={item.checked ? item.checked : false}
                  onChange={(e) => onStudentCheck(e, item)}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
