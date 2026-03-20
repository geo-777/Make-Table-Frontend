import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./providers/AppProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppProvider>
  </StrictMode>,
);
