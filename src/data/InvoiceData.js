import React, { useState, useEffect } from "react";
import axios from "axios";
import Invoice from "./Invoice";

export default function InvoiceData({ signedIn, invoiceUuId, clientId }) {
  const [userInfo, setUserInfo] = useState(undefined);

  // const [] = useState(undefined);
  //axios get invoice information
  // on the server side this will need to be a joined query
  //or multiple queries that display
  //User info, for 'Remit To:'
  //Customer info for 'Bill To:' Change Foreign Key on Invoices Table
  //to get customer ID - that way a JOIN can be done for Customer info
  //ON customer_id
  //Invoice and Order information JOIN on server side on invoice_uuid
  //get invoice customer - Join invoice and customer on Bill To
  // and return customer info where customer_name
  useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/user", {
          token,
        });
        setUserInfo(response.data);
        // console.log("this is the response", response);
        // console.log('current user log', currentUser);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [invoiceInfo, setInvoiceInfo] = useState(undefined);
  useEffect(() => {
    (async function () {
      // gets customer address
      try {
        const currentUuid = invoiceUuId;
        const currentInvoice = await axios.post(
          "http://localhost:4000/get-invoice-info",
          {
            currentUuid,
            token: signedIn.signInUserSession.idToken.jwtToken,
          }
        );
        setInvoiceInfo(currentInvoice.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [orderInfo, setOrderInfo] = useState(undefined);
  useEffect(() => {
    (async function () {
      // gets customer address
      try {
        const orderUuid = invoiceUuId;
        const response = await axios.post(
          "http://localhost:4000/get-order-info",
          {
            orderUuid,
            token: signedIn.signInUserSession.idToken.jwtToken,
          }
        );
        setOrderInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [customerInfo, setCustomerInfo] = useState(undefined);
  useEffect(() => {
    (async function () {
      // gets customer address
      try {
        const currentCustomer = clientId;
        // console.log(currentCustomer);
        const response = await axios.post(
          "http://localhost:4000/get-customer-info",
          {
            currentCustomer,
            token: signedIn.signInUserSession.idToken.jwtToken,
          }
        );
        setCustomerInfo(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {userInfo && customerInfo && invoiceInfo && orderInfo && (
        <Invoice
          userInfo={userInfo}
          customerInfo={customerInfo}
          invoiceInfo={invoiceInfo}
          orderInfo={orderInfo}
        />
      )}
    </div>
  );
}
