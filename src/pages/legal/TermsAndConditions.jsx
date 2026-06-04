import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./TermsAndConditions.module.css";

const TermsAndConditions = () => {
  return (
    <div className={` ${styles.page}`}>
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Calendar size={14} />
            </div>
            <span>MakeTable</span>
          </Link>

          <div className={styles.actions}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>

            <Link to="/login" className={styles.navLink}>
              Log in
            </Link>
          </div>
        </div>
      </header>

      <main className={`stagger-children ${styles.container}`}>
        <div className={styles.hero}>
          <h1>Terms & Conditions</h1>

          <p className={styles.updated}>Last updated: January 25, 2026</p>
        </div>

        <div className={styles.content}>
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to MakeTable. By creating an account or using this
              website, you agree to comply with and be bound by these Terms and
              Conditions. If you do not agree, you must not use the service.
            </p>
          </section>

          <section>
            <h2>2. Purpose of the Service</h2>
            <p>
              MakeTable provides a timetable generation and management platform
              intended primarily for educational institutions, including
              schools, colleges, and training centers.
            </p>
          </section>

          <section>
            <h2>3. Accounts and Access</h2>
            <p>
              Certain features require an account. You are responsible for
              maintaining the confidentiality of your credentials and all
              activity occurring under your account.
            </p>
          </section>

          <section>
            <h2>4. Data Collection and Storage</h2>

            <p>
              To provide the service, we store information that you create or
              upload, including:
            </p>

            <ul>
              <li>Timetables and schedules</li>
              <li>Teacher information</li>
              <li>Class and section information</li>
              <li>Subjects and scheduling preferences</li>
            </ul>

            <p>
              This information is stored solely to provide platform
              functionality and improve the service.
            </p>
          </section>

          <section>
            <h2>5. Cookies and Authentication</h2>

            <p>
              We use cookies necessary for authentication and account security,
              including storing session-related tokens. These cookies are
              required for the proper functioning of the platform.
            </p>
          </section>

          <section>
            <h2>6. Open Source</h2>

            <p>
              MakeTable is an open-source project. Source code is publicly
              available on GitHub
            </p>

            <p>
              Use, modification, and distribution of the source code are
              governed by the license provided in the repository.
            </p>
          </section>

          <section>
            <h2>7. Accuracy and Responsibility</h2>

            <p>
              While we aim to generate reliable schedules, we do not guarantee
              that every timetable will be free from conflicts or meet every
              institutional requirement. Users are responsible for reviewing
              generated schedules before use.
            </p>
          </section>

          <section>
            <h2>8. Acceptable Use</h2>

            <p>
              You agree not to misuse the platform, attempt unauthorized access,
              interfere with services, or use MakeTable for unlawful purposes.
            </p>
          </section>

          <section>
            <h2>9. Disclaimer</h2>

            <p>
              The platform is provided on an "as is" and "as available" basis
              without warranties of any kind. We do not guarantee uninterrupted
              availability or error-free operation.
            </p>
          </section>

          <section>
            <h2>10. Limitation of Liability</h2>

            <p>
              To the fullest extent permitted by law, we shall not be liable for
              any damages arising from the use of, inability to use, or reliance
              upon the platform or its outputs.
            </p>
          </section>

          <section>
            <h2>11. Changes to These Terms</h2>

            <p>
              We may update these Terms and Conditions from time to time.
              Continued use of the platform after changes are published
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>12. Contact</h2>

            <p>
              Questions regarding these Terms and Conditions can be raised
              through the GitHub repository or the contact methods provided on
              the website.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
