import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
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
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <Image style={styles.logo} src={logo} /> */}
        <InvoiceTitle title="Invoice" />
        <BillTo invoice={invoice} />
        <InvoiceItemsTable invoice={invoice} />
        <InvoiceRemitToInfo invoice={invoice} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
}
