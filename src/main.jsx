import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { OrderProvider } from "./context/OrderContext";
import { ProductProvider } from "./context/ProductContext";
import { EmployeeProvider } from "./context/EmployeeContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <OrderProvider>
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </OrderProvider>
    </ProductProvider>
  </React.StrictMode>
);