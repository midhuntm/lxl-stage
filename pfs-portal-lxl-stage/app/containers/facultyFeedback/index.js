import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Box, Typography ,Radio,} from '@material-ui/core';
// import { getFeeInventoryByContact } from '../../../../utils/ApiService';
import { useTranslation } from 'react-i18next';
import KenButton from '../../global_components/KenButton';
import KenCard from '../../global_components/KenCard';
import KenCheckbox from '../../global_components/KenCheckbox/index';
import KenGrid from '../../global_components/KenGrid';
import KenSelect from '../../components/KenSelect';
import ContactCell from '../../global_components/KenGrid/components/ContactCell';
import KenLoader from '../../components/KenLoader';
import TableData from './data.json';
// import ApiData from './apiData.json';
// import Routes from '../../../../utils/routes.json';
// import { Link } from 'react-router-dom';
// import '../style.scss';
// import { useAppContext } from '../../../../utils/contextProvider/AppContext';
// import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '../../assets/icons/Editbig.svg';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    name: {
        textAlign: 'left',
        marginLeft: 38,
        color: theme.palette.KenColors.neutral400,
        fontSize: 10,
    },
    cartHeader: {
        backgroundColor: theme.palette.KenColors.kenWhite,
        height: 50,
        justifyContent: "space-between",
        display: 'flex',
        paddingRight: 10
    },
    cartBody: {
        padding: "20px",
    position: "relative",
    backgroundColor: "#edeff1"
    },
    cardTitle: {
        lineHeight: "50px",
        // color: "#00218D",
        fontSize: '14px',
    },
    studentInfo: {
        // color: "#00218D",
        fontSize: '14px',
        width:"25%",
        textAlign:"left"
    },
    tableComponent: {
        marginBottom: 10
    },
    totalAmt: {
        color: '#00218D',
        fontSize: 13,
        fontFamily: 'Open Sans',
        textDecoration: 'uppercase',
        fontWeight: 600,
        textAlign: 'center',
        marginRight: 98
    },
    totalTitle: {
        width: '100%',
        position: 'relative',
        height: 50
    },
    totalAmtTitle: {
        float: 'left',
        width: '27%',
        textAlign: 'center'
    },
    amountSection: {
        display: 'flex',
        width: '67%',
        boxSizing: 'border-box',
        position: 'absolute',
        left: '33%'
    },
    amtTable: {
        width: '100%',
        height: 10
    },
    amtTD: {
        textAlign: 'center',
        color: '#00218D',
        fontSize: 13,
        fontFamily: 'Open Sans',
        textDecoration: 'uppercase',
        fontWeight: 600,
    },
    tableData:{
        width:"20%",
        textAlign:"left"
    },
    tableData1:{
        width:"80%",
        textAlign:"left"
    },
    spanFacultyText:{
         color: "#00218D",
         fontSize: '14px',
    },
    icons: {
        marginRight: '5px',
        color:"#fff"
      },
}))
function formatCurrency(type, amount) {
    let currencyFormat;
    if (type === "INR") { currencyFormat = "en-IN"; }
    else { currencyFormat = "en-US"; }
    return (new Intl.NumberFormat(currencyFormat, {
        style: 'currency',
        currency: type,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount))
}

const MyCart = props => {
    const [data, setData] = useState(TableData);
    const [collectionFrequencyOptions, setCollectionFrequencyOptions] = useState([]) //["Yearly", "Half-Yearly", "Quartly", "Monthly"]
    const [loading, setLoading] = useState();
    const [regID, setRegID] = useState("-");
    const [studentName, setStudentName] = useState("-");
    const [studentClass, setStudentClass] = useState("-");
    const [totalFee, setTotalFee] = useState(formatCurrency('INR', 0));
    const [paidFee, setPaidFee] = useState(formatCurrency('INR', 0));
    const [studentCategory, setStudentCategory] = useState("-");
    const [admissionYear, setAdmissionYear] = useState("-");
    const [totalAmount, setTotalAmount] = useState(formatCurrency('INR', 0));
    const [totalFeeAmount, setTotalFeeAmount] = useState();
    const [totalTaxAmount, setTotalTaxAmount] = useState(formatCurrency('INR', 0));
    const [hideTax, setHideTax] = useState(true);
    // const { state: { userDetails }, } = useAppContext();
    const { t } = useTranslation();
    const classes = useStyles();
    const columns = [
        {
            Header: '',
            accessor: 'checked',
            Cell: ({ value, row }) => {
                return (
                    <KenCheckbox
                        name={`checkbox`}
                        className={classes.checkbox}
                        value={value}
                        disabled={data[row.index]["IsMan__c"]}
                        onChange={(event) => selectedCheckBoxItem(event, row, data)}
                        color='primary'
                    />
                );
            },
            disableGlobalFilter: true,
        },
        {
            Header: 'Fee Type',
            accessor: 'Fee_Type_Name__c',
            disableGlobalFilter: true,
        },
        {
            Header: 'Fee Type ID',
            accessor: 'fee_type_id',
            disableGlobalFilter: true,
        },
        {
            Header: 'Net Fee Amount (₹)',
            accessor: 'Fee_Amount__c',
            disableGlobalFilter: true,
        },
        {
            Header: 'Collection Frequency',
            accessor: 'CollectionFrequency',
            Cell: ({ value, row }) => {
                return (
                    <div className="input-field-item" >
                        <KenSelect
                            placeholder="Select"
                            inputBaseRootClass={classes.inputBaseClass}
                            options={collectionFrequencyOptions}
                            name="collectionFrequency"
                            value={value}
                            variant="outline"
                            onChange={e => {
                                handleCollectionFrequency(e.target.value);
                            }}
                        />
                    </div>
                );
            },
            disableGlobalFilter: true,
        },
    ];

    useEffect(() => {
        // setLoading(true)
        // const params = userDetails.ContactId;
        // getFeeInventoryByContact(params).then(res => {
        //     setLoading(false)
        //     if (res.success) {
        //         let apiResponse = res?.['Data '];
        //         let tableData = [];
        //         apiResponse.map(value => {
        //             tableData.push({ ...value.FeeInv, checked: value?.FeeInv['IsMan__c'] })
        //         })
        //         let tableHeader = apiResponse[0]?.c;
        //         setRegID(tableHeader['Registration_Number__c']);
        //         setStudentCategory(tableHeader['Fee_Category_of_the_Students__c']);
        //         setAdmissionYear(tableHeader['Year_of_Joining__c']);
        //         setData(tableData);
        //         let collectionFrequencyItems = apiResponse[0]?.FeeSchedule;
        //         setCollectionFrequencyOptions(collectionFrequencyItems)
        //         if (res?.['Data '].length > 0) {
        //             setLoading(false)
        //             let totalFeeAmt = tableData.reduce((sum, row) => row.Fee_Amount__c + sum, 0)
        //             setTotalFeeAmount(formatCurrency('INR', totalFeeAmt))
        //         }
        //     }
        // }).catch(err => {
        //     setLoading(false)
        // })
    }, [])

    const moveNext = () => {
    };
    const handleCollectionFrequency = (event) => {
        console.log("handleCollectionFrequency", event)
    }
    const selectedCheckBoxItem = (event, row, data) => {
        // var amount = totalAmount.split('₹')[1].replace(/,/g, "");
        // amount = Number(amount);
        if (!data[row.index]["IsMan__c"]) {
            data[row.index]["checked"] = event.target.checked;
            setData([...data]);
        }
        console.log("data", data);
    }

    const radioValue = [
        {id:1,value:false},  {id:2,value:false},  {id:3,value:false},  {id:4,value:false},  {id:5,value:false},
    ]
    const [radioVal,setRadioVal] =useState([{id:1,value:false},  {id:2,value:false},  {id:3,value:false},  {id:4,value:false}, ])
    const radioChange =(e,i,item) =>{
//   const tempVal = [...radioVal];
//   tempVal[i] ={...tempVal[i],[e.target.name] : true}
//   setRadioVal(tempVal)
    }
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
    
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                style={{ minHeight: '76vh' }}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }
    const data1 = [
        {
            title: "Faculty Feedback",
        },
        {
            title: "Department Feedback",
        },
        {
            title: "Central Facilities FeedBack",
        },

    ]
    const [facultyView, setFacultyView]= React.useState(false);
    const [centralView, setCentalView]= React.useState(false);
    const onFacultyChange =() =>{
        setFacultyView(true)
    }
    const onchangeCentralView = () =>{
        setCentalView(true)
    }
    return (
        <div className={classes.root}>
            {loading && <KenLoader />}
            <div className={classes.root}>
            <Grid container direction="row" justify="space-between" style={{width:"100%"}}>
            <KenCard paperStyles={{ padding: 16 }}>
                <Grid item style={{width:"100%"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="off"
                        aria-label="full width tabs example"
                        
                    >
                        {data1.map((el, index) => {
                            return <Tab  classes={{ wrapper: classes.wrapper }} label={el.title} {...a11yProps(index)} />
                        })}


                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                        {facultyView != true ?(
                        <Grid container spacing={2} style={{width:"100%"}}>
                        
                            <div className={classes.tableComponent} style={{width:"100%"}}>
                            {/* {data.length > 0 ? */}
                                <KenCard paperStyles={{ padding: 16 }}>
                                    {/* <KenGrid columns={columns} data={data} pagination={{ disabled: true }} tableTotal={{ disabled: true, checkbox: true }} getRowProps={{ selected: true }} toolbarDisabled={true} /> */}
                                    <table className={classes.amtTable}>
                                    <Box pl={1} className={classes.cartBody}>
                                    <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10 }}>
                                               <th className={classes.studentInfo} style={{width:"8%"}}>Sr.Number</th>
                                               <th className={classes.studentInfo} style={{width:"20%"}}>Faculty Name</th>
                                               {/* <th className={classes.studentInfo}style={{width:"20%"}}>Subject Code</th> */}
                                               <th className={classes.studentInfo} style={{width:"20%"}}>Subject Name</th>
                                            </tr>
                                            </Box>
                                        <tbody onClick={onFacultyChange}>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10,padding:"20px" }}> 
                                               <td className={classes.tableData} style={{width:"8%"}}>1</td>
                                               <td className={classes.tableData}>Arpitha Devangavi</td>
                                               {/* <td className={classes.tableData}>MBA-001</td> */}
                                               <td className={classes.tableData}>Object Oriented Programming using C++</td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10,padding:"20px" }}> 
                                               <td className={classes.tableData} style={{width:"8%"}}>2</td>
                                               <td className={classes.tableData}>Priya Sambashivam</td>
                                               {/* <td className={classes.tableData}>MBA-002</td> */}
                                               <td className={classes.tableData}>PROBLEM SOLVING SKILL USING C</td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10,padding:"20px" }}> 
                                               <td className={classes.tableData} style={{width:"8%"}}>3</td>
                                               <td className={classes.tableData}>Priya Sambashivam</td>
                                               {/* <td className={classes.tableData}>MBA-003</td> */}
                                               <td className={classes.tableData}>Software Engineering</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </KenCard>
                                {/* : null} */}
                        </div>
                            </Grid>) :
                           ( <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                    <Box pl={1} className={classes.cartHeader}>
                        <Typography className={classes.cardTitle}>
                              Faculty Feedback <span className={classes.spanFacultyText}> Mantraraj</span>
                        </Typography>
                       
                    </Box>
                </Grid> */}
           
                <Grid item md={12}>
                        
                        {/* <hr style={{ backgroundColor: '#092682' }} /> */}

                        <div className={classes.tableComponent}>
                            {/* {data.length > 0 ? */}
                            {/* <KenButton
                            className={classes.btnLabels} onClick={moveNext}
                            variant="primary" style={{ height: 36, float: "right",margin:10 }}>
                            <img src={EditIcon} className={classes.icons} /> Edit
                        </KenButton> */}
                                <KenCard paperStyles={{ padding: 16 }}>
                               
                                    {/* <KenGrid columns={columns} data={data} pagination={{ disabled: true }} tableTotal={{ disabled: true, checkbox: true }} getRowProps={{ selected: true }} toolbarDisabled={true} /> */}
                                    <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10 }}>
                            <Typography className={classes.studentInfo}>
                            Name of  the Faculty : <span className={classes.spanFacultyText}> Arpitha Devangavi</span>
                            </Typography>
                            <Typography className={classes.studentInfo}>
                             Subject Name :<span className={classes.spanFacultyText}>  C++</span>
                            </Typography>
                            <Typography className={classes.studentInfo}>
                             Subject Code: <span className={classes.spanFacultyText}>Soft-0001</span>
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: 15 ,marginTop:15}}>
                            <Typography className={classes.studentInfo}>
                             Department Name :<span className={classes.spanFacultyText}> Software Programming</span>
                            </Typography>
                            <Typography className={classes.studentInfo}>
                             Department Code : <span className={classes.spanFacultyText}>EST</span>
                            </Typography>
                            <Typography className={classes.studentInfo}>
                            </Typography>
                        </div>
                                   
                                    <table className={classes.amtTable}>
                                    <Box pl={1} className={classes.cartBody}>
                                    <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10 }}>
                                               <th className={classes.tableData}>Parameters</th>
                                               <th className={classes.tableData1} style={{textAlign:"center"}}>Rating</th>
                                               {/* <th className={classes.studentInfo}>Submit Date</th>
                                               <th className={classes.studentInfo}>Last Modified Date</th> */}
                                            </tr>
                                            </Box>
                                        <tbody>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Command over the Subject</td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name="radio"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Communication</td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Class Control</td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Punctuality</td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Online Conduction </td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name={"value" + i} value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </KenCard>
                                {/* : null} */}
                        </div>

                        {/* <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                            {/* <KenButton
                                className={classes.btnLabels} onClick={moveNext}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Next')}
                            </KenButton> 
                            <KenButton
                                className={classes.btnLabels} onClick={moveNext}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Save')}
                            </KenButton>
                            <KenButton
                                className={classes.btnLabels} onClick={moveNext}
                                variant="primary" style={{ height: 36, marginRight: "10px" }}>
                                {t('labels:Edit')}
                            </KenButton>
                        </div> */}

                    {/* </Box> */}
                </Grid>
            </Grid>)}
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <Box>
                            <Grid container spacing={2}>
                
                <Grid item md={12}>
                        
                        {/* <hr style={{ backgroundColor: '#092682' }} /> */}

                        <div className={classes.tableComponent}>
                            {/* {data.length > 0 ? */}
                            {/* <KenButton
                            className={classes.btnLabels} onClick={moveNext}
                            variant="primary" style={{ height: 36, float: "right",margin:10 }}>
                            <img src={EditIcon} className={classes.icons} /> Edit
                        </KenButton> */}
                                <KenCard paperStyles={{ padding: 16 }}>
                               
                                    {/* <KenGrid columns={columns} data={data} pagination={{ disabled: true }} tableTotal={{ disabled: true, checkbox: true }} getRowProps={{ selected: true }} toolbarDisabled={true} /> */}
                                    <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10 }}>
                            <Typography className={classes.studentInfo}>
                            Name of the Department : <span className={classes.spanFacultyText}> Management Studies</span>
                            </Typography>
                            <Typography className={classes.studentInfo}>
                            Deparment Code :<span className={classes.spanFacultyText}> DMS</span>
                            </Typography>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: 15 ,marginTop:15}}>
                            <Typography className={classes.studentInfo}>
                             Department Name :<span className={classes.spanFacultyText}> Library</span>
                            </Typography>
                            <Typography className={classes.studentInfo}>
                             Department Code : <span className={classes.spanFacultyText}>EST</span>
                            </Typography>
                            <Typography className={classes.studentInfo}>
                            </Typography>
                        </div> */}
                                   
                                    <table className={classes.amtTable}>
                                    <Box pl={1} className={classes.cartBody}>
                                    <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10 }}>
                                               <th className={classes.tableData}>Parameters</th>
                                               <th className={classes.tableData1} style={{textAlign:"center"}}>Rating</th>
                                               {/* <th className={classes.studentInfo}>Submit Date</th>
                                               <th className={classes.studentInfo}>Last Modified Date</th> */}
                                            </tr>
                                            </Box>
                                        <tbody>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Quality of Faculties</td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name="radio"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Flexibility of Curriculum</td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Relevance of Curriculum</td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Industry Exposer </td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                               <td className={classes.tableData} style={{padding:"10px"}}>Infrastructure </td>
                                               <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                               {radioVal.map((item,i) =>{
                                                   return (
                                                     <div key={i} >
                                                         {item.id}<Radio color="primary" name={"value" + i} value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                     </div>
                                                   );
                                               })}
                                               </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </KenCard>
                                {/* : null} */}
                        </div>

                </Grid>
            </Grid>          
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            
                            <Grid container spacing={2} style={{width:"100%"}}>
                            {centralView != true ?(
                            <div className={classes.tableComponent} style={{width:"100%"}}>
                            {/* {data.length > 0 ? */}
                                <KenCard paperStyles={{ padding: 16 }}>
                                    {/* <KenGrid columns={columns} data={data} pagination={{ disabled: true }} tableTotal={{ disabled: true, checkbox: true }} getRowProps={{ selected: true }} toolbarDisabled={true} /> */}
                                    <table className={classes.amtTable}>
                                    <Box pl={1} className={classes.cartBody}>
                                    <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10 }}>
                                               <th className={classes.studentInfo} style={{width:"16%"}}>Sr.Number</th>
                                               <th className={classes.studentInfo}>Facility Name</th>
                                               <th className={classes.studentInfo}>Department</th>
                                               <th className={classes.studentInfo}>Department Code</th>
                                            </tr>
                                            </Box>
                                        <tbody onClick={onchangeCentralView}>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10,padding:"20px" }}> 
                                               <td className={classes.tableData} style={{width:"8%"}}>1</td>
                                               <td className={classes.tableData}>Library</td>
                                               <td className={classes.tableData}>Library</td>
                                               <td className={classes.tableData}>LIB</td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10,padding:"20px" }}> 
                                               <td className={classes.tableData} style={{width:"8%"}}>2</td>
                                               <td className={classes.tableData}>Sports Ground</td>
                                               <td className={classes.tableData}>Estate Department</td>
                                               <td className={classes.tableData}>EST</td>
                                            </tr>
                                            <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10,padding:"20px" }}> 
                                               <td className={classes.tableData}style={{width:"8%"}}>3</td>
                                               <td className={classes.tableData}>Auditorium Facilities</td>
                                               <td className={classes.tableData}>Estate Department</td>
                                               <td className={classes.tableData}>EST</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </KenCard>
                                {/* : null} */}
                        </div>):(
                            <Grid item md={12}>
                        
                            {/* <hr style={{ backgroundColor: '#092682' }} /> */}
    
                            <div className={classes.tableComponent}>
                                {/* {data.length > 0 ? */}
                                {/* <KenButton
                                className={classes.btnLabels} onClick={moveNext}
                                variant="primary" style={{ height: 36, float: "right",margin:10 }}>
                                <img src={EditIcon} className={classes.icons} /> Edit
                            </KenButton> */}
                                    <KenCard paperStyles={{ padding: 16 }}>
                                   
                                        {/* <KenGrid columns={columns} data={data} pagination={{ disabled: true }} tableTotal={{ disabled: true, checkbox: true }} getRowProps={{ selected: true }} toolbarDisabled={true} /> */}
                                        <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10 }}>
                                <Typography className={classes.studentInfo}>
                                Name of  the Facility : <span className={classes.spanFacultyText}> Library</span>
                                </Typography>
                                <Typography className={classes.studentInfo}>
                                Deparment :<span className={classes.spanFacultyText}> Library</span>
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: 15 ,marginTop:15}}>
                                {/* <Typography className={classes.studentInfo}>
                                 Department Name :<span className={classes.spanFacultyText}> Library</span>
                                </Typography>*/}
                                <Typography className={classes.studentInfo}> 
                                 Department Code : <span className={classes.spanFacultyText}>LIB</span>
                                </Typography>
                                <Typography className={classes.studentInfo}>
                                </Typography>
                            </div>
                                       
                                        <table className={classes.amtTable}>
                                        <Box pl={1} className={classes.cartBody}>
                                        <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10 }}>
                                                   <th className={classes.tableData}>Parameters</th>
                                                   <th className={classes.tableData1} style={{textAlign:"center"}}>Rating</th>
                                                   {/* <th className={classes.studentInfo}>Submit Date</th>
                                                   <th className={classes.studentInfo}>Last Modified Date</th> */}
                                                </tr>
                                                </Box>
                                            <tbody>
                                                <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                                   <td className={classes.tableData} style={{padding:"10px"}}>Book Catalogue</td>
                                                   <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                                   {radioVal.map((item,i) =>{
                                                       return (
                                                         <div key={i} >
                                                             {item.id}<Radio color="primary" name="radio"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                         </div>
                                                       );
                                                   })}
                                                   </td>
                                                </tr>
                                                <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                                   <td className={classes.tableData} style={{padding:"10px"}}>Journal Subscriptions</td>
                                                   <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                                   {radioVal.map((item,i) =>{
                                                       return (
                                                         <div key={i} >
                                                             {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                         </div>
                                                       );
                                                   })}
                                                   </td>
                                                </tr>
                                                <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                                   <td className={classes.tableData} style={{padding:"10px"}}>Magazine Subscription</td>
                                                   <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                                   {radioVal.map((item,i) =>{
                                                       return (
                                                         <div key={i} >
                                                             {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                         </div>
                                                       );
                                                   })}
                                                   </td>
                                                </tr>
                                                <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                                   <td className={classes.tableData} style={{padding:"10px"}}>Ease of Accessing Resources </td>
                                                   <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                                   {radioVal.map((item,i) =>{
                                                       return (
                                                         <div key={i} >
                                                             {item.id}<Radio color="primary" name="value"  value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                         </div>
                                                       );
                                                   })}
                                                   </td>
                                                </tr>
                                                <tr style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, }}> 
                                                   <td className={classes.tableData} style={{padding:"10px"}}>Remote Acess of Library </td>
                                                   <td className={classes.tableData1} style={{display:"flex",justifyContent:"space-evenly"}}>
                                                   {radioVal.map((item,i) =>{
                                                       return (
                                                         <div key={i} >
                                                             {item.id}<Radio color="primary" name={"value" + i} value={item.value} onChange={(e) =>{ radioChange(e,i,item)}} />
                                                         </div>
                                                       );
                                                   })}
                                                   </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </KenCard>
                                    {/* : null} */}
                            </div>
    
                    </Grid> 
                        )}

                            </Grid>
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
                </KenCard>
            </Grid>
        </div>
           
        </div>
    )
};
export default MyCart;