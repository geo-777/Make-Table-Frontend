import styles from "../styles/Auth.module.css";
import RequiredInputField from "../components/inputFieldAuth/RequiredInputField";
import { useState } from "react";
import sideBar from "../../../assets/side.png";
import { Calendar } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useValidate from "../hooks/useValidate";
import loginHelper from "../api/loginHelper";
import { motion } from "framer-motion";
import { fadeUp } from "../../../shared/utils/animations";
import { LogIn } from "lucide-react";

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

  const loginHandler = async (e) => {
    e.preventDefault();

    const { hasError, newErrorStates } = useValidate(form);
    setErrorStates(newErrorStates);
    if (hasError) return;

    //api
    try {
      setSubmitLoading(true); // this shit is used for showing the circular loading animation
      await loginHelper(form);
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
      <motion.div
        className={styles.container}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
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
              Log In <LogIn size={16} strokeWidth={3} />
            </button>
          </form>
          <h4>
            Don't have an account ? <Link to="/register">Register here</Link>
          </h4>
        </div>
        <div className={styles.right}>
          <img src={sideBar} alt="" />
        </div>
      </motion.div>
    </main>
  );
};

export default Login;
