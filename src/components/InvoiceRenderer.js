import React, { Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Invoice from "../components/InvoiceReportComps/Invoice";
import savePdf from "../pdf-generator-function/pdfFile";

export default function InvoiceRenderer({
  signedIn,
  invoice,
  customerInfo,
  invoiceInfo,
}) {
  savePdf(
    <Invoice invoice={invoice} />,
    `${__dirname}/invoice.pdf`,
    signedIn,
    customerInfo,
    invoiceInfo
  );
  // console.log("invoice renderer comp signedin", signedIn);
  // console.log("invoice renderer comp customerinfo", customerInfo);
  // console.log("invoice renderer comp invoiceinfo", invoiceInfo);
  // console.log(invoice);
  return (
    <Fragment>
      <PDFViewer width="1000" height="600" className="app">
        <Invoice invoice={invoice} />
      </PDFViewer>
    </Fragment>
  );
}
