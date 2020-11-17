import React from "react";
import { navigate } from "@reach/router";
import "../styles/landing-page.css";
// import Logo from "../images/logo.png";

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="landing-header">
        <button onClick={() => navigate("/signin")}>Sign In</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <div className="landing-content">
        <div className="landing-left">
          <div>
            <h1>Title</h1>
            {/* //logo could be centered in top */}
          </div>
          <div className="landing-left-content">
            <div>
              The standard Lorem Ipsum passage, used since the 1500s "Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
          </div>
        </div>
        <div className="landing-right">
          <div className="example-img-container">
            <img src={""} alt="component image" />
          </div>
          <div className="example-code-container">
            <img src={""} alt="code snippet" />
          </div>
        </div>

        {/* {store.getState()} */}
      </div>
    </div>
  );
}
