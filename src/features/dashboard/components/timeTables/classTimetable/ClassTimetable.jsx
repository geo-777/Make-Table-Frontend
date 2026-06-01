import Table from "../Table";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const SLOT_COUNT = 6;

// color key -> maps to a CSS module class (this is a temp solution)
const SUBJECT_COLOR = {
  Math: "colorPrimary",
  Physics: "colorSky",
  CS101: "colorTeal",
  English: "colorRose",
  History: "colorAmber",
};

// null = free period
const MOCK_ENTRIES = {
  Monday: [
    { subject: "Math", class: "CSE-A", teacher: "Dr. Smith" },
    { subject: "Physics", class: "CSE-A", teacher: "Dr. Jones" },
    { subject: "CS101", class: "CSE-A", teacher: "Prof. Kumar", isLab: true },
    { subject: "CS101", class: "CSE-A", teacher: "Prof. Kumar", isLab: true },
    { subject: "English", class: "CSE-A", teacher: "Ms. Davis" },
    null,
  ],
  Tuesday: [
    { subject: "CS101", class: "CSE-A", teacher: "Prof. Kumar" },
    { subject: "Math", class: "CSE-A", teacher: "Dr. Smith" },
    { subject: "History", class: "CSE-A", teacher: "Dr. Brown" },
    null,
    { subject: "Physics", class: "CSE-A", teacher: "Dr. Jones" },
    { subject: "English", class: "CSE-A", teacher: "Ms. Davis" },
  ],
  Wednesday: [
    { subject: "Physics", class: "CSE-A", teacher: "Dr. Jones" },
    { subject: "Math", class: "CSE-A", teacher: "Dr. Smith" },
    null,
    { subject: "CS101", class: "CSE-A", teacher: "Prof. Kumar" },
    { subject: "History", class: "CSE-A", teacher: "Dr. Brown" },
    null,
  ],
  Thursday: [
    { subject: "English", class: "CSE-A", teacher: "Ms. Davis" },
    { subject: "Physics", class: "CSE-A", teacher: "Dr. Jones" },
    { subject: "Math", class: "CSE-A", teacher: "Dr. Smith" },
    { subject: "CS101", class: "CSE-A", teacher: "Prof. Kumar" },
    null,
    { subject: "History", class: "CSE-A", teacher: "Dr. Brown" },
  ],
  Friday: [
    { subject: "Math", class: "CSE-A", teacher: "Dr. Smith" },
    null,
    { subject: "English", class: "CSE-A", teacher: "Ms. Davis" },
    { subject: "Physics", class: "CSE-A", teacher: "Dr. Jones" },
    { subject: "CS101", class: "CSE-A", teacher: "Prof. Kumar" },
    null,
  ],
};

export default function ClassTimetable() {
  return (
    <Table 
      entries={MOCK_ENTRIES}
      slotCount={SLOT_COUNT}
      days={DAYS}
      colors={SUBJECT_COLOR}
    />
  );
}
