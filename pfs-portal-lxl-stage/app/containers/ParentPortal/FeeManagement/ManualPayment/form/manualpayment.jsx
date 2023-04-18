import React, { useState, useEffect } from "react";
import KenInputField from "../../../../../components/KenInputField";
import KenButton from "../../../../../global_components/KenButton";
import KenSelect from "../../../../../global_components/KenSelect";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow:"none",
  },
  button:{
    //  paddingTop:"10px",
    textAlign:"center",
    alignSelf:"center",
    paddingBottom:"15px",
    padding:"5px",
  },
  form:{
    backgroundColor:"#fff"
  }
}));

const Form = () => {
  const classes = useStyles();
  const intialValues = { email: "", password: "" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(formValues);
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container">
      <h1>Manual Payment Form</h1>
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">Form submitted successfully</span>
      )}
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= "Contact Name"
            type="ContactName"
            name="ContactName"
            id="ContactName"
            value={formValues.ContactName}
            onChange={handleChange}
            className={formErrors.ContactName && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= "Planned Payment"
            type="plannedPayment"
            name="plannedPayment"
            id="plannedPayment"
            value={formValues.plannedPayment}
            onChange={handleChange}
            className={formErrors.plannedPayment && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= " Remark / Transaction Details"
            type="remarks"
            name="remarks"
            id="remarks"
            value={formValues.remarks}
            onChange={handleChange}
            className={formErrors.remarks && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenSelect
          required={true}
            label= "Fee Type"
            type="feeType"
            name="feeType"
            id="feeType"
            value={formValues.feeType}
            onChange={handleChange}
            // className={formErrors.feeType && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= "Fee Start Date"
            type="feeStartDate"
            name="feeStartDate"
            id="feeStartDate"
            value={formValues.feeStartDate}
            onChange={handleChange}
            className={formErrors.feeStartDate && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenSelect
           required={true}
            label= "Transaction Type"
            type="transactionType"
            name="transactionType"
            id="transactionType"
            value={formValues.transactionType}
            onChange={handleChange}
            className={formErrors.transactionType && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= "Payment Date"
            type="paymentDate"
            name="paymentDate"
            id="paymentDate"
            value={formValues.paymentDate}
            onChange={handleChange}
            className={formErrors.paymentDate && "input-error"}
          />
          </Paper>
        </Grid><Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= "Payment Amount"
            type="paymentAmount"
            name="paymentAmount"
            id="paymentAmount"
            value={formValues.paymentAmount}
            onChange={handleChange}
            className={formErrors.paymentAmount && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= "Late Fee"
            type="lateFee"
            name="lateFee"
            id="lateFee"
            value={formValues.lateFee}
            onChange={handleChange}
            className={formErrors.lateFee && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= "Demanded Currency"
            type="demandedCurrency"
            name="demandedCurrency"
            id="demandedCurrency"
            value="INR"
            onChange={handleChange}
            className={formErrors.demandedCurrency && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenSelect
           required={true}
            label= "Currency of Payment"
            type="currencyOfPayment"
            name="currencyOfPayment"
            id="currencyOfPayment"
            value={formValues.currencyOfPayment}
            onChange={handleChange}
            className={formErrors.currencyOfPayment && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenSelect
           required={true}
            label= "Mode of Payment"
            type="modeOfPayment"
            name="modeOfPayment"
            id="modeOfPayment"
            value={formValues.modeOfPayment}
            onChange={handleChange}
            className={formErrors.modeOfPayment && "input-error"}
          />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <KenInputField
            label= "Total Amount"
            type="totalAmount"
            name="totalAmount"
            id="totalAmount"
            value={formValues.totalAmount}
            onChange={handleChange}
            className={formErrors.totalAmount && "input-error"}
          />
          </Paper>
        </Grid>
        </Grid>
        <Grid item xs={12} className={classes.button}>
        <KenButton
        variant="primary">
        Submit
        </KenButton>
        </Grid>
        </div>
      </form>
    </div>
  );
};

export default Form;
