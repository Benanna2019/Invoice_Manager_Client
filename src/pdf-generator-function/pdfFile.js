import { pdf } from "@react-pdf/renderer";

const saveBlob = (blob, filename) => {
  console.log(blob);
  //storage.put of blob
  //make an s3 folder "invoices-pdfs"
  //pass down the invoice_uuid
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

const savePdf = async (document, filename) => {
  saveBlob(await pdf(document).toBlob(), filename);
};

export default savePdf;
