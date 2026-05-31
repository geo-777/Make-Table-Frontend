//global styles
import "../styles/global.css";
import "../styles/theme.css";
import LoaderFull from "../shared/components/loader/LoaderFull";
import { useAuth } from "./providers/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
//react toastify bs for notification system
//dont remove these imports
import { ToastContainer } from "react-toastify";
import "../styles/animations.css";
import "react-toastify/dist/ReactToastify.css";
import useThemeStore from "../shared/zustand/themeStore";
function App() {
  const { isLoading } = useAuth();
  const { theme } = useThemeStore();
  // applying theme class to the root html element
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  if (isLoading) {
    return <LoaderFull />;
  }

  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
