//component to create an invoice
//have fields that they can fill in that, once done, creates a 'pretty'
//invoice to send to customer

//have a drag and drop feature
import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "uuid/dist/v4";
import "../styles/create-invoice.css";

export default function CreateInvoice({ signedIn, setSignedIn }) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userClients, setUserClients] = useState(undefined);
  const [orders, setOrders] = useState([{}, {}, {}, {}, {}]);

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
      // const quantity = e.target.elements.quantity.value;
      // const itemDescription = e.target.elements.itemDescription.value;
      // const cost = e.target.elements.cost.value;
      // console.log(invoiceUuid);
      axios
        .post("http://localhost:4000/create-invoice", {
          invoiceUuid,
          billTo,
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
              })
              .catch((error) => {
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

  return (
    <form className="invoice-container" onSubmit={(e) => addInvoice(e)}>
      <div className="invoice-content">
        <div className="form-content">
          <h2>New Invoice</h2>

          <div className="header-info">
            {/* <input
              placeholder="Today's Date"
              id="date"
              // defaultValue={(date) => getDate(date)}
            /> */}
            {/* A Simple Date.now() with some logic to change Date format */}
            <select defaultValue="Select Customer" id="billTo">
              {userClients &&
                userClients.map((client) => (
                  <option value={client.id}>{client.customer_name}</option>
                ))}
            </select>
          </div>
          {/* Bill To Can be a search that references a customer's address  */}

          {[0, 1, 2, 3, 4].map((orderIndex) => (
            <div className="invoice-add-items">
              <input
                placeholder="Item Description"
                id={`orderDescription${orderIndex}`}
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
        <button className="btn-submit" type="submit">
          Create Invoice
        </button>
      </div>
    </form>
  );
}
