import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { UserResponse } from "./types";
import "./index.css";

axios
  .get<UserResponse | null>(
    `${process.env.REACT_APP_BASE_API_URL}/api/v1/users/status`,
    {
      withCredentials: true,
    }
  )
  .then(({ data }) => {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App initialUser={data} />
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch((res) => console.error("error:", res));

reportWebVitals();
