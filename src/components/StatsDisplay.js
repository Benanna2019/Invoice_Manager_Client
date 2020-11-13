import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(8),
      width: theme.spacing(22),
      height: theme.spacing(22),
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  custct: {
    fontSize: "54px",
    color: "#2f8f49",
  },
}));

export default function StatsDisplay({ signedIn, setSignedIn }) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [clientCount, setClientCount] = useState([]);
  const [invoiceCount, setInvoiceCount] = useState([]);
  const [servicesProvided, setServicesProvided] = useState(undefined);
  const [orderData, setOrderData] = useState(undefined);

  const classes = useStyles();

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }

  useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/user", {
          token,
        });
        setCurrentUser(response.data);
        // console.log("this is the response", response);
        // console.log('current user log', currentUser);

        customerCount(token);
        invoiceCnt(token);
        moneyMade(token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function customerCount(token) {
    // gets customer address

    let count = await axios.post("http://localhost:4000/customer-count", {
      token: signedIn.signInUserSession.idToken.jwtToken,
    });

    let result = count.data[0][0].TotalCustomers;
    // let finalResult = JSON.parse(result);
    // let value = finalResult[0][0].TotalCustomers;
    console.log(result);
    // console.log(finalResult);
    // console.log(value);
    setClientCount(result);
  }

  async function invoiceCnt(token) {
    // gets customer address

    let count = await axios.post("http://localhost:4000/invoice-count", {
      token: signedIn.signInUserSession.idToken.jwtToken,
    });

    let result = count.data[0][0].TotalInvoices;
    // let finalResult = JSON.parse(result);
    // let value = finalResult[0][0].TotalCustomers;
    console.log(result);
    // console.log(finalResult);
    // console.log(value);
    setInvoiceCount(result);
  }

  async function moneyMade(token) {
    // gets customer address

    let count = await axios.post("http://localhost:4000/services-provided", {
      token: signedIn.signInUserSession.idToken.jwtToken,
    });

    let result = count.data;
    // let finalResult = JSON.parse(result);
    // let value = finalResult[0][0].TotalCustomers;
    // console.log(nFormatter(result));
    // console.log(finalResult);
    // console.log(value);
    setServicesProvided(result);
    console.log(result);
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.content}>
        <h4>Total Customers</h4>
        <div>
          <div className={classes.custct}>{clientCount}</div>
        </div>
      </Paper>
      <Paper elevation={3} className={classes.content}>
        <h4>Total Invoices</h4>
        <div>
          <div className={classes.custct}>{invoiceCount}</div>
        </div>
      </Paper>
      <Paper elevation={3} className={classes.content}>
        <h4>Services Provided</h4>
        <div>
          <div className={classes.custct}>${servicesProvided}</div>
        </div>
      </Paper>
      <Paper elevation={3} />
    </div>
  );
}
