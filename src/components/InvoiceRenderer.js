import React, { Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Invoice from "../components/InvoiceReportComps/Invoice";
import savePdf from "../pdf-generator-function/pdfFile";

export default function InvoiceRenderer({ invoice }) {
  savePdf(<Invoice invoice={invoice} />, `${__dirname}/example.pdf`);
  // console.log(invoice);
  return (
    <Button>
      <ListItem button>
        <ListItemText primary="Create Invoice PDF" />
        <Fragment>
          <PDFViewer width="1000" height="600" className="app">
            <Invoice invoice={invoice} />
          </PDFViewer>
        </Fragment>
      </ListItem>
    </Button>
  );
}
