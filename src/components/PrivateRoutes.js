import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
// import CreateInvoice from "../pages/Creat";
import NotFound from "../pages/NotFound";
// import Home from "../pages/Home";

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  return (
    <Router>
      <Home path="/home" signedIn={signedIn} setSignedIn={setSignedIn} />
      {/* //CreateInvoice should be in the Home page not */}
      {/* <CreateInvoicePage
          path="/createinvoice"
          signedIn={signedIn}
          setSignedIn={setSignedIn}
        />
        <MyGraphicalStatistics
          path="/invoicestatistics"
          signedIn={signedIn}
          setSignedIn={setSignedIn}
        /> */}
      <NotFound default />
    </Router>
  );
}
