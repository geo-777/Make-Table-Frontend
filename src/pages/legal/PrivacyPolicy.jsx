import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./TermsAndConditions.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={styles.page}>
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

      <main className={styles.container}>
        <div className={styles.hero}>
          <h1>Privacy Policy</h1>

          <p className={styles.updated}>Last updated: January 25, 2026</p>
        </div>

        <div className={styles.content}>
          <section>
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how MakeTable collects, uses, stores,
              and protects information when you use our platform.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>

            <p>
              We collect information that you provide while using the platform,
              including:
            </p>

            <ul>
              <li>Name and account information</li>
              <li>Email address</li>

              <li>Teacher details</li>
              <li>Class and section information</li>
              <li>Subjects and timetable data</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>

            <p>Your information is used to:</p>

            <ul>
              <li>Provide timetable generation features</li>
              <li>Store and manage schedules</li>
              <li>Maintain user accounts</li>
              <li>Improve platform functionality</li>
              <li>Provide support and troubleshoot issues</li>
            </ul>
          </section>

          <section>
            <h2>4. Authentication and Cookies</h2>

            <p>
              We use cookies required for authentication and security. These
              cookies help maintain login sessions and protect user accounts.
            </p>

            <p>
              Disabling these cookies may prevent parts of the platform from
              functioning correctly.
            </p>
          </section>

          <section>
            <h2>5. Public Timetable Sharing</h2>

            <p>
              Timetables that you explicitly publish through public links may be
              accessible to anyone who possesses the link.
            </p>

            <p>
              Users are responsible for reviewing timetable content before
              sharing it publicly.
            </p>
          </section>

          <section>
            <h2>6. Data Storage</h2>

            <p>
              We store timetable-related data in order to provide platform
              functionality and maintain user workspaces.
            </p>

            <p>
              We take reasonable measures to protect stored information from
              unauthorized access.
            </p>
          </section>

          <section>
            <h2>7. Third-Party Services</h2>

            <p>
              The platform may rely on third-party infrastructure providers for
              hosting, storage, analytics, or authentication services.
            </p>

            <p>
              These providers may process information only as necessary to
              operate the platform.
            </p>
          </section>

          <section>
            <h2>8. Data Retention</h2>

            <p>
              We retain your information for as long as necessary to provide the
              service or comply with legal obligations.
            </p>

            <p>
              You may request account deletion, subject to any legal or
              operational requirements.
            </p>
          </section>

          <section>
            <h2>9. Your Rights</h2>

            <p>
              Depending on applicable laws, you may have rights regarding your
              personal data, including access, correction, deletion, or export
              of information associated with your account.
            </p>
          </section>

          <section>
            <h2>10. Children's Privacy</h2>

            <p>
              MakeTable is intended for use by educational institutions and
              authorized users. We do not knowingly collect personal information
              directly from children without appropriate authorization.
            </p>
          </section>

          <section>
            <h2>11. Changes to This Policy</h2>

            <p>
              We may update this Privacy Policy from time to time. Updated
              versions will be published on this page along with the revised
              effective date.
            </p>
          </section>

          <section>
            <h2>12. Contact</h2>

            <p>
              Questions regarding this Privacy Policy may be submitted through
              the GitHub repository or other contact methods provided on the
              website.
            </p>

            <p>
              Project Repository:
              <br />
              <a
                href="https://github.com/viswajith275/TimeTable-Generator"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/viswajith275/TimeTable-Generator
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
