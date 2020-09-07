import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "../../styles.css";
import { login_auth } from "./myfun";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    this.setState({
      [name]: value,
    });
    console.log("handleChange");
    // const data = { email: "name3@gmail.com", password: "name3" };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("name:", this.state.username);
    console.log("password:", this.state.password);

    const data = { email: this.state.username, password: this.state.password };

    login_auth(data)
      .then((response) => {
        if (response.auth) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("username", this.state.username);
          console.log("login auth token:", localStorage.getItem("token"));
          this.props.history.push("/home", {
            responseToken: localStorage.getItem("token"),
            userName: this.state.username,
          });

          // return <Redirect to="/home" />;
        } else {
          console.log("Authorization failed");

          document.getElementById("loginstatus").innerHTML = "Login Failed";
        }
      })
      .catch((err) => {
        console.log(err);
      });

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
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <br />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
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
