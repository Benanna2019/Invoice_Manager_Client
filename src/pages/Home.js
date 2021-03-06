//Home page
//I want to have a user side bar
//I want the page to be laid out with a lot of different components on it
//Top row will be small boxes with different graphical information(potentially)

//Main middle section will be a table with all invoices
//Have a table for 'Jobs' that user has done and the invoice# connected to it
import React from "react";
import SideNav from "../components/SideNav";
import StatsDisplay from "../components/StatsDisplay";
import InvoiceTable from "../components/InvoiceTable";
import "../styles/home.css";

export default function Home({ signedIn, setSignedIn }) {
  //state for userinvoices
  //state for currentuser
  //state for S3 stuff

  //useEffect for
  // - user
  // - invoices
  // - table to display invoices in that format
  // - data for stats cards at top
  // - --(might need to be seperate components for each card since it is different data)
  //Stats cards //side navbar //Map over DisplayInvoices
  return (
    <div className="dashboard-container">
      <div>
        <SideNav signedIn={signedIn} setSignedIn={setSignedIn} />
      </div>
    </div>
  );
}
