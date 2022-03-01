import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const PORT = 9001;

axios
  .get(`http://localhost:${PORT}/api/v1/users/status`, {
    withCredentials: true,
  })
  .then(({ data }) => console.log("IN THE INDEX", data))
  .catch((res) => console.log("AT THE INDEX", res));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
