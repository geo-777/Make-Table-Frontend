import { useAuth } from "../../app/providers/AuthProvider";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  BookOpen,
  Rocket,
  Layers,
  Users,
  GraduationCap,
  Link2,
  Sparkles,
  Settings as SettingsIcon,
  Download,
  ChevronRight,
  Search,
  Play,
} from "lucide-react";

import styles from "./Documentation.module.css";

const SECTIONS = [
  {
    id: "getting-started",
    title: "Getting started",
    icon: Rocket,
    content: [
      {
        h: "Create your first timetable",
        p: "Sign up for free, open the dashboard and click ‘New timetable’. Give it a name, pick your week template, and you're ready to add data.",
      },
      {
        h: "Workspaces",
        p: "Everything in MakeTable is scoped to a workspace (a timetable). Switch workspaces from the sidebar — data never leaks between them.",
      },
    ],
  },
  {
    id: "classes",
    title: "Classes",
    icon: BookOpen,
    content: [
      {
        h: "Adding classes",
        p: "Open Classes from the sidebar. Use List view for fast inline edits (Enter to save, Esc to cancel) or Grid view for the full dialog.",
      },
      {
        h: "Bulk import",
        p: "Paste from a spreadsheet, upload a CSV, or clone from another timetable in your workspace.",
      },
    ],
  },
  {
    id: "subjects",
    title: "Subjects",
    icon: GraduationCap,
    content: [
      {
        h: "Defining subjects",
        p: "Each subject has a name, code, color, weekly hours, and constraints (e.g. ‘not after lunch’, ‘requires lab’).",
      },
      {
        h: "Color coding",
        p: "Subject colors flow through the entire timetable grid so visual scanning is instant.",
      },
    ],
  },
  {
    id: "teachers",
    title: "Teachers",
    icon: Users,
    content: [
      {
        h: "Availability",
        p: "Mark blocked slots per teacher. The solver respects these as hard constraints.",
      },
      {
        h: "Max load",
        p: "Set max periods/day and per week — MakeTable keeps the load balanced automatically.",
      },
    ],
  },
  {
    id: "assignments",
    title: "Assignments",
    icon: Link2,
    content: [
      {
        h: "Link the dots",
        p: "Assignments connect a class × subject × teacher. The generator only schedules valid combinations.",
      },
    ],
  },
  {
    id: "generation",
    title: "Generation",
    icon: Sparkles,
    content: [
      {
        h: "How it works",
        p: "MakeTable runs a constraint-solving engine that explores valid schedules and ranks them by conflict score, balance, and your preferences.",
      },
    ],
  },
  {
    id: "exports",
    title: "Exports",
    icon: Download,
    content: [
      {
        h: "PDF & CSV",
        p: "Export a single class, a teacher schedule, or the full master timetable. Files are ready to print or share.",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: SettingsIcon,
    content: [
      {
        h: "Profile & preferences",
        p: "Update your name, email, password, default view, and week start in Settings.",
      },
      {
        h: "Theme",
        p: "Light, dark, or follow system — switch anytime from Appearance.",
      },
    ],
  },
];

export default function Documentation() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    const videoEl = document.getElementById("video-tutorial");
    if (videoEl) obs.observe(videoEl);
    return () => obs.disconnect();
  }, []);

  const filtered = SECTIONS.map((s) => ({
    ...s,
    content: s.content.filter(
      (c) =>
        !query ||
        c.h.toLowerCase().includes(query.toLowerCase()) ||
        c.p.toLowerCase().includes(query.toLowerCase()) ||
        s.title.toLowerCase().includes(query.toLowerCase()),
    ),
  })).filter((s) => s.content.length > 0);

  return (
    <div className={styles.container}>
      <div className={styles.blobsWrapper}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Calendar size={16} />
            </div>
            <span>MakeTable</span>
            <span className={styles.docsBadge}>Docs</span>
          </Link>
          <div className={styles.headerActions}>
            <button
              className={styles.ghostButton}
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={14} /> Home
            </button>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  navigate("/dashboard");
                } else {
                  navigate("/login");
                }
              }}
              className={styles.primaryButton}
            >
              {isAuthenticated ? "Open app" : "Login"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${styles.heroBadge} ${styles.glass}`}
          >
            <BookOpen size={12} className={styles.heroBadgeIcon} />
            Documentation • v1.0
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={styles.heroTitle}
          >
            Everything you need to{" "}
            <span className={styles.textGradient}>ship a timetable.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={styles.searchWrapper}
          >
            <Search className={styles.searchIcon} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the docs…"
              className={styles.searchInput}
            />
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className={styles.mainLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`${styles.navLink} ${
                  active === s.id
                    ? styles.navLinkActive
                    : styles.navLinkInactive
                }`}
              >
                <s.icon size={14} />
                {s.title}
                {active === s.id && (
                  <ChevronRight size={12} className={styles.chevron} />
                )}
              </a>
            ))}
            <a
              href="#video-tutorial"
              className={`${styles.navLink} ${
                active === "video-tutorial"
                  ? styles.navLinkActive
                  : styles.navLinkInactive
              }`}
            >
              <Play size={14} />
              Video Tutorial
              {active === "video-tutorial" && (
                <ChevronRight size={12} className={styles.chevron} />
              )}
            </a>
          </nav>
        </aside>

        {/* Content */}
        <div className={styles.contentArea}>
          {filtered.length === 0 && (
            <p className={styles.noResults}>No results for “{query}”.</p>
          )}
          {filtered.map((section) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={styles.section}
            >
              <div className={styles.sectionHeader}>
                <div className={`${styles.sectionIconWrapper} ${styles.glass}`}>
                  <section.icon size={16} className={styles.sectionIcon} />
                </div>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>
              <div className={styles.cardGrid}>
                {section.content.map((c) => (
                  <div key={c.h} className={`${styles.card} ${styles.glass}`}>
                    <h3 className={styles.cardTitle}>{c.h}</h3>
                    <p className={styles.cardText}>{c.p}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Video Tutorial */}
          <motion.div
            id="video-tutorial"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className={styles.section}
          >
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIconWrapper} ${styles.glass}`}>
                <Play size={16} className={styles.sectionIcon} />
              </div>
              <h2 className={styles.sectionTitle}>Video Tutorial</h2>
            </div>
            <div className={`${styles.videoWrapper} ${styles.glass}`}>
              <iframe
                className={styles.iframe}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="MakeTable Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* CTA */}
          <div className={`${styles.ctaSection} ${styles.glass}`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <div>
                <h3 className={styles.ctaTitle}>Still stuck?</h3>
                <p className={styles.ctaText}>
                  Open a ticket or chat with the community.
                </p>
              </div>
              <div className={styles.ctaActions}>
                <button
                  className={styles.outlineButton}
                  onClick={() => navigate("/helpsupport")}
                >
                  <Layers size={14} /> Support center
                </button>
                <button
                  className={styles.primaryButton}
                  onClick={() => navigate("/register")}
                >
                  Get started free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} MakeTable. MIT licensed.
      </footer>
    </div>
  );
}
