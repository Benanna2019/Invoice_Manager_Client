import React, { useState, useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import "./App.css";
import { Auth } from "aws-amplify";

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
      {signedIn ? (
        <>
          <PrivateRoutes signedIn={signedIn} setSignedIn={setSignedIn} />
        </>
      ) : (
        <PublicRoutes setSignedIn={setSignedIn} />
      )}
    </div>
  );
}

export default App;
