import { useMemo } from "react";
import Loader from "../loader/Loader";
import styles from "./StatusWrapper.module.css";

// asif please review this, add more error states if nescessary
const StatusWrapper = ({ loader, error, isError, children }) => {
  const errorState = useMemo(() => {
    const obj = { title: "", tagline: "" };

    const status = error?.status ?? error?.response?.status;
    const serverMsg =
      error?.message ||
      error?.response?.data?.message ||
      error?.response?.data?.error;

    if (
      !status &&
      (serverMsg?.toLowerCase?.().includes("network") ||
        (error?.isAxiosError && !error?.response))
    ) {
      obj.title = "Network error";
      obj.tagline =
        "Unable to reach the server. Check your internet connection and try again.";
      return obj;
    }

    switch (status) {
      case 400:
        obj.title = "Bad request";
        obj.tagline =
          serverMsg ||
          "The request was invalid. Please check your input and try again.";
        break;
      case 401:
        obj.title = "Not signed in";
        obj.tagline =
          "You need to sign in to access this resource. Please log in and try again.";
        break;
      case 403:
        obj.title = "Access denied";
        obj.tagline =
          "You don't have permission to perform this action. Contact your administrator if you believe this is an error.";
        break;
      case 404:
        obj.title = "Not found";
        obj.tagline =
          serverMsg ||
          "We couldn't find the requested resource. It may have been removed or the link is incorrect.";
        break;
      case 422:
        obj.title = "Invalid data";
        obj.tagline =
          serverMsg ||
          "Some inputs are invalid. Please review and correct highlighted fields.";
        break;
      default:
        if (status >= 500 && status <= 599) {
          obj.title = `Server error (${status})`;
          obj.tagline =
            serverMsg ||
            "Something went wrong on the server. Please try again later or contact support.";
        } else {
          //fallback
          obj.title = serverMsg ? "Error" : "Something went wrong";
          obj.tagline =
            serverMsg || "An unexpected error occurred. Please try again.";
        }
    }

    return obj;
  }, [error]);

  return (
    <div
      className={`${loader ? styles.loader : styles.error} ${styles.wrapper} `}
    >
      {loader && <Loader />}
      {children}
      {isError && !children && (
        <>
          <h6>{errorState?.title}</h6>
          <p>{errorState?.tagline}</p>
        </>
      )}
    </div>
  );
};

export default StatusWrapper;
