import { Calendar, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar__landingpage.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Calendar size={14} />
          </div>

          <span>MakeTable</span>
        </Link>

        <nav className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#customers">Customers</a>
          <Link to="/docs">Docs</Link>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Log in
          </button>

          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/register")}
          >
            Get started
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
