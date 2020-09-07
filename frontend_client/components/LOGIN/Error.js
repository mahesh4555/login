import React from "react";
import { Link } from "react-router-dom";

import LoginPage from "./LoginPage";

const Error = () => {
  return (
    <div>
      <p>Error: Page does not exist!</p>
      <Link to="/">Go to Login page</Link>
    </div>
  );
};

export default Error;
