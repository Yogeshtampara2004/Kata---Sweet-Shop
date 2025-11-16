import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FlashProvider } from "./context/FlashContext";
import Flash from "./components/Flash";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FlashProvider>
          <AuthProvider>
            <Flash />
            <App />
          </AuthProvider>
        </FlashProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
