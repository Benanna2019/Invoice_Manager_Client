//Component to create customers that you can choose in a drop down menu
//when ready to send the invoice to the customer
//Can have name, company and email
import React from "react";
import axios from "axios";
import "../styles/customer-info.css";

export default function CustomerInfo({ signedIn, setOpen }) {
  //axios post here to the database to store the customer information
  async function addCustomer(e) {
    try {
      e.preventDefault();
      // console.log(e.target.elements.files);
      // console.log(e.target.elements.mainFile.files[0]);
      const customerName = e.target.elements.customerName.value;
      const companyName = e.target.elements.companyName.value;
      const addressStreet = e.target.elements.addressStreet.value;
      const city = e.target.elements.city.value;
      const state = e.target.elements.state.value;
      const zipcode = e.target.elements.zipcode.value;

      const resp = await axios.post("http://localhost:4000/create-customer", {
        customerName,
        companyName,
        token: signedIn.signInUserSession.idToken.jwtToken,
        addressStreet,
        city,
        state,
        zipcode,
      });
      console.log(resp);
      window.alert("Customer Successfully Added");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className="modal-container" onSubmit={(e) => addCustomer(e)}>
      <div className="modal-content">
        <h1 className="modal-welcome">Customer Info</h1>
        <div className="form-content">
          <h4>*Put N/A for any non applicable fields</h4>
          <div className="customer-name">
            <input
              type="text"
              placeholder="Customer Name"
              id="customerName"
              required
            />
          </div>
          <div className="customer-company">
            <input
              type="text"
              placeholder="company_name"
              id="companyName"
              required
            />
          </div>
          <div className="customer-address-street">
            <input
              type="text"
              placeholder="Street"
              id="addressStreet"
              required
            />
          </div>

          <div>
            <div className="customer-city">
              <input type="text" placeholder="City" id="city" required />
            </div>
            <div className="customer-state">
              <input type="text" placeholder="State" id="state" required />
            </div>
            <div className="customer-zipcode">
              <input type="number" placeholder="Zip" id="zipcode" required />
            </div>
          </div>
        </div>
        <button className="footer" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
