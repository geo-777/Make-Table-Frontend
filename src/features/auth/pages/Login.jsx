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
import { style } from "framer-motion/client";

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
        <header className={styles.header}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <Calendar width={18} height={18} />
            </div>
            <div className={styles.header_text}>MakeTable</div>
          </div>
        </header>
        <div className={styles.main_content}>
          <div className={styles.grid_box}>
            <div className={styles.hero_section}>
              <h1 className={styles.hero_title}>
                Welcome back to<br></br>
                <span className={styles.text_gradient}>MakeTable.</span>
              </h1>

              <p className={styles.hero_subtitle}>
                Log in to continue managing your timetables, classes and
                assignments.
              </p>

              <div className={styles.stats_container}>
                <div className={styles.stat_card}>
                  <div className={styles.stat_value}>1.2s</div>
                  <div className={styles.stat_label}>Avg Generate</div>
                </div>
                <div className={styles.stat_card}>
                  <div className={styles.stat_value}>0%</div>
                  <div className={styles.stat_label}>Conflicts</div>
                </div>
                <div className={styles.stat_card}>
                  <div className={styles.stat_value}>Free</div>
                  <div className={styles.stat_label}>Forever</div>
                </div>
              </div>
            </div>
            <div className={styles.login_section}>
              <div class={styles.login_card}>
                <h2>Log in</h2>
                <p class={styles.welcome_text}>
                  Welcome back. Let's get you in.
                </p>

                <form className={styles.login_form}>
                  <div className={styles.form_group}>
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
                    />{" "}
                    
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
                    />{" "}
                  </div>

                  <button type="submit" className={styles.submit_btn}>
                    Log in <span>→</span>
                  </button>
                </form>

                <div className={styles.signup_prompt}>
                  New to MakeTable? <Link to="/register">Create one</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Login;
