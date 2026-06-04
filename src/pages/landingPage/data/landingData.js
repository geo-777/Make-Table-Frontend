import {
  Workflow,
  Wand2,
  Layers,
  FileDown,
  ShieldCheck,
  SearchCheck,
} from "lucide-react";

export const FEATURES = [
  {
    icon: Workflow,
    title: "Constraint solver",
    desc: "A deterministic engine that respects teacher availability, room capacity, subject load and break windows every time.",
  },
  {
    icon: Wand2,
    title: "Fast regeneration",
    desc: "Move one class, lock a slot, change a teacher's hours. The grid recomputes without breaking pinned slots.",
  },
  {
    icon: Layers,
    title: "Class & teacher views",
    desc: "Switch between per-class, per-teacher and master schedule views from a single source of truth.",
  },
  {
    icon: FileDown,
    title: "Easy timetable sharing",
    desc: "Make schedules publicly accessible and share them with anyone in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Workspace isolation",
    desc: "Each timetable lives in its own workspace with proper separation and permissions.",
  },
  {
    icon: SearchCheck,
    title: "Conflict detection",
    desc: "Instantly spot teacher overlaps, duplicate allocations and scheduling conflicts before publishing.",
  },
];

export const STEPS = [
  {
    n: "01",
    t: "Model your school",
    d: "Add classes, subjects, teachers, rooms and any hard or soft constraints. Import from CSV or clone last year's setup.",
  },
  {
    n: "02",
    t: "Generate",
    d: "Run the solver. It returns a fully resolved timetable with every conflict accounted for.",
  },
  {
    n: "03",
    t: "Publish",
    d: "Review, tweak, export and share teacher or class views with a single link.",
  },
];

export const FAQS = [
  {
    q: "Do I need to install anything?",
    a: "No. MakeTable runs in your browser. Sign up, create a workspace and start scheduling immediately.",
  },
  {
    q: "Can I import existing data?",
    a: "Yes. Import CSV files, paste spreadsheet data, or clone an existing timetable.",
  },
  {
    q: "How are constraints handled?",
    a: "Hard constraints like teacher availability and room availability are never violated. Soft constraints are optimized automatically.",
  },
  {
    q: "Is it really free?",
    a: "Yes. MakeTable is MIT licensed and free to use. You can self-host it or use the hosted version.",
  },
];
