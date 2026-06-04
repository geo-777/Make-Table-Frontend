import { Calendar, Github, Twitter, Mail } from "lucide-react";

import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <Calendar size={14} />
              </div>

              <span>MakeTable</span>
            </Link>

            <p>Open-source timetable generation for modern schools.</p>
          </div>

          <div className={styles.links}>
            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how">Workflow</a>
              <Link to="/docs">Documentation</Link>
            </div>

            <div>
              <h4>Legal</h4>

              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} MakeTable. All rights reserved.
          </p>

          <div className={styles.socials}>
            <a
              href="https://github.com/geo-777/Make-Table-Frontend"
              target="_blank"
            >
              <Github size={16} />
            </a>

            <a href="#">
              <Twitter size={16} />
            </a>

            <a href="#">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
