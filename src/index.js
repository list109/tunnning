import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/App/App.js";

// import reportWebVitals from './reportWebVitals'

// if (process.env.NODE_ENV === 'development') {
// const { worker, mockAuthState } = require('./mocks/browser')
// worker.start()
// mockAuthState()
// }

import { worker } from "./mocks/browser";
worker.start();

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
