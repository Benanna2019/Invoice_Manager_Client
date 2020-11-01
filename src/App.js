import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { PrivateRoutes, PublicRoutes } from "./components";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [signedIn, setSignedIn] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        //use AWS Amplify for authenticating user
        const user = await Auth.currentAuthenticatedUser();
        setSignedIn(user);
      } catch (error) {
        setSignedIn(undefined);
        console.log("Sign in useEffect error of:", error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <PrivateRoutes signedIn={signedIn} setSignedIn={setSignedIn} />
      <PublicRoutes setSignedIn={setSignedIn} />
    </div>
  );
}

export default App;
