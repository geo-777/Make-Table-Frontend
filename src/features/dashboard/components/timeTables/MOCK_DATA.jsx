/**
 * This file was generated using AI so there might be inconsistencies.
*/

const subjects = {
  maths:   { id: 1, name: "Mathematics",  created_at: "2024-01-01T00:00:00", isLab: false, hardness: "Med", rgb_code: "#378ADD" },
  physics: { id: 2, name: "Physics",       created_at: "2024-01-01T00:00:00", isLab: false, hardness: "High", rgb_code: "#1D9E75" },
  chem:    { id: 3, name: "Chemistry",     created_at: "2024-01-01T00:00:00", isLab: false, hardness: "High", rgb_code: "#D85A30" },
  english: { id: 4, name: "English",       created_at: "2024-01-01T00:00:00", isLab: false, hardness: "Low",  rgb_code: "#7F77DD" },
  history: { id: 5, name: "History",       created_at: "2024-01-01T00:00:00", isLab: false, hardness: "Low",  rgb_code: "#BA7517" },
  biology: { id: 6, name: "Biology",       created_at: "2024-01-01T00:00:00", isLab: false, hardness: "Med", rgb_code: "#D4537E" },
  physLab: { id: 7, name: "Physics Lab",   created_at: "2024-01-01T00:00:00", isLab: true,  hardness: "High", rgb_code: "#1D9E75" },
  chemLab: { id: 8, name: "Chem Lab",      created_at: "2024-01-01T00:00:00", isLab: true,  hardness: "High", rgb_code: "#D85A30" },
};

const teachers = {
  priya:  { id: 1, name: "Ms. Priya",  created_at: "2024-01-01T00:00:00" },
  rajan:  { id: 2, name: "Mr. Rajan",  created_at: "2024-01-01T00:00:00" },
  anitha: { id: 3, name: "Ms. Anitha", created_at: "2024-01-01T00:00:00" },
  suresh: { id: 4, name: "Mr. Suresh", created_at: "2024-01-01T00:00:00" },
  divya:  { id: 5, name: "Ms. Divya",  created_at: "2024-01-01T00:00:00" },
};

const classrooms = {
  c10A: { id: 1, class_name: "10A",   room_name: "R-101",     isLab: false, created_at: "2024-01-01T00:00:00" },
  c10B: { id: 2, class_name: "10B",   room_name: "R-102",     isLab: false, created_at: "2024-01-01T00:00:00" },
  lab1: { id: 3, class_name: "Lab-1", room_name: "Lab Block",  isLab: true,  created_at: "2024-01-01T00:00:00" },
};

export const mockClassEntries = {
  Mon: [
    { id:  1, slot: 1, day: "Mon", subject: subjects.maths,   lab: null,            role: "Subject_Teacher", teacher: teachers.priya  },
    { id:  2, slot: 2, day: "Mon", subject: subjects.physics,  lab: null,            role: "Subject_Teacher", teacher: teachers.rajan  },
    { id:  3, slot: 3, day: "Mon", subject: subjects.physLab,  lab: classrooms.lab1, role: "Subject_Teacher", teacher: teachers.rajan  },
    { id:  4, slot: 4, day: "Mon", subject: subjects.physLab,  lab: classrooms.lab1, role: "Subject_Teacher", teacher: teachers.rajan  },
    null,
    { id:  5, slot: 6, day: "Mon", subject: subjects.english,  lab: null,            role: "Class_Teacher",   teacher: teachers.priya  },
    { id:  6, slot: 7, day: "Mon", subject: subjects.history,  lab: null,            role: "Subject_Teacher", teacher: teachers.suresh },
  ],
  Tue: [
    { id:  7, slot: 1, day: "Tue", subject: subjects.chem,    lab: null, role: "Subject_Teacher", teacher: teachers.anitha },
    { id:  8, slot: 2, day: "Tue", subject: subjects.maths,   lab: null, role: "Subject_Teacher", teacher: teachers.priya  },
    { id:  9, slot: 3, day: "Tue", subject: subjects.biology,  lab: null, role: "Subject_Teacher", teacher: teachers.divya  },
    null,
    { id: 10, slot: 5, day: "Tue", subject: subjects.english,  lab: null, role: "Class_Teacher",   teacher: teachers.priya  },
    { id: 11, slot: 6, day: "Tue", subject: subjects.physics,  lab: null, role: "Subject_Teacher", teacher: teachers.rajan  },
    { id: 12, slot: 7, day: "Tue", subject: subjects.history,  lab: null, role: "Subject_Teacher", teacher: teachers.suresh },
  ],
  Wed: [
    { id: 13, slot: 1, day: "Wed", subject: subjects.maths,   lab: null,            role: "Subject_Teacher", teacher: teachers.priya  },
    { id: 14, slot: 2, day: "Wed", subject: subjects.chemLab,  lab: classrooms.lab1, role: "Subject_Teacher", teacher: teachers.anitha },
    { id: 15, slot: 3, day: "Wed", subject: subjects.chemLab,  lab: classrooms.lab1, role: "Subject_Teacher", teacher: teachers.anitha },
    { id: 16, slot: 4, day: "Wed", subject: subjects.biology,  lab: null,            role: "Subject_Teacher", teacher: teachers.divya  },
    { id: 17, slot: 5, day: "Wed", subject: subjects.chem,    lab: null,            role: "Subject_Teacher", teacher: teachers.anitha },
    null,
    { id: 18, slot: 7, day: "Wed", subject: subjects.english,  lab: null,            role: "Class_Teacher",   teacher: teachers.priya  },
  ],
  Thu: [
    null,
    { id: 19, slot: 2, day: "Thu", subject: subjects.physics,  lab: null, role: "Subject_Teacher", teacher: teachers.rajan  },
    { id: 20, slot: 3, day: "Thu", subject: subjects.maths,   lab: null, role: "Subject_Teacher", teacher: teachers.priya  },
    { id: 21, slot: 4, day: "Thu", subject: subjects.history,  lab: null, role: "Subject_Teacher", teacher: teachers.suresh },
    { id: 22, slot: 5, day: "Thu", subject: subjects.chem,    lab: null, role: "Subject_Teacher", teacher: teachers.anitha },
    { id: 23, slot: 6, day: "Thu", subject: subjects.biology,  lab: null, role: "Subject_Teacher", teacher: teachers.divya  },
    { id: 24, slot: 7, day: "Thu", subject: subjects.english,  lab: null, role: "Class_Teacher",   teacher: teachers.priya  },
  ],
  Fri: [
    { id: 25, slot: 1, day: "Fri", subject: subjects.biology,  lab: null, role: "Subject_Teacher", teacher: teachers.divya  },
    { id: 26, slot: 2, day: "Fri", subject: subjects.maths,   lab: null, role: "Subject_Teacher", teacher: teachers.priya  },
    { id: 27, slot: 3, day: "Fri", subject: subjects.physics,  lab: null, role: "Subject_Teacher", teacher: teachers.rajan  },
    { id: 28, slot: 4, day: "Fri", subject: subjects.chem,    lab: null, role: "Subject_Teacher", teacher: teachers.anitha },
    null,
    { id: 29, slot: 6, day: "Fri", subject: subjects.history,  lab: null, role: "Subject_Teacher", teacher: teachers.suresh },
    { id: 30, slot: 7, day: "Fri", subject: subjects.english,  lab: null, role: "Class_Teacher",   teacher: teachers.priya  },
  ],
};

export const mockTeacherEntries = {
  Mon: [
    { id:  1, slot: 1, day: "Mon", subject: subjects.maths,   lab: null, role: "Subject_Teacher", class_: classrooms.c10A },
    { id:  2, slot: 2, day: "Mon", subject: subjects.maths,   lab: null, role: "Subject_Teacher", class_: classrooms.c10B },
    null, null, null,
    { id:  3, slot: 6, day: "Mon", subject: subjects.english,  lab: null, role: "Class_Teacher",   class_: classrooms.c10A },
    null,
  ],
  Tue: [
    null,
    { id:  4, slot: 2, day: "Tue", subject: subjects.maths,   lab: null, role: "Subject_Teacher", class_: classrooms.c10B },
    null, null,
    { id:  5, slot: 5, day: "Tue", subject: subjects.english,  lab: null, role: "Class_Teacher",   class_: classrooms.c10A },
    null, null,
  ],
  Wed: [
    { id:  6, slot: 1, day: "Wed", subject: subjects.maths,   lab: null, role: "Subject_Teacher", class_: classrooms.c10A },
    null, null, null, null, null,
    { id:  7, slot: 7, day: "Wed", subject: subjects.english,  lab: null, role: "Class_Teacher",   class_: classrooms.c10A },
  ],
  Thu: [
    null, null,
    { id:  8, slot: 3, day: "Thu", subject: subjects.maths,   lab: null, role: "Subject_Teacher", class_: classrooms.c10A },
    null, null, null,
    { id:  9, slot: 7, day: "Thu", subject: subjects.english,  lab: null, role: "Class_Teacher",   class_: classrooms.c10A },
  ],
  Fri: [
    null,
    { id: 10, slot: 2, day: "Fri", subject: subjects.maths,   lab: null, role: "Subject_Teacher", class_: classrooms.c10A },
    null, null, null, null,
    { id: 11, slot: 7, day: "Fri", subject: subjects.english,  lab: null, role: "Class_Teacher",   class_: classrooms.c10A },
  ],
};

export const mockTimetable = {
  id: 1,
  name: "2024-25 Term 1",
  slots: 7,
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  status: "Active",
  view_status: "Private",
  violations: null,
};