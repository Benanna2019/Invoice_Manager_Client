import React from "react";
import axios from "axios";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import "../styles/update-user-info.css";

export default function UpdateUserInfo({ signedIn }) {
  async function editUser(e) {
    try {
      e.preventDefault();
      // console.log(e.target.elements.files);
      // console.log(e.target.elements.mainFile.files[0]);
      const firstname = e.target.elements.firstname.value;
      const lastname = e.target.elements.lastname.value;
      const companyName = e.target.elements.companyName.value;
      const addressStreet = e.target.elements.addressStreet.value;
      const city = e.target.elements.city.value;
      const state = e.target.elements.state.value;
      const zipcode = e.target.elements.zipcode.value;

      const resp = await axios.post("http://localhost:4000/update-user", {
        firstname,
        lastname,
        companyName,
        token: signedIn.signInUserSession.idToken.jwtToken,
        addressStreet,
        city,
        state,
        zipcode,
      });
      console.log(resp);
      window.alert("Successfully Updated User");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className="modal-container" onSubmit={(e) => editUser(e)}>
      <div className="modal-content">
        <h1 className="modal-welcome">Your Info</h1>
        <div className="form-content">
          <h4>*Put N/A for any non applicable fields</h4>
          <div className="first-name">
            <input
              type="text"
              placeholder="First Name"
              id="firstname"
              required
            />
          </div>
          <div className="last-name">
            <input type="text" placeholder="Last Name" id="lastname" required />
          </div>
          <div className="user-company">
            <input
              type="text"
              placeholder="Company Name"
              id="companyName"
              required
            />
          </div>
          <div className="user-address-street">
            <input
              type="text"
              placeholder="Street"
              id="addressStreet"
              required
            />
          </div>

          <div>
            <div className="user-city">
              <input type="text" placeholder="City" id="city" required />
            </div>
            <div className="user-state">
              <input type="text" placeholder="State" id="state" required />
            </div>
            <div className="user-zipcode">
              <input type="number" placeholder="Zip" id="zipcode" required />
            </div>
          </div>
        </div>
        <div>
          <Button type="submit">
            <ListItem button>
              <ListItemText primary="Submit" />
            </ListItem>
          </Button>
        </div>
      </div>
    </form>
  );
}
