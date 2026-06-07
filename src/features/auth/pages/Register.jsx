import styles from "../styles/Auth.module.css";
import RequiredInputField from "../components/inputFieldAuth/RequiredInputField";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { register } from "../../../api/auth.api";
import useValidate from "../hooks/useValidate";
import loginHelper from "../api/loginHelper";
import { useAuth } from "../../../app/providers/AuthProvider";
import { fadeUp } from "../../../shared/utils/animations";
import { motion } from "framer-motion";
import { useToast } from "../../../shared/components/toast/Toast";

const Register = () => {
  const { confirmLogin } = useAuth();
  const { addToast } = useToast();

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

      addToast({
        type: "success",
        title: "Account created successfully.",
        message: "",
        duration: 2000,
      });
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
        addToast({
          type: "error",
          title: "Unknown error occured.",
          message: "",
          duration: 2000,
        });
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <main className={styles.authPage}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <motion.div
        className={styles.pageContainer}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
        <div className={styles.pageContent}>
          <aside className={styles.leftPanel}>
            <Link to="/" className={styles.brandHeader}>
              <div className={styles.brandLogo}>
                <Calendar width={18} height={18} />
              </div>
              <span>MakeTable</span>
            </Link>

            <div className={styles.heroPanel}>
              <h1 className={styles.heroTitle}>
                Build your first{" "}
                <span className={styles.textGradient}>Timetable</span> in under
                a minute.
              </h1>
              <p className={styles.heroText}>
                Join educators using MakeTable to generate perfect,
                conflict-free schedules.
              </p>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>1.2s</div>
                  <div className={styles.statLabel}>Avg generate</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>0%</div>
                  <div className={styles.statLabel}>Conflicts</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>Free</div>
                  <div className={styles.statLabel}>Forever</div>
                </div>
              </div>
            </div>

            <p className={styles.panelFooter}>
              © {new Date().getFullYear()} MakeTable · Open source
            </p>
          </aside>

          <section className={styles.rightPanel}>
            <Link to="/" className={styles.brandMobileLink}>
              <div className={styles.brandLogoSmall}>
                <Calendar width={14} height={14} />
              </div>
              <span>MakeTable</span>
            </Link>

            <motion.div
              className={styles.authCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.authHeader}>
                <h2 className={styles.authTitle}>Create your account</h2>
                <p className={styles.authSubtitle}>
                  Start generating timetables in seconds.
                </p>
              </div>

              {/* <button
                type="button"
                className={styles.oauthButton}
                onClick={() => toast.info("OAuth coming soon")}
              >
                <Github width={16} height={16} />
                Continue with GitHub
              </button>

              <div className={styles.divider}>
                <span className={styles.dividerText}>or</span>
              </div> */}

              <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles.formGroup}>
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

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitLoading}
                >
                  Create account <span>→</span>
                </button>
              </form>

              <p className={styles.switchPrompt}>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </motion.div>

            <p className={styles.footerText}>
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </section>
        </div>
      </motion.div>
    </main>
  );
};

export default Register;
