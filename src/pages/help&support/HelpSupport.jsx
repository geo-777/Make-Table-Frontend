import "../../styles/appLayout.css";
import Topbar from "../../shared/components/topbar/Topbar";
import {
  BookOpen,
  ExternalLink,
  MessageCircle,
  Send,
  Play,
  Github,
  Mail,
} from "lucide-react";
import styles from "./HelpSupport.module.css";
import { Link } from "react-router-dom";

const HelpSupport = () => {
  return (
    <div className="App">
      <Topbar page={"Help & Support"} />
      <div className="mainPlaceholder">
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Help & Support</h1>
            <p className={styles.subtitle}>
              Docs, community, and direct support — all in one place.
            </p>
          </div>

          {/* Quick links */}
          <div className={styles.quickLinks}>
            <Link to="/docs" className={styles.card}>
              <div className={styles.cardIconWrapper}>
                <div className={`${styles.iconBox} ${styles.iconBoxPrimary}`}>
                  <BookOpen className={styles.iconSmall} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitleRow}>
                    <p className={styles.cardTitle}>Documentation</p>
                    <ExternalLink className={styles.externalIcon} />
                  </div>
                  <p className={styles.cardDescription}>
                    Guides, concepts, and references.
                  </p>
                </div>
              </div>
            </Link>

            <a
              href="https://discord.gg/maketable"
              target="_blank"
              rel="noreferrer"
              className={styles.card}
            >
              <div className={styles.cardIconWrapper}>
                <div className={`${styles.iconBox} ${styles.iconBoxDiscord}`}>
                  <MessageCircle className={styles.iconSmall} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitleRow}>
                    <p className={styles.cardTitle}>Discord community</p>
                    <ExternalLink className={styles.externalIcon} />
                  </div>
                  <p className={styles.cardDescription}>
                    Chat with users and the team.
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://chat.whatsapp.com/maketable"
              target="_blank"
              rel="noreferrer"
              className={styles.card}
            >
              <div className={styles.cardIconWrapper}>
                <div className={`${styles.iconBox} ${styles.iconBoxWhatsapp}`}>
                  <Send className={styles.iconSmall} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitleRow}>
                    <p className={styles.cardTitle}>WhatsApp group</p>
                    <ExternalLink className={styles.externalIcon} />
                  </div>
                  <p className={styles.cardDescription}>
                    Quick help on the go.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Main Content: Video + Extras */}
          <div className={styles.mainContent}>
            {/* Tutorial video */}
            <div className={styles.videoSection}>
              <div className={styles.videoHeader}>
                <div className={styles.videoTitleGroup}>
                  <Play className={styles.iconPrimarySmall} />
                  <h2 className={styles.videoTitle}>
                    Getting started — 4 min tour
                  </h2>
                </div>
                <span className={styles.badge}>Tutorial</span>
              </div>
              <div className={styles.videoContainer}>
                <iframe
                  className={styles.iframe}
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="MakeTable tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className={styles.videoSteps}>
                {[
                  {
                    t: "Create a timetable",
                    d: "Set up your workspace in under a minute.",
                  },
                  {
                    t: "Add classes & subjects",
                    d: "Import via CSV or paste from a sheet.",
                  },
                  {
                    t: "Generate & export",
                    d: "Resolve conflicts and share PDFs.",
                  },
                ].map((s) => (
                  <div key={s.t} className={styles.stepCard}>
                    <p className={styles.stepTitle}>{s.t}</p>
                    <p className={styles.stepDescription}>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extras (GitHub, Email, Response Times) */}
            <div className={styles.extrasSection}>
              <a
                href="https://github.com/maketable/maketable/issues"
                target="_blank"
                rel="noreferrer"
                className={styles.actionCard}
              >
                <div className={styles.actionContent}>
                  <Github className={styles.iconMedium} />
                  <div className={styles.actionText}>
                    <p className={styles.actionTitle}>Report on GitHub</p>
                    <p className={styles.actionDescription}>
                      File a public issue or PR.
                    </p>
                  </div>
                  <ExternalLink className={styles.externalIcon} />
                </div>
              </a>

              <a
                href="mailto:support@maketable.app"
                className={styles.actionCard}
              >
                <div className={styles.actionContent}>
                  <Mail className={styles.iconMedium} />
                  <div className={styles.actionText}>
                    <p className={styles.actionTitle}>Email support</p>
                    <p className={styles.actionDescription}>
                      support@maketable.app
                    </p>
                  </div>
                  <ExternalLink className={styles.externalIcon} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
