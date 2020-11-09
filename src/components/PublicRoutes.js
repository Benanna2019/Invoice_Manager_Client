import React, { useState } from "react";
import { Router } from "@reach/router";
import ConfirmSignUp from "../pages/ConfirmSignUp";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";

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
