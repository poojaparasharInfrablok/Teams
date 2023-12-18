import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import reduxstore from "./config/reduxstore";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <Provider store={reduxstore}>
        <App />
    </Provider>);
