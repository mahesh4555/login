import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "../../styles.css";
import { login_auth } from "./myfun";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (errors) => {
  let valid = true;

  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => {
      // console.log("validate");
      val.length > 0 && (valid = false);
      // console.log(val);
      // console.log("valid:", valid);
    }
  );
  return valid;
};

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {
        username: "",
        password: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async UNSAFE_componentWillMount() {
    console.log("-----Login Page Will Mount-------");
    console.log("Local storage cleared");
    localStorage.clear();
  }

  handleChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;
    this.setState({
      [name]: value,
    });
    console.log("handleChange");
    // const data = { email: "name3@gmail.com", password: "name3" };
    switch (name) {
      case "username":
        errors.username = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        console.log(errors.username);
        if (errors.username != "")
          document.getElementById("username").innerHTML = "Invalid username";
        else document.getElementById("username").innerHTML = "";
        break;
      case "password":
        errors.password =
          value.length < 4 ? "Password must be 8 characters long!" : "";
        if (errors.password != "")
          document.getElementById("password").innerHTML = "Invalid password";
        else document.getElementById("password").innerHTML = "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  }

  handleSubmit(event) {
    let isValid = validateForm(this.state.errors);
    if (isValid) console.log("Valid form");
    else console.log("Invalid form");

    event.preventDefault();
    console.log("name:", this.state.username);
    console.log("password:", this.state.password);

    const data = { email: this.state.username, password: this.state.password };
    if (isValid) {
      login_auth(data)
        .then((response) => {
          console.log("Login oage response resce");
          if (response.auth) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("username", this.state.username);
            console.log("login auth token:", localStorage.getItem("token"));
            this.props.history.push("/home", {
              responseToken: localStorage.getItem("token"),
              userName: this.state.username,
            });

            // return <Redirect to="/home" />;
          } else if (!response.auth) {
            console.log("Authorization failed");

            document.getElementById("loginstatus").innerHTML =
              "Wrong Username or password";
          } else if (response.info) {
            console.log(response.info);

            document.getElementById("loginstatus").innerHTML = response.info;
          }
        })
        .catch((err) => {
          console.log(err);
          document.getElementById("loginstatus").innerHTML = "Login Failed";
        });
    }

    // event.preventDefault();
  }

  render() {
    return (
      <div className="bullock">
        <form onSubmit={this.handleSubmit}>
          <br />
          <br />

          <label>User Name </label>
          {/* <img src={username} alt="username" /> */}

          <input
            type="email"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <p id="username"></p>
          <br />
          <br />

          <label>Password </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <p id="password"></p>
          <br />
          <br />

          <input type="submit" value="Log In" name="submit" />
          {/* <p>{this.state.loginStatus}</p> */}
          <p id="loginstatus"></p>
        </form>

        {/* <p>{this.state.username}</p>
        <p>{this.state.password}</p> */}
      </div>
    );
  }
}

export default LoginPage;
