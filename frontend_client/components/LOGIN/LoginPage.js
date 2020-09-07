import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "../../styles.css";
import { login_auth } from "./myfun";

// const validEmailRegex = RegExp(
//   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// );

// const validateForm = (errors) => {
//   let valid = true;

//   Object.values(errors).forEach(
//     // if we have an error string set valid to false
//     (val) => {
//       // console.log("validate");
//       val.length > 0 && (valid = false);
//       // console.log(val);
//       // console.log("valid:", valid);
//     }
//   );
//   return valid;
// };

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLoading: false,
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
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("name:", this.state.username);
    console.log("password:", this.state.password);
    this.setState({
      isLoading: true,
    });

    const data = { email: this.state.username, password: this.state.password };

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
          this.setState({
            isLoading: false,
          });

          document.getElementById("loginstatus").innerHTML =
            "Wrong Username or password";
        } else if (response.info) {
          console.log(response.info);
          this.setState({
            isLoading: false,
          });

          document.getElementById("loginstatus").innerHTML = response.info;
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
        document.getElementById("loginstatus").innerHTML = err + "Login Failed";
      });

    // event.preventDefault();
  }

  render() {
    return this.state.isLoading ? (
      <h1>Loading</h1>
    ) : (
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
            required
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
