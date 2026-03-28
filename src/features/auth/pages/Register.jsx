import styles from "../styles/Auth.module.css";
import RequiredInputField from "../components/inputFieldAuth/RequiredInputField";
import { useState } from "react";
import sideBar from "../../../assets/side.png";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { register } from "../../../api/auth.api";
import { toast } from "react-toastify";
import useValidate from "../hooks/useValidate";
import loginHelper from "../api/loginHelper";
import { useAuth } from "../../../app/providers/AuthProvider";
import { fadeUp } from "../../../shared/utils/animations";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const Register = () => {
  const { confirmLogin } = useAuth();

  //states
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [errorState, setErrorStates] = useState({
    username: null,
    password: null,
    email: null,
    confirmPassword: null,
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const { hasError, newErrorStates } = useValidate(form);
    setErrorStates(newErrorStates);
    if (hasError) return;

    try {
      setSubmitLoading(true);
      //creating account
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      toast.success("Account created successfully.");
      //logging in
      await loginHelper(form);
      confirmLogin(form.username);
    } catch (error) {
      if (error.response?.status == 409) {
        setErrorStates({
          ...errorState,
          username: "Username or mail already in use.",
          email: "Username or mail already in use.",
        });
      } else {
        toast.error("Unknown error occured.");
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
            <h3>Create Account !</h3>
            <p>Enter your details and jump right in.</p>
          </div>
          <form className={styles.form} onSubmit={submitHandler}>
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
              id={"login-email"}
              type={"text"}
              label={"Email"}
              placeholder={"Email"}
              errorState={errorState.email}
              icon={"mail"}
              value={form.email}
              setValue={(val) => setForm((prev) => ({ ...prev, email: val }))}
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
            <RequiredInputField
              id={"login-password2"}
              type={"password"}
              label={"Confirm Password"}
              placeholder={"Example@123"}
              errorState={errorState.confirmPassword}
              icon={"pass"}
              value={form.confirmPassword}
              setValue={(val) =>
                setForm((prev) => ({ ...prev, confirmPassword: val }))
              }
              showPassIcon={true}
            />
            <button
              type="submit"
              disabled={submitLoading}
              className={`${styles.loginBtn} ${
                submitLoading ? styles.submitBtn__loading : ""
              }`}
            >
              Create Account <UserPlus size={16} strokeWidth={3} />
            </button>
          </form>
          <h4>
            Already have an account ? <Link to="/login">Login here</Link>
          </h4>
        </div>
        <div className={styles.right}>
          <img src={sideBar} alt="" />
        </div>
      </motion.div>
    </main>
  );
};

export default Register;
