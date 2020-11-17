import React from "react";
import InvoiceRenderer from "../components/InvoiceRenderer";
import InvoiceTable from "../components/InvoiceTable";

//storage in this file
//Add the storage functionality to this Component
export default function Invoice({
  signedIn,
  userInfo,
  customerInfo,
  invoiceInfo,
  orderInfo,
}) {
  // console.log(userInfo);
  // console.log(customerInfo);
  // console.log(invoiceInfo);
  // console.log(orderInfo);
  const invoice = {
    id: `${invoiceInfo.id}`,
    customer: `${customerInfo.customer_name}`,
    company: `${customerInfo.company}`,
    email: `${customerInfo.email}`,
    address: `${customerInfo.address_street}, ${customerInfo.address_city}, ${customerInfo.address_state}, ${customerInfo.address_zip}`,
    orders: orderInfo.map((order) => {
      return {
        sno: `${order.id}`,
        desc: `${order.order_description}`,
        qty: `${order.quantity}`,
        rate: `${order.cost}`,
      };
    }),
    // orders: [
    //   {
    //     sno: 1,
    //     desc: "ad sunt culpa occaecat qui",
    //     qty: 5,
    //     rate: 405.89,
    //   },
    //   {
    //     sno: 2,
    //     desc: "cillum quis sunt qui aute",
    //     qty: 5,
    //     rate: 373.11,
    //   },
    //   {
    //     sno: 3,
    //     desc: "ea commodo labore culpa irure",
    //     qty: 5,
    //     rate: 458.61,
    //   },
    //   {
    //     sno: 4,
    //     desc: "nisi consequat et adipisicing dolor",
    //     qty: 10,
    //     rate: 725.24,
    //   },
    //   {
    //     sno: 5,
    //     desc: "proident cillum anim elit esse",
    //     qty: 4,
    //     rate: 141.02,
    //   },
    // ],
    remitToUser: `${userInfo.first_name} ${userInfo.last_name}`,
    remitToUserStreet: `${userInfo.address_street}`,
    remitToUserAddress: `${userInfo.address_city}, ${userInfo.state} ${userInfo.address_zip}`,
  };
  // console.log(invoice);
  return (
    <div>
      <InvoiceRenderer
        invoice={invoice}
        signedIn={signedIn}
        customerInfo={customerInfo}
        invoiceInfo={invoiceInfo}
      />{" "}
    </div>
  );
}
