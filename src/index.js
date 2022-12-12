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

async function main() {
  if (window.location.pathname === "/tunnning") {
    window.location.pathname = "/tunnning/";
    return;
  }

  const { worker } = require("./mocks/browser");

  await worker.start({
    serviceWorker: {
      url: "/tunnning/mockServiceWorker.js",
    },
  });

  ReactDOM.render(
    <React.StrictMode>
      <App></App>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

main();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
