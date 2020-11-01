import React from "react";
import { Router } from "@reach/router";

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  return (
    <div>
      <Router>
        <Home path="/home" signedIn={signedIn} setSignedIn={setSignedIn} />
        <CreateInvoice
          path="/createinvoice"
          signedIn={signedIn}
          setSignedIn={setSignedIn}
        />
        <MyGraphicalStatistics
          path="/invoicestatistics"
          signedIn={signedIn}
          setSignedIn={setSignedIn}
        />
        <NotFound default />
      </Router>
    </div>
  );
}
