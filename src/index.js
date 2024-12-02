import React from "react";
import ReactDOM from "react-dom/client";
import "./style/tailwind.css";
import "./style/reset.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
