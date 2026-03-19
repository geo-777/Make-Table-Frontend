import styles from "../styles/Login.module.css";
import RequiredInputField from "../../../shared/components/inputfields/RequiredInputField";
import { useState } from "react";
import sideBar from "../../../assets/side.png";
import { Calendar } from "lucide-react";
const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const loginHandler = (e) => {
    e.preventDefault();
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
              errorState={null}
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
              errorState={null}
              icon={"pass"}
              value={form.password}
              setValue={(val) =>
                setForm((prev) => ({ ...prev, password: val }))
              }
            />
            <a href="#">Forgot Password ?</a>
            <button type="submit" className={styles.loginBtn}>
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
