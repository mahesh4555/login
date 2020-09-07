import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import LoginPage from "./LoginPage";
import About from "./About";
import Home from "./Home";
import Error from "./Error";

function AppRoute1() {
  return (
    <Router>
      <div>
        {/* <Link to="/">Home</Link>

        <Link to="/about">About</Link> */}

        {/* <Link to="/login">Login</Link> */}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/about" exact component={About} />
          <Route path="/home" exact component={Home} />
          <Route path="/error" exact component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRoute1;
