import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { UserResponse } from "./types";
import _ from "lodash";

const PORT = 9001;

axios
  .get<UserResponse>(`http://localhost:${PORT}/api/v1/users/status`, {
    withCredentials: true,
  })
  .then(({ data }) => {
    console.log(data);
    const initialUser = _.isEmpty(data) ? null : data;
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App initialUser={initialUser} />
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch((res) => console.error("error:", res));

reportWebVitals();
