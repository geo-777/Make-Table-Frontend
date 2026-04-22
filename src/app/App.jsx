//global styles
import "../styles/global.css";
import "../styles/theme.css";
import LoaderFull from "../shared/components/loader/LoaderFull";
import { useAuth } from "./providers/AuthProvider";
import AppRoutes from "./routes/AppRoutes";

//react toastify bs for notification system
//dont remove these imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLoading } = useAuth();

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
