import React from "react";
import { Route, Link } from "react-router-dom";
import { access_token_auth } from "./myfun";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isTokenAvailable: localStorage.getItem("token"),
    };
  }

  async UNSAFE_componentWillMount() {
    console.log("-----HomePage Component Will Mount-------");
    let responseToken = null;
    let userName = null;
    try {
      responseToken = this.props.location.state.responseToken;
      userName = this.props.location.state.userName;
      console.log("accessed res token");
      console.log("res token:", responseToken);
      console.log("userName:", userName);
    } catch (err) {
      console.log(err);
    }

    // try {

    // } catch (err) {
    //   console.log(err);
    // }
    if (this.state.isTokenAvailable) {
      access_token_auth(responseToken, userName)
        .then((response) => {
          console.log("response:", response);
          if (!response) this.props.history.push("/");
          // else this.props.history.push("/");
        })
        .catch((error) => {
          console.error(error);
          this.props.history.push("/error");
        });
    } else {
      this.props.history.push("/error");
    }
  }

  displayDate = () => {
    console.log("Date is diaplayed");
    // doSomething();
    console.log("Date is diaplayed");
  };

  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to="/about"> Click to About </Link>
        <button onClick={this.displayDate}>Display date</button>
      </div>
    );
  }
}

export default Home;
