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
                Build your first <br></br>
                <span className={styles.text_gradient}>Timetable</span><br></br> in under
                a minute.
              </h1>

              <p className={styles.hero_subtitle}>
                Sign in to create and manage your timetables, classes and
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
                <h2>Sign in</h2>
                <p class={styles.welcome_text}>Welcome. Let's get you in.</p>

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
                    />
                    <RequiredInputField
                      id={"login-email"}
                      type={"text"}
                      label={"Email"}
                      placeholder={"Email"}
                      errorState={errorState.email}
                      icon={"mail"}
                      value={form.email}
                      setValue={(val) =>
                        setForm((prev) => ({ ...prev, email: val }))
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
                  </div>

                  <button type="submit" className={styles.submit_btn}>
                    Sign in <span>→</span>
                  </button>
                </form>

                <div className={styles.signup_prompt}>
                  <Link to="/login">Already have an account?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Register;
