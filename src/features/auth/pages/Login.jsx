import styles from "../styles/Login.module.css";
import RequiredInputField from "../../../shared/components/inputfields/RequiredInputField";
import { useState } from "react";
import sideBar from "../../../assets/side.png";
import { Calendar } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { login } from "../../../api/auth.api";
import { toast } from "react-toastify";

const Login = () => {
  const { confirmLogin } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errorState, setErrorStates] = useState({
    username: null,
    password: null,
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const validateEntries = () => {
    let hasError = false;
    const newErrorStates = { ...errorState }; //copying state

    //username validation
    if (!form.username.trim()) {
      newErrorStates.username = "Username is required";
      hasError = true;
    } else {
      newErrorStates.username = null;
    }

    //password validation
    if (!form.password.trim()) {
      newErrorStates.password = "Password is required";
      hasError = true;
    } else if (form.password.length < 6) {
      newErrorStates.password = "Password too short";
      hasError = true;
    } else {
      newErrorStates.password = null;
    }

    setErrorStates(newErrorStates);
    return hasError;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    /*URL search params thingy is used here coz the backend application 
      accepts only url encoded stuff.. it doesnt accepts json type shit here.*/
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("grant_type", "password");
    formData.append("scope", "");
    formData.append("client_id", "");
    formData.append("client_secret", "");
    //the function returns true in case of error
    if (validateEntries()) return;

    //api
    try {
      setSubmitLoading(true);

      await login(formData);
      confirmLogin(form.username);
    } catch (error) {
      if (error.response?.status == 400) {
        setErrorStates({
          username: "Incorrect username or password",
          password: "Incorrect username or password",
        });
      } else {
        toast.error("Unknown Error occured!");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.icon}>
            <Calendar />
          </div>
          <div className={styles.infographics}>
            <h3>Welcome Back !</h3>
            <p>Enter your details and jump right in.</p>
          </div>
          <form className={styles.form} onSubmit={loginHandler}>
            <RequiredInputField
              id={"login-username"}
              type={"text"}
              label={"Username"}
              placeholder={"Username"}
              errorState={errorState.username}
              icon={"user"}
              value={form.username}
              setValue={(val) =>
                setForm((prev) => ({ ...prev, username: val }))
              }
            />

            <RequiredInputField
              id={"login-password"}
              type={"password"}
              label={"Password"}
              placeholder={"Example@123"}
              errorState={errorState.password}
              icon={"pass"}
              value={form.password}
              setValue={(val) =>
                setForm((prev) => ({ ...prev, password: val }))
              }
              showPassIcon={true}
            />
            <a href="#">Forgot Password ?</a>
            <button
              type="submit"
              disabled={submitLoading}
              className={`${styles.loginBtn} ${
                submitLoading ? styles.submitBtn__loading : ""
              }`}
            >
              Log In
            </button>
          </form>
          <h4>
            Don't have an account ? <a href="/register">Register here</a>
          </h4>
        </div>
        <div className={styles.right}>
          <img src={sideBar} alt="" />
        </div>
      </div>
    </main>
  );
};

export default Login;
