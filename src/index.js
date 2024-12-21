import React from "react";
import ReactDOM from "react-dom";

import { AuthProvider } from "./context/AuthProvider";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "./scss/index.scss";
import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
