import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { KEY_CBSE_DISTRIBUTION } from './constants';

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// Desired file extesion
const fileExtension = '.xlsx';

export const exportToSpreadsheet = (data, fileName) => {
  //Create a new Work Sheet using the data stored in an Array of Arrays.
  const workSheet = XLSX.utils.aoa_to_sheet(data);
  // Generate a Work Book containing the above sheet.
  const workBook = {
    Sheets: { data: workSheet, cols: [] },
    SheetNames: ['data'],
  };
  // Exporting the file with the desired name and extension.
  const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
  const fileData = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(fileData, fileName + fileExtension);
};

export const cbseStudentData = data => {
  let result = [];
  result.push(['STUDENT NAME', data?.name]);
  result.push(['ROLL No', data?.rollNo]);
  result.push(['CLASS', `${data?.class}-${data?.section}`]);
  result.push([]);
  result.push([]);
  data.grades.map(el => {
    let headings = [
      KEY_CBSE_DISTRIBUTION?.subject,
      `${KEY_CBSE_DISTRIBUTION?.pp} (${el?.courses[0]?.PP?.PPMaxMarks} M)`,
      `${KEY_CBSE_DISTRIBUTION?.ma} (${el?.courses[0]?.ma?.MaMaxMarks} M)`,
      `${KEY_CBSE_DISTRIBUTION?.portfolio} (${
        el?.courses[0]?.portfolioMaxMarks
      } M)`,
      `${KEY_CBSE_DISTRIBUTION?.subEn} (${el?.courses[0]?.suben?.subenMaxMarks} M)`,
      `${el?.termName?.toUpperCase()} (${el?.courses[0]?.writtenTestMaxMarks} M)`,
      `${KEY_CBSE_DISTRIBUTION?.tMarks}`,
      `${KEY_CBSE_DISTRIBUTION?.grade}`,
    ];
    result?.push(headings);
    el?.courses?.map(elem => {
      let arr = [];
      let dataArr = [
        elem?.courseName,
        elem?.PP?.consolidated,
        elem?.ma?.consolidated,
        elem?.portfolio,
        elem?.suben?.consolidated,
        elem?.writtenTest,
        elem?.totalMarks,
        elem?.grade,
      ];
      arr?.push(...dataArr);
      result?.push(arr);
    });
    result?.push([]);
  });
  return {
    fileName: `${data.name}_${data.rollNo}`,
    data: result,
  };
};
