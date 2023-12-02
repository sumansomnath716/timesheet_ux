/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const container = document.getElementById("app");
const root = createRoot(container);
// let dt = false;
axios.defaults.baseURL = "http://192.168.0.105:8080/api";
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // dt = false;
    return config;
  },
  function (error) {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode === 404) {
      console.log("The requested resource does not exist or has been deleted");
    } else if (statusCode === 401 || statusCode === 403) {
      console.log("Please login to access this resource");
    } else if (statusCode === 500) {
      console.log("500 Internal Server Error");
    } else if (statusCode === 429) {
      console.log("To Many Request");
    } else if (statusCode === 400) {
      console.log("400!! Bad Request");
    }
    // dt = true;
    Snackbar({ msg: error.message, opensnk: dt });
    return Promise.Reject(error);
  }
);
const Alert = React.forwardRef(function Alert(props, ref) {
  console.log(`props:${props}`);
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const __Snackbar = ({ msg, opensnk }) => {
  // console.log(opensnk);
  const handleClose = () => {
    // setOpen(false);
  };
  // !opensnk ? (
  return (
    <Snackbar
      color="danger"
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={opensnk}
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
  // ) : null;
};

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // dt = false;
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const statusCode = error.response ? error.response.status : null;
    if (statusCode === 404) {
      console.log("The requested resource does not exist or has been deleted");
      __Snackbar({ msg: error.message, opensnk: true });
    } else if (statusCode === 401 || statusCode === 403) {
      console.log("Please login to access this resource");
    } else if (statusCode === 500) {
      console.log("500 Internal Server Error");
    } else if (statusCode === 429) {
      console.log("To Many Request");
    } else if (statusCode === 400) {
      console.log("400!! Bad Request");
    }
    // dt = true;
    snackbar({ msg: error.message, opensnk: true });
    // __Snackbar({ msg: error.message, opensnk: dt });
    return Promise.Reject(error);
  }
);

root.render(
  <BrowserRouter>
    <__Snackbar />
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
