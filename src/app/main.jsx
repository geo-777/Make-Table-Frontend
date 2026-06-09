import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./providers/AppProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastProvider } from "../shared/components/toast/Toast.jsx";
// import "../tools/mock.jsx" // <- use this is init mock data

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <ToastProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
  </AppProvider>,
);
