import { pdf } from "@react-pdf/renderer";
import { Storage } from "aws-amplify";
import axios from "axios";

//storage.put of blob
//make an s3 folder "invoices-pdfs"
//pass down the invoice_uuid

const saveBlob = async (blob, filename, signedIn, invoiceInfo) => {
  console.log(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  const s3PdfPath = await Storage.put(
    `${signedIn.username}/${invoiceInfo[0].invoice_uuid}/invoice.pdf`,
    blob,
    {
      contentType: "image/pdf",
    }
  );
  console.log(s3PdfPath);
  return s3PdfPath;
};

const savePdf = async (
  document,
  filename,
  signedIn,
  customerInfo,
  invoiceInfo
) => {
  console.log("invoice renderer comp signedin", signedIn);
  console.log("invoice renderer comp customerinfo", customerInfo);
  console.log("invoice renderer comp invoiceinfo", invoiceInfo);
  console.log("filename is", filename);
  const s3PdfPath = await saveBlob(
    await pdf(document).toBlob(),
    filename,
    signedIn,
    invoiceInfo
  );

  console.log("filename is", filename);
  console.log(s3PdfPath.key);
  const resp = await axios.post("http://localhost:4000/store-invoice-pdf", {
    invoiceUuid: invoiceInfo[0].invoice_uuid,
    token: signedIn.signInUserSession.idToken.jwtToken,
    pdfPath: s3PdfPath.key,
  });
  console.log(resp);
  //sql table that has invoice_uuid and path
  //axios post to sql table store the path on invoice_uuid
};

export default savePdf;
