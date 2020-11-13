import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceOrdersTable from "./InvoiceOrdersTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import InvoiceRemitToInfo from "./InvoiceRemitToInfo";

// import logo from "../../../src/logo.png";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  //   logo: {
  //     width: 74,
  //     height: 66,
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //   },
});

export default function Invoice({ invoice }) {
  // console.log(invoice);
  // ReactPDF(
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <InvoiceTitle title="Invoice" />
  //       <BillTo invoice={invoice} />
  //       <InvoiceOrdersTable invoice={invoice} />
  //       <InvoiceRemitToInfo invoice={invoice} />
  //       <InvoiceThankYouMsg />
  //     </Page>
  //   </Document>,
  //   `${__dirname}/example.pdf`
  // );
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <Image style={styles.logo} src={logo} /> */}
        <InvoiceTitle title="Invoice" />
        <BillTo invoice={invoice} />
        <InvoiceOrdersTable invoice={invoice} />
        <InvoiceRemitToInfo invoice={invoice} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
}

{
  /* <Image style={styles.logo} src={logo} /> */
}
