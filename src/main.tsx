// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { App } from "./App";
import "@/assets/css/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  // <BrowserRouter>
  <HashRouter>
    <App />
  </HashRouter>
  // </BrowserRouter>
  // </React.StrictMode>
);
