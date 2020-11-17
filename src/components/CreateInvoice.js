//component to create an invoice
//have fields that they can fill in that, once done, creates a 'pretty'
//invoice to send to customer

//have a drag and drop feature
import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "uuid/dist/v4";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import InvoiceRenderer from "./InvoiceRenderer";
import InvoiceData from "../data/InvoiceData";
import "../styles/create-invoice.css";

export default function CreateInvoice({
  signedIn,
  setSignedIn,
  refresh,
  setRefresh,
}) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userClients, setUserClients] = useState(undefined);
  const [invoiceUuId, setInvoiceUuId] = useState(undefined);
  const [clientId, setClientId] = useState(undefined);
  const [orders, setOrders] = useState([{}, {}, {}, {}, {}]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [required, setRequired] = useState(false);

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

        getCustomers(token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // function getDate() {
  //   let today = new Date();
  //   let dd = today.getDate();
  //   let mm = today.getMonth() + 1;
  //   let yyyy = today.getFullYear();
  //   if (dd < 10) {
  //     dd = "0" + dd;
  //   }
  //   if (mm < 10) {
  //     mm = "0" + mm;
  //   }
  //   today = mm + "." + dd + "." + yyyy;
  //   console.log(today);
  // }

  function onRowChange(e, key, orderIndex) {
    setOrders(
      orders.map((order, index) => {
        if (index === orderIndex) {
          return { ...order, [key]: e.target.value };
        }
        // if (orderIndex === 0) [
        // ]
        return order;
      })
    );
  }

  async function getCustomers(token) {
    // gets customer address

    const customers = await axios.post(
      "http://localhost:4000/customer-search",
      {
        token: signedIn.signInUserSession.idToken.jwtToken,
      }
    );
    setUserClients(customers.data);
  }

  function addInvoice(e) {
    try {
      e.preventDefault();
      // console.log(e.target.elements.files);
      // console.log(e.target.elements.mainFile.files[0]);

      const invoiceUuid = uuid();
      const billTo = e.target.elements.billTo.value;
      const orderDescription = e.target.elements.orderDescription.value;
      console.log(billTo);
      setClientId(billTo);
      setInvoiceUuId(invoiceUuid);

      // setInvoiceUuid(invoiceUuid);
      // const quantity = e.target.elements.quantity.value;
      // const itemDescription = e.target.elements.itemDescription.value;
      // const cost = e.target.elements.cost.value;
      // console.log(invoiceUuid);
      axios
        .post("http://localhost:4000/create-invoice", {
          invoiceUuid,
          billTo,
          orderDescription,
          token: signedIn.signInUserSession.idToken.jwtToken,
        })
        .then((invoiceResp) => {
          console.log(invoiceResp);
          (function () {
            //map through array of orders and add order to table
            Promise.all(
              orders.map(async (order) => {
                if (order.itemDescription && order.quantity && order.cost) {
                  return await axios.post("http://localhost:4000/add-order", {
                    itemDescription: order.itemDescription,
                    quantity: order.quantity,
                    cost: order.cost,
                    invoiceUuid,
                    token: signedIn.signInUserSession.idToken.jwtToken,
                  });
                }
              })
            )
              .then((resp) => {
                window.alert("order created");
                setIsSubmitted(true);
                setRefresh(!refresh);
              })
              .catch((error) => {
                console.log("This is the", error);
                window.alert("There is an error", error);
              });

            // console.log(invoiceResp);
          })();
        })
        .catch((error) => {
          console.log(error);
          window.alert("You have an error", error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(orders);

  if (isSubmitted) {
    return (
      <>
        {signedIn && invoiceUuId && clientId && (
          <ListItem button>
            <InvoiceData
              signedIn={signedIn}
              invoiceUuId={invoiceUuId}
              clientId={clientId}
            />
            <ListItemText primary="Generate Invoice" />
          </ListItem>
        )}
      </>
    );
  }
  return (
    <form className="invoice-container" onSubmit={(e) => addInvoice(e)}>
      <div className="invoice-content">
        <div className="form-content">
          <h2>New Order</h2>

          <div className="header-info">
            {/* <input
              placeholder="Today's Date"
              id="date"
              // defaultValue={(date) => getDate(date)}
            /> */}
            {/* A Simple Date.now() with some logic to change Date format */}
            <select id="billTo">
              Select Customer
              {userClients &&
                userClients.map((client) => (
                  <option value={client.id}>{client.customer_name}</option>
                ))}
            </select>
            <div className="order-summary">
              <input
                placeholder="Order Summary"
                required
                id="orderDescription"
              />
            </div>
          </div>
          {/* Bill To Can be a search that references a customer's address  */}

          {[0, 1, 2, 3, 4].map((orderIndex) => (
            <div className="invoice-add-items">
              <input
                placeholder="Item Description"
                id={`orderDescription${orderIndex}`}
                // {...(orderIndex == 0 ? "required" : "")}
                onChange={(e) => onRowChange(e, "itemDescription", orderIndex)}
              />
              <input
                placeholder="Quantity"
                id={`quantity${orderIndex}`}
                onChange={(e) => onRowChange(e, "quantity", orderIndex)}
              />
              <input
                placeholder="Cost Per Item"
                id={`cost${orderIndex}`}
                onChange={(e) => onRowChange(e, "cost", orderIndex)}
              />
            </div>
          ))}
        </div>
        <div>
          <Button type="submit">
            <ListItem button>
              <ListItemText primary="Create Invoice" />
            </ListItem>
          </Button>
          {/* <ListItem>
            <InvoiceRenderer />
          </ListItem> */}
        </div>
      </div>
    </form>
  );
}
