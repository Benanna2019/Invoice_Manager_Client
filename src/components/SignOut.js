import React from "react";
import { navigate } from "@reach/router";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Auth } from "aws-amplify";

export default function SignOut({ setSignedIn }) {
  return (
    <div className="nav">
      <ListItem
        className="custom"
        onClick={() => {
          (async function () {
            try {
              await Auth.signOut({ global: true });
              setSignedIn(undefined);
              navigate("/signin");
            } catch (error) {
              console.log(error);
            }
          })();
        }}
      >
        <ListItemText primary="Sign Out" />
      </ListItem>
    </div>
  );
}
