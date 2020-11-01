import React from "react";

//need customer info
//need createinvoice component
//potentially have displayinvoices.js on this page too
export default function CreateInvoicePage({ signedIn, setSignedIn }) {
  //useEffect for grabbing created invoices?

  return (
    <div>
      <CreateInvoice signedIn={signedIn} setSignedIn={setSignedIn} />
    </div>
  );
}
