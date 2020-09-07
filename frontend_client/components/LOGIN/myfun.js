// import React, { Component } from "react";

function login_auth(data) {
  return new Promise((resolve, reject) => {
    console.log("login_auth");

    fetch("http://192.168.43.216:4000/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function access_token_auth(responseToken, responseUserName) {
  return new Promise((resolve, reject) => {
    console.log("access_token_auth");
    let local_storage_token = localStorage.getItem("token");
    let local_storage_username = localStorage.getItem("username");
    console.log(local_storage_token);
    console.log(local_storage_username);
    console.log("Res token:", responseToken);

    if (
      responseToken == local_storage_token &&
      responseUserName == local_storage_username
    ) {
      console.log("local_storage_token == token");
      fetch("http://localhost:4000/api/auth/me", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: "Bearer " + responseToken,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("RESPONSE");
          console.log(response);
          console.log(response.email);
          let auth_status =
            local_storage_username == response.email ? true : false;

          console.log("Auth status before sending then :", auth_status);
          resolve(auth_status);
        })
        .catch((error) => {
          console.error(error);
          let auth_status = false;
          console.log("Auth status before sending catch :", auth_status);
          reject(auth_status);
        });
    } else {
      let auth_status = false;
      console.log("Auth status before sending else :", auth_status);
      reject(auth_status);
    }
  });
  //   localStorage.getItem("token");
}

exports.login_auth = login_auth;
exports.access_token_auth = access_token_auth;
