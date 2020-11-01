import React, { useState } from "react";
import { Router } from "@reach/router";
import { ConfirmSignUp, SignIn, SignUp, LandingPage, NotFound } from "../pages";

export default function PublicRoutes({ setSignedIn }) {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  return (
    <Router>
      <SignIn setSignedIn={setSignedIn} path="/signin" />
      <SignUp
        setUsername={setUsername}
        setPassword={setPassword}
        path="/signup"
      />
      <ConfirmSignUp
        username={username}
        password={password}
        setSignedIn={setSignedIn}
        path="/confirm"
      />
      <LandingPage path="/" />
      <NotFound default />
    </Router>
  );
}
