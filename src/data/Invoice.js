import React from "react";
import InvoiceRenderer from "../components/InvoiceRenderer";
import InvoiceTable from "../components/InvoiceTable";

export default function Invoice({
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
    phone: `${customerInfo.phone}`,
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
    remitTo: `${userInfo.first_name}, ${userInfo.last_name} ${userInfo.address_street}, ${userInfo.address_city}, ${userInfo.state}, ${userInfo.address_zip}`,
  };
  // console.log(invoice);
  return (
    <div>
      <InvoiceTable invoice={invoice} />
      <InvoiceRenderer invoice={invoice} />{" "}
    </div>
  );
}
