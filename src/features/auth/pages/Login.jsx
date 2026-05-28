import styles from "../styles/Auth.module.css";
import RequiredInputField from "../components/inputFieldAuth/RequiredInputField";
import { useState } from "react";
import { Calendar, Github } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useValidate from "../hooks/useValidate";
import loginHelper from "../api/loginHelper";
import { motion } from "framer-motion";
import { fadeUp } from "../../../shared/utils/animations";

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
                Welcome back to{" "}
                <span className={styles.textGradient}>MakeTable.</span>
              </h1>
              <p className={styles.heroText}>
                Log in to continue managing your timetables, classes and
                assignments.
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
                <h2 className={styles.authTitle}>Sign in</h2>
                <p className={styles.authSubtitle}>
                  Welcome back. Let's get you in.
                </p>
              </div>
              {/* 
              <button
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

              <form onSubmit={loginHandler} className={styles.form}>
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
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitLoading}
                >
                  Log in <span>→</span>
                </button>
              </form>

              <p className={styles.switchPrompt}>
                New to MakeTable? <Link to="/register">Create one</Link>
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

export default Login;
