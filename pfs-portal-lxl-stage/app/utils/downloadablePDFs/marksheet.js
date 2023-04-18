import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Svg,
  Circle,
  G,
  Line,
  Rect,
} from '@react-pdf/renderer';
import logo1 from '../../images/logo1.png';
import logo2 from '../../images/logo2.png';
import Parent from '../../images/parentpng.png';
import Teacher from '../../images/teacher.png';
import Principal from '../../images/principal.png';
import OpenSansBold from './Open_Sans/OpenSans-Bold.ttf';
import OpenSansRegular from './Open_Sans/OpenSans-Regular.ttf';
import OpenSansLight from './Open_Sans/OpenSans-Light.ttf';

Font.register({ family: 'Open Sans Bold', src: OpenSansBold });
Font.register({ family: 'Open Sans Regular', src: OpenSansRegular });
Font.register({ family: 'Open Sans Light', src: OpenSansLight });

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Open Sans Regular',
    backgroundColor: '#fff',
    margin: 20,
  },
  fontBold: {
    fontFamily: 'Open Sans Bold',
  },
  header: {
    //marginTop: 15,
    flexDirection: 'row',
  },
  headerTextView: {
    fontFamily: 'Open Sans Bold',
    fontSize: 9,
    flexDirection: 'column',
    marginLeft: 100,
    marginTop: 15,
  },
  headerTextTop: {
    marginLeft: 30,
    fontWeight: 'bold',
  },
  headerTextBottom: {
    fontWeight: 400,
    fontWeight: 'bold',
  },
  imageLeft: {
    height: 45,
    width: 45,
    marginLeft: 18,
  },
  imageRight: {
    height: 45,
    width: 45,
    marginLeft: 120,
  },
  headerTwo: {
    flexDirection: 'row',
    position: 'relative',
    fontSize: 7,
    marginLeft: 13,
    marginTop: 15,
  },
  headerTwoB: {
    position: 'absolute',
    left: 80,
    height: 40,
    width: 150,
  },
  headerTwoC: {
    position: 'absolute',
    height: 40,
    width: 80,
    left: 240,
  },
  headerTwoD: {
    position: 'absolute',
    height: 40,
    width: 160,
    left: 340,
  },
  TableA: {
    position: 'relative',
    fontSize: 7,
    marginLeft: 13,
    //height : 150,
    width: 522,
  },
  RowA: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    height: 15,
    width: 520,
    textAlign: 'center',
    fontFamily: 'Open Sans Bold',
  },
  RowAColA: {
    borderRight: '1px solid #000',
    width: 90,
    paddingTop: 1,
  },
  RowAColB: {
    borderRight: '1px solid #000',
    width: 215,
    paddingTop: 1,
  },
  RowAColC: {
    width: 215,
    paddingTop: 1,
  },
  RowB: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    height: 45,
    width: 520,
    textAlign: 'center',
    fontFamily: 'Open Sans Bold',
  },
  RowBColA: {
    borderRight: '1px solid #000',
    width: 90,
    paddingTop: 15,
  },
  RowBColB: {
    borderRight: '1px solid #000',
    width: 215,
  },
  RowBColC: {
    width: 215,
  },
  RowBColBColA: {
    borderRight: '1px solid #000',
    height: 45,
    width: 80,
  },
  RowBColBColARowA: {
    borderBottom: '1px solid #000',
    height: 30,
    paddingTop: 4,
  },
  RowBColBColARowB: {
    flexDirection: 'row',
    height: 15,
  },
  RowBColBColARowBColA: {
    borderRight: '1px solid #000',
    width: 40,
    paddingTop: 1,
  },
  RowBColBColARowBColB: {
    width: 40,
    paddingTop: 1,
  },
  RowBColBColB: {
    position: 'absolute',
    borderRight: '1px solid #000',
    width: 35,
    height: 45,
    left: 80,
    paddingTop: 4,
  },
  RowBColBColC: {
    position: 'absolute',
    borderRight: '1px solid #000',
    width: 25,
    height: 45,
    left: 115,
    paddingTop: 4,
  },
  RowBColBColD: {
    position: 'absolute',
    borderRight: '1px solid #000',
    width: 25,
    height: 45,
    left: 140,
    paddingTop: 4,
  },
  RowBColBColE: {
    position: 'absolute',
    borderRight: '1px solid #000',
    width: 25,
    height: 45,
    left: 165,
    paddingTop: 4,
  },
  RowBColBColF: {
    position: 'absolute',
    width: 25,
    height: 45,
    left: 190,
    paddingTop: 4,
  },
  RowC: {
    borderBottom: '1px solid #000',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    height: 15,
    width: 520,
    textAlign: 'center',
  },
  RowCColA: {
    position: 'absolute',
    borderRight: '1px solid #000',
    padding: 2,
    height: 15,
    width: 89.5,
    textAlign: 'left',
  },
  RowCColB: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    paddingTop: 2,
    width: 40,
    left: 89.5,
  },
  RowCColC: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 40,
    left: 130,
    padding: 2,
  },
  RowCColD: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 40,
    left: 165,
    padding: 2,
  },
  RowCColE: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 25,
    left: 205,
    padding: 2,
  },
  RowCColF: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 25,
    left: 230,
    padding: 2,
  },
  RowCColG: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 25,
    left: 255,
    padding: 2,
  },
  RowCColH: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 25,
    left: 279,
    padding: 2,
  },
  RowCColI: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 39.5,
    left: 304,
    padding: 2,
  },
  RowCColJ: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 39,
    left: 345,
    padding: 2,
  },
  RowCColK: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 34,
    left: 385,
    padding: 2,
  },
  RowCColL: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 25,
    left: 419,
    padding: 2,
  },
  RowCColM: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 25,
    left: 444,
    padding: 2,
  },
  RowCColN: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 25,
    left: 469,
    padding: 2,
  },
  RowCColO: {
    position: 'absolute',
    height: 15,
    width: 25,
    left: 495,
    padding: 2,
  },
  TableB: {
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    fontSize: 7,
    marginLeft: 13,
    width: 522,
    marginTop: 22,
  },
  TableBRow: {
    position: 'relative',
    borderBottom: '1px solid #000',
    height: 15,
    width: 520,
    textAlign: 'left',
    fontWeight: 'ultrabold',
  },
  TableBRowColA: {
    borderRight: '1px solid #000',
    height: 15,
    width: 360,
    padding: 1,
  },
  TableBRowColB: {
    position: 'absolute',
    borderRight: '1px solid #000',
    height: 15,
    width: 80,
    left: 360,
    textAlign: 'center',
    padding: 2,
  },
  TableBRowColC: {
    position: 'absolute',
    height: 15,
    width: 80,
    left: 440,
    padding: 2,
    textAlign: 'center',
  },
  TableC: {
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    fontSize: 7,
    marginLeft: 13,
    width: 522,
    marginTop: 12,
  },
  TableD: {
    flexDirection: 'row',
    border: '1px solid #000',
    fontSize: 7,
    marginLeft: 13,
    height: 15,
    width: 522,
    marginTop: 12,
    padding: 1,
  },
  TableE: {
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    fontSize: 7,
    marginLeft: 13,
    height: 60,
    width: 522,
    marginTop: 5,
    textAlign: 'center',
  },
  TableERowA: {
    borderBottom: '1px solid #000',
    flexDirection: 'column',
    height: 22,
  },
  TableERowB: {
    borderBottom: '1px solid #000',
    position: 'relative',
    flexDirection: 'row',
    height: 22,
    fontFamily: 'Open Sans Bold',
  },
  TableERowBColA: {
    borderRight: '1px solid #000',
    width: 50,
  },
  TableERowBColB: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 5,
  },
  TableERowBColC: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 5,
  },
  TableERowBColD: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 5,
  },
  TableERowBColE: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 5,
  },
  TableERowBColF: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 5,
  },
  TableERowBColG: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 5,
  },
  TableERowBColH: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 5,
  },
  TableERowBColI: {
    width: 120,
    paddingTop: 5,
  },
  TableERowC: {
    borderBottom: '1px solid #000',
    position: 'relative',
    flexDirection: 'row',
    height: 15,
    fontFamily: 'Open Sans Bold',
  },
  TableERowCColA: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 1,
  },
  TableERowCColB: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 1,
  },
  TableERowCColC: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 1,
  },
  TableERowCColD: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 1,
  },
  TableERowCColE: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 1,
  },
  TableERowCColF: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 1,
  },
  TableERowCColG: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 1,
  },
  TableERowCColH: {
    borderRight: '1px solid #000',
    width: 50,
    paddingTop: 1,
  },
  TableERowCColI: {
    width: 120,
    paddingTop: 1,
  },
  TableF: {
    border: '1px solid #000',
    fontSize: 7,
    marginLeft: 13,
    height: 75,
    width: 522,
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'Open Sans Bold',
  },
  TableFRowA: {
    textAlign: 'left',
    flexDirection: 'row',
    height: 15,
    paddingTop: 2,
    left: 100,
  },
  TableFRowB: {
    flexDirection: 'row',
    borderTop: '1px solid #000',
    height: 15,
  },
  TableFRowBColA: {
    borderRight: '1px solid #000',
    width: 95,
    paddingTop: 2,
  },
  TableFRowBColB: {
    borderRight: '1px solid #000',
    width: 175,
    paddingTop: 2,
  },
  TableFRowBColC: {
    width: 235,
    paddingTop: 2,
  },
  SignatureBox: {
    position: 'relative',
    fontSize: 7,
    marginLeft: 13,
    height: 75,
    width: 520,
    marginTop: 5,
    fontFamily: 'Open Sans Bold',
  },
  SignatureBoxDate: {
    flexDirection: 'row',
    position: 'absolute',
    width: 100,
    top: 60,
    left: 15,
  },
  SignatureBoxParent: {
    flexDirection: 'column',
    position: 'absolute',
    width: 130,
    left: 100,
    textAlign: 'center',
  },
  parentSign: {
    marginLeft: 30,
    height: 60,
  },
  parentSignText: {
    height: 15,
  },
  SignatureBoxClassTeacher: {
    flexDirection: 'column',
    position: 'absolute',
    width: 130,
    left: 260,
    textAlign: 'center',
  },
  SignatureBoxPrincipal: {
    flexDirection: 'column',
    position: 'absolute',
    width: 130,
    left: 390,
    textAlign: 'center',
  },
  signatureImage: {
    height: 50,
    width: 50,
  },
  GraphBox: {
    flexDirection: 'column',
    fontSize: 8,
    marginLeft: 13,
    width: 520,
    marginTop: 12,
    fontFamily: 'Open Sans Light',
    // height:500,
  },
  GraphTittle: {
    textAlign: 'center',
    height: 15,
  },
  Graph: {
    position: 'relative',
    fontSize: 7,
    height: 70,
    marginTop: 5,
    fontFamily: 'Open Sans Light',
  },
  Grid: {
    stroke: '#ccc',
    strokeDasharray: 0,
    strokeWidth: 1,
  },
  GraphSideText: {
    fontSize: 7,
    fontFamily: 'Open Sans Light',
  },
  GraphColorNote: {
    position: 'relative',
    fontSize: 7,
    marginTop: 5,
    fontFamily: 'Open Sans Light',
    height: 15,
  },
  disclamer: {
    marginTop: 65,
  },
  headerTwoTextthree: {
    position: 'absolute',
    top: 19,
  },
  headerTwoTexttwo: {
    position: 'absolute',
    top: 9.5,
    fontFamily: 'Open Sans Bold',
  },
});

// Create Document Component
export default function MyDocument(props) {
  const data = props?.studentData;
  const scolacticMark = data?.grades;
  const termI = scolacticMark[0]?.courses?.filter(el => {
    return el?.courseName !== '2020-COMP-NCECVR-PS-C03';
  });
  const termII = scolacticMark[1]?.courses?.filter(el => {
    return el?.courseName !== '2020-COMP-NCECVR-PS-C03';
  });

  const coscholistic = data.coscholistic;
  const termIC = coscholistic[0]?.courses?.filter(el => {
    return el?.courseName !== 'Discipline';
  });
  const termIIC = coscholistic[1]?.courses?.filter(el => {
    return el?.courseName !== 'Discipline';
  });

  const termID = coscholistic[0]?.courses?.filter(el => {
    return el?.courseName === 'Discipline';
  });
  const termIID = coscholistic[1]?.courses?.filter(el => {
    return el?.courseName === 'Discipline';
  });

  const signArray = props?.signatures;
  const parentSign = 'data:image/png;base64,' + signArray[1]?.value;
  const classTeacherSign = 'data:image/png;base64,' + signArray[0]?.value;
  const principalSign = 'data:image/png;base64,' + signArray[2]?.value;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        <View style={styles.header}>
          <Image style={styles.imageLeft} src={logo1} />
          <View style={styles.headerTextView}>
            <Text style={styles.headerTextTop}>
              ACADEMIC SESSION : 2019 - 20
            </Text>
            <Text style={styles.headerTextBottom}>
              REPORT CARD FOR CLASS : {data?.class} {data?.section}
            </Text>
          </View>
          <Image style={styles.imageRight} source={logo2} />
        </View>

        <View style={styles.headerTwo}>
          <View>
            <Text style={styles.fontBold}>Student Name :</Text>
            <Text style={styles.fontBold}>Date Of Birth :</Text>
            <Text style={styles.fontBold}>Father's Name : </Text>
          </View>

          <View style={styles.headerTwoB}>
            <Text>{data?.name}</Text>
            <Text>{data?.dob}</Text>
            <Text>{data?.fatherName}</Text>
          </View>

          <View style={styles.headerTwoC}>
            <Text style={styles.fontBold}>GR No.:</Text>
            <Text style={styles.fontBold}>Attendance : -</Text>
            <Text style={styles.fontBold}>Mother's Name :</Text>
          </View>

          <View style={styles.headerTwoD}>
            <Text>{data?.grNo}</Text>
            <Text style={styles.headerTwoTexttwo}>
              {data?.attendance} Roll No. : {data?.rollNo}
            </Text>
            <Text style={styles.headerTwoTextthree}>{data?.motherName}</Text>
          </View>
        </View>

        <View style={styles.TableA}>
          <View style={styles.RowA}>
            <View style={styles.RowAColA}>
              <Text style={{ fontWeight: 'ultrabold' }}>Scholastic Areas</Text>
            </View>

            <View style={styles.RowAColB}>
              <Text>Term - I (100 Marks)</Text>
            </View>

            <View style={styles.RowAColC}>
              <Text>Term - II (100 Marks)</Text>
            </View>
          </View>

          <View style={styles.RowB}>
            <View style={styles.RowBColA}>
              <Text>Subject Name</Text>
            </View>
            <View style={styles.RowBColB}>
              <View style={styles.RowBColBColA}>
                <View style={styles.RowBColBColARowA}>
                  <Text>Periodic Assessment (10M)</Text>
                </View>
                <View style={styles.RowBColBColARowB}>
                  <View style={styles.RowBColBColARowBColA}>
                    <Text>P&amp;P (5M)</Text>
                  </View>
                  <View style={styles.RowBColBColARowBColB}>
                    <Text>MA (5M)</Text>
                  </View>
                </View>
              </View>
              <View style={styles.RowBColBColB}>
                <Text>Portfolio (5M)</Text>
              </View>
              <View style={styles.RowBColBColC}>
                <Text>Sub En (5M)</Text>
              </View>
              <View style={styles.RowBColBColD}>
                <Text>Half Yearly Exam (80M)</Text>
              </View>
              <View style={styles.RowBColBColE}>
                <Text>Total Marks (100M)</Text>
              </View>
              <View style={styles.RowBColBColF}>
                <Text>Grade</Text>
              </View>
            </View>
            <View style={styles.RowBColC}>
              <View style={styles.RowBColBColA}>
                <View style={styles.RowBColBColARowA}>
                  <Text>Periodic Assessment (10M)</Text>
                </View>
                <View style={styles.RowBColBColARowB}>
                  <View style={styles.RowBColBColARowBColA}>
                    <Text>P&amp;P (5M)</Text>
                  </View>
                  <View style={styles.RowBColBColARowBColB}>
                    <Text>MA (5M)</Text>
                  </View>
                </View>
              </View>
              <View style={styles.RowBColBColB}>
                <Text>Portfolio (5M)</Text>
              </View>
              <View style={styles.RowBColBColC}>
                <Text>Sub En (5M)</Text>
              </View>
              <View style={styles.RowBColBColD}>
                <Text>Annual Exam (80M)</Text>
              </View>
              <View style={styles.RowBColBColE}>
                <Text>Total Marks (100M)</Text>
              </View>
              <View style={styles.RowBColBColF}>
                <Text>Grade</Text>
              </View>
            </View>
          </View>
          {termI.map((el, i) => (
            <View style={styles.RowC}>
              <View style={styles.RowCColA}>
                <Text>{termI[i]?.courseName.slice(5, 8)}</Text>
              </View>
              <View style={styles.RowCColB}>
                <Text>{termI[i]?.PP?.consolidated}</Text>
              </View>
              <View style={styles.RowCColC}>
                <Text>{termI[i]?.ma?.consolidated}</Text>
              </View>
              <View style={styles.RowCColD}>
                <Text>{termI[i]?.portfolio}</Text>
              </View>
              <View style={styles.RowCColE}>
                <Text>{termI[i]?.suben?.consolidated}</Text>
              </View>
              <View style={styles.RowCColF}>
                <Text>{termI[i]?.writtenTest}</Text>
              </View>
              <View style={styles.RowCColG}>
                <Text>{termI[i]?.totalMarks}</Text>
              </View>
              <View style={styles.RowCColH}>
                <Text>{termI[i]?.grade}</Text>
              </View>
              <View style={styles.RowCColI}>
                <Text>{termII[i]?.PP?.consolidated}</Text>
              </View>
              <View style={styles.RowCColJ}>
                <Text>{termII[i]?.ma?.consolidated}</Text>
              </View>
              <View style={styles.RowCColK}>
                <Text>{termII[i]?.portfolio}</Text>
              </View>
              <View style={styles.RowCColL}>
                <Text>{termII[i]?.suben?.consolidated}</Text>
              </View>
              <View style={styles.RowCColM}>
                <Text>{termII[i]?.writtenTest}</Text>
              </View>
              <View style={styles.RowCColN}>
                <Text>{termII[i]?.totalMarks}</Text>
              </View>
              <View style={styles.RowCColO}>
                <Text>{termII[i]?.grade}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.TableB}>
          <View style={styles.TableBRow}>
            <View style={styles.TableBRowColA}>
              <Text style={{ fontFamily: 'Open Sans Bold' }}>
                Co-Scholasctic Area [on a point 3 (A-C)] grading scale
              </Text>
            </View>
            <View style={styles.TableBRowColB}>
              <Text style={{ fontFamily: 'Open Sans Bold' }}>Term-1</Text>
            </View>
            <View style={styles.TableBRowColC}>
              <Text style={{ fontFamily: 'Open Sans Bold' }}>Term-2 </Text>
            </View>
          </View>
          {termIC &&
            termIC.map((el, i) => (
              <View style={styles.TableBRow}>
                <View style={styles.TableBRowColA}>
                  <Text>{termIC[i]?.courseName}</Text>
                </View>
                <View style={styles.TableBRowColB}>
                  <Text>{termIC[i]?.grade}</Text>
                </View>
                <View style={styles.TableBRowColC}>
                  <Text>{termIIC[i]?.grade}</Text>
                </View>
              </View>
            ))}
        </View>

        <View style={styles.TableC}>
          <View style={styles.TableBRow}>
            <View style={styles.TableBRowColA}>
              <Text style={{ fontFamily: 'Open Sans Bold' }}>
                Discipline [on a point 3 (A-C)] grading scale
              </Text>
            </View>
            <View style={styles.TableBRowColB}>
              <Text style={{ fontFamily: 'Open Sans Bold' }}>Term-1</Text>
            </View>
            <View style={styles.TableBRowColC}>
              <Text style={{ fontFamily: 'Open Sans Bold' }}>Term-2 </Text>
            </View>
          </View>
          {termID &&
            termID?.map((el, i) => (
              <View style={styles.TableBRow}>
                <View style={styles.TableBRowColA}>
                  <Text>{termID[i]?.courseName}</Text>
                </View>
                <View style={styles.TableBRowColB}>
                  <Text>{termID[i]?.grade}</Text>
                </View>
                <View style={styles.TableBRowColC}>
                  <Text>{termIID[i]?.grade}</Text>
                </View>
              </View>
            ))}
        </View>

        <View style={styles.TableD}>
          <Text style={{ fontFamily: 'Open Sans Bold' }}>
            Class Teacher's Remarks :{' '}
          </Text>
          <Text>PROMOTED TO CLASS IX</Text>
        </View>

        <View style={styles.SignatureBox}>
          <View style={styles.SignatureBoxDate}>
            <Text>Date : </Text>
            <Text style={{ fontFamily: 'Open Sans Regular' }}>{toDate()}</Text>
          </View>
          <View style={styles.SignatureBoxParent}>
            <View style={styles.parentSign}>
              <Image
                style={styles.signatureImage}
                src={parentSign && parentSign}
              />
            </View>
            <View style={styles.parentSignText}>
              <Text>Signature of Parent</Text>
            </View>
          </View>
          <View style={styles.SignatureBoxClassTeacher}>
            <View style={styles.parentSign}>
              <Image
                style={styles.signatureImage}
                src={classTeacherSign && classTeacherSign}
              />
            </View>
            <View style={styles.parentSignText}>
              <Text>Signature of Class Teacher</Text>
            </View>
          </View>
          <View style={styles.SignatureBoxPrincipal}>
            <View style={styles.parentSign}>
              <Image
                style={styles.signatureImage}
                src={principalSign && principalSign}
              />
            </View>
            <View style={styles.parentSignText}>
              <Text>Signature of Principal</Text>
            </View>
          </View>
        </View>

        <View style={styles.TableE}>
          <View style={styles.TableERowA}>
            <Text style={{ fontFamily: 'Open Sans Bold' }}>Instructions</Text>
            <Text>
              Grading scale for scholasc areas : Grades are awarded on a 8-point
              grading scale as follows
            </Text>
          </View>
          <View style={styles.TableERowB}>
            <View style={styles.TableERowBColA}>
              <Text>MARKS RANGE</Text>
            </View>
            <View style={styles.TableERowBColB}>
              <Text>91-100</Text>
            </View>
            <View style={styles.TableERowBColC}>
              <Text>81-90</Text>
            </View>
            <View style={styles.TableERowBColD}>
              <Text>71-80</Text>
            </View>
            <View style={styles.TableERowBColE}>
              <Text>61-70</Text>
            </View>
            <View style={styles.TableERowBColF}>
              <Text>51-60</Text>
            </View>
            <View style={styles.TableERowBColG}>
              <Text>41-50</Text>
            </View>
            <View style={styles.TableERowBColH}>
              <Text>33-40</Text>
            </View>
            <View style={styles.TableERowBColI}>
              <Text>32 &amp; Below</Text>
            </View>
          </View>
          <View style={styles.TableERowC}>
            <View style={styles.TableERowCColA}>
              <Text>GRADES</Text>
            </View>
            <View style={styles.TableERowCColB}>
              <Text>A1</Text>
            </View>
            <View style={styles.TableERowCColC}>
              <Text>A2</Text>
            </View>
            <View style={styles.TableERowCColD}>
              <Text>B1</Text>
            </View>
            <View style={styles.TableERowCColE}>
              <Text>B2</Text>
            </View>
            <View style={styles.TableERowCColF}>
              <Text>C1</Text>
            </View>
            <View style={styles.TableERowCColG}>
              <Text>C2</Text>
            </View>
            <View style={styles.TableERowCColH}>
              <Text>D</Text>
            </View>
            <View style={styles.TableERowCColI}>
              <Text>E (Needs Improvement)</Text>
            </View>
          </View>
        </View>

        <View style={styles.TableF}>
          <View style={styles.TableFRowA}>
            <Text>Grading scale for co-scholasc areas : </Text>
            <Text style={{ fontFamily: 'Open Sans Regular' }}>
              Grades are awarded on a 3-point grading scale as follows
            </Text>
          </View>
          <View style={styles.TableFRowB}>
            <View style={styles.TableFRowBColA}>
              <Text>GRADE</Text>
            </View>
            <View style={styles.TableFRowBColB}>
              <Text>GRADE POINTS</Text>
            </View>
            <View style={styles.TableFRowBColC}>
              <Text>GRADE ACHIEVEMENT</Text>
            </View>
          </View>
          <View style={styles.TableFRowB}>
            <View style={styles.TableFRowBColA}>
              <Text>A</Text>
            </View>
            <View style={styles.TableFRowBColB}>
              <Text>3</Text>
            </View>
            <View style={styles.TableFRowBColC}>
              <Text>Outstanding</Text>
            </View>
          </View>
          <View style={styles.TableFRowB}>
            <View style={styles.TableFRowBColA}>
              <Text>B</Text>
            </View>
            <View style={styles.TableFRowBColB}>
              <Text>2</Text>
            </View>
            <View style={styles.TableFRowBColC}>
              <Text>Very Good</Text>
            </View>
          </View>
          <View style={styles.TableFRowB}>
            <View style={styles.TableFRowBColA}>
              <Text>C</Text>
            </View>
            <View style={styles.TableFRowBColB}>
              <Text>1</Text>
            </View>
            <View style={styles.TableFRowBColC}>
              <Text>Fair</Text>
            </View>
          </View>
        </View>

        <View break style={styles.GraphBox}>
          <View style={styles.GraphTittle}>
            <Text>Class Average V/S Student Average</Text>
          </View>

          <View style={styles.Graph}>
            <Svg style={{ position: 'absolute' }} width="540">
              <G style={styles.Grid} id="yGrid">
                <Line x1="20" x2="540" y1="0" y2="0" />
                <Line x1="20" x2="540" y1="50" y2="50" />
                <Line x1="20" x2="540" y1="100" y2="100" />
              </G>
              <G>
                <Text style={styles.GraphSideText} x="0" y="5">
                  100
                </Text>
                <Text style={styles.GraphSideText} x="2" y="45">
                  50
                </Text>
                <Text style={styles.GraphSideText} x="3" y="95">
                  0
                </Text>
              </G>

              {Bar()}
            </Svg>
          </View>

          <View style={styles.GraphColorNote}>
            <Svg style={{ position: 'absolute' }} width="540">
              <Circle cx="50" cy="50" r="4" fill="#6495ED" />
              <Text style={styles.GraphSideText} x="60" y="52">
                Term 1 Avg
              </Text>
              <Circle cx="150" cy="50" r="4" fill="#FF8C00" />
              <Text style={styles.GraphSideText} x="160" y="52">
                Term 1 Student Marks
              </Text>
              <Circle cx="250" cy="50" r="4" fill="#696969" />
              <Text style={styles.GraphSideText} x="260" y="52">
                Term 2 Avg
              </Text>
              <Circle cx="350" cy="50" r="4" fill="#FFCC00" />
              <Text style={styles.GraphSideText} x="360" y="52">
                Term 2 Student Marks
              </Text>
            </Svg>
          </View>

          <View style={styles.disclamer}>
            <Text style={{ fontSize: 7, fontFamily: 'Open Sans Bold' }}>
              Note: P &amp; P = Pen paper test, MA = Multiple Assessment, Sub En
              = Subject Enrichment
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const Bar = () => {
  return (
    <>
      <G>
        <Line
          x1="50"
          x2="50"
          y1="100"
          y2="50"
          strokeWidth={10}
          stroke="#6495ED"
        />
        <Line
          x1="65"
          x2="65"
          y1="100"
          y2="20"
          strokeWidth={10}
          stroke="#FF8C00"
        />
        <Line
          x1="80"
          x2="80"
          y1="100"
          y2="30"
          strokeWidth={10}
          stroke="#696969"
        />
        <Line
          x1="95"
          x2="95"
          y1="100"
          y2="15"
          strokeWidth={10}
          stroke="#FFCC00"
        />
      </G>

      <G>
        <Line
          x1="135"
          x2="135"
          y1="100"
          y2="50"
          strokeWidth={10}
          stroke="#6495ED"
        />
        <Line
          x1="150"
          x2="150"
          y1="100"
          y2="20"
          strokeWidth={10}
          stroke="#FF8C00"
        />
        <Line
          x1="165"
          x2="165"
          y1="100"
          y2="30"
          strokeWidth={10}
          stroke="#696969"
        />
        <Line
          x1="180"
          x2="180"
          y1="100"
          y2="15"
          strokeWidth={10}
          stroke="#FFCC00"
        />
      </G>

      <G>
        <Line
          x1="220"
          x2="220"
          y1="100"
          y2="50"
          strokeWidth={10}
          stroke="#6495ED"
        />
        <Line
          x1="235"
          x2="235"
          y1="100"
          y2="20"
          strokeWidth={10}
          stroke="#FF8C00"
        />
        <Line
          x1="250"
          x2="250"
          y1="100"
          y2="30"
          strokeWidth={10}
          stroke="#696969"
        />
        <Line
          x1="265"
          x2="265"
          y1="100"
          y2="15"
          strokeWidth={10}
          stroke="#FFCC00"
        />
      </G>

      <G>
        <Line
          x1="305"
          x2="305"
          y1="100"
          y2="50"
          strokeWidth={10}
          stroke="#6495ED"
        />
        <Line
          x1="320"
          x2="320"
          y1="100"
          y2="20"
          strokeWidth={10}
          stroke="#FF8C00"
        />
        <Line
          x1="335"
          x2="335"
          y1="100"
          y2="30"
          strokeWidth={10}
          stroke="#696969"
        />
        <Line
          x1="350"
          x2="350"
          y1="100"
          y2="15"
          strokeWidth={10}
          stroke="#FFCC00"
        />
      </G>

      <G>
        <Line
          x1="390"
          x2="390"
          y1="100"
          y2="50"
          strokeWidth={10}
          stroke="#6495ED"
        />
        <Line
          x1="405"
          x2="405"
          y1="100"
          y2="20"
          strokeWidth={10}
          stroke="#FF8C00"
        />
        <Line
          x1="420"
          x2="420"
          y1="100"
          y2="30"
          strokeWidth={10}
          stroke="#696969"
        />
        <Line
          x1="435"
          x2="435"
          y1="100"
          y2="15"
          strokeWidth={10}
          stroke="#FFCC00"
        />
      </G>

      <G>
        <Line
          x1="470"
          x2="470"
          y1="100"
          y2="50"
          strokeWidth={10}
          stroke="#6495ED"
        />
        <Line
          x1="485"
          x2="485"
          y1="100"
          y2="20"
          strokeWidth={10}
          stroke="#FF8C00"
        />
        <Line
          x1="500"
          x2="500"
          y1="100"
          y2="30"
          strokeWidth={10}
          stroke="#696969"
        />
        <Line
          x1="515"
          x2="515"
          y1="100"
          y2="15"
          strokeWidth={10}
          stroke="#FFCC00"
        />
      </G>

      <G>
        <Text style={styles.GraphSideText} x="60" y="110" />
        <Text style={styles.GraphSideText} x="140" y="110" />
        <Text style={styles.GraphSideText} x="222" y="110" />
        <Text style={styles.GraphSideText} x="320" y="110" />
        <Text style={styles.GraphSideText} x="392" y="110" />
        <Text style={styles.GraphSideText} x="472" y="110" />
      </G>
    </>
  );
};

var toDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
};
