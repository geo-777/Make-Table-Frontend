// This file is for generating mock datas (use it carefully)

// How to use:
//    #1. remove all volumes for a fresh start ( this ensures that every id starts with 1 )
//    #2. login and create a timetable
//    #3. quit running frontend
//    #4. import mock.jsx file in the main.jsx file (import "../tools/mock.jsx")
//    #5. run `npm run dev`
//    #6. wait a few seconds for initialization
//    #7. remove import from the main.jsx file (this is to ensure that it only execute once. otherwise there will be conflicts)

import axiosInstance from "../api/axiosInstance";

export const mockData = {
  classes: [
    { class_name: "BCA 1B", room_name: "R102", isLab: false },
    { class_name: "BCA 2B", room_name: "R202", isLab: false },
    { class_name: "BCA 1A", room_name: "R101", isLab: false },
    { class_name: "BCA 2A", room_name: "R201", isLab: false },
    { class_name: "MCA 1A", room_name: "R401", isLab: false },
    { class_name: "BCA 3B", room_name: "R302", isLab: false },
    { class_name: "BCA 3A", room_name: "R301", isLab: false },
    { class_name: "MCA 2A", room_name: "R402", isLab: false },
    { class_name: "Computer Lab 1", room_name: "LAB101", isLab: true },
    { class_name: "Computer Lab 2", room_name: "LAB102", isLab: true },
  ],

  teachers: [
    {
      name: "Dr. Catherine Lee",
      max_classes_day: 5,
      max_classes_week: 24,
      max_classes_consecutive: 3,
    },
    {
      name: "Prof. David Kumar",
      max_classes_day: 5,
      max_classes_week: 24,
      max_classes_consecutive: 3,
    },
    {
      name: "Dr. Alice Johnson",
      max_classes_day: 5,
      max_classes_week: 24,
      max_classes_consecutive: 3,
    },
    {
      name: "Dr. Emma Wilson",
      max_classes_day: 5,
      max_classes_week: 22,
      max_classes_consecutive: 3,
    },
    {
      name: "Prof. Frank Thomas",
      max_classes_day: 5,
      max_classes_week: 22,
      max_classes_consecutive: 3,
    },
    {
      name: "Prof. Brian Smith",
      max_classes_day: 5,
      max_classes_week: 24,
      max_classes_consecutive: 3,
    },
    {
      name: "Dr. Grace Martin",
      max_classes_day: 4,
      max_classes_week: 20,
      max_classes_consecutive: 2,
    },
    {
      name: "Dr. Karen White",
      max_classes_day: 4,
      max_classes_week: 18,
      max_classes_consecutive: 2,
    },
    {
      name: "Dr. Irene Brown",
      max_classes_day: 5,
      max_classes_week: 24,
      max_classes_consecutive: 3,
    },
    {
      name: "Prof. Jack Anderson",
      max_classes_day: 5,
      max_classes_week: 24,
      max_classes_consecutive: 3,
    },
    {
      name: "Prof. Henry Davis",
      max_classes_day: 4,
      max_classes_week: 20,
      max_classes_consecutive: 2,
    },
    {
      name: "Prof. Liam Garcia",
      max_classes_day: 4,
      max_classes_week: 18,
      max_classes_consecutive: 2,
    },
    {
      name: "Dr. Maya Patel",
      max_classes_day: 5,
      max_classes_week: 22,
      max_classes_consecutive: 3,
    },
    {
      name: "Prof. Noah Rodriguez",
      max_classes_day: 4,
      max_classes_week: 18,
      max_classes_consecutive: 2,
    },
    {
      name: "Dr. Olivia Clark",
      max_classes_day: 4,
      max_classes_week: 18,
      max_classes_consecutive: 2,
    },
    {
      name: "Prof. Peter Lewis",
      max_classes_day: 4,
      max_classes_week: 18,
      max_classes_consecutive: 2,
    },
    {
      name: "Dr. Quinn Hall",
      max_classes_day: 5,
      max_classes_week: 20,
      max_classes_consecutive: 3,
    },
    {
      name: "Prof. Rachel Young",
      max_classes_day: 5,
      max_classes_week: 20,
      max_classes_consecutive: 3,
    },
  ],

  subjects: [
    {
      name: "Operating Systems",
      isLab: false,
      hardness: "High",
      rgb_code: "rgb(221, 160, 221)",
      min_classes_day: 1,
      max_classes_day: 2,
      min_classes_week: 3,
      max_classes_week: 4,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Mathematics",
      isLab: false,
      hardness: "High",
      rgb_code: "rgb(255, 107, 107)",
      min_classes_day: 1,
      max_classes_day: 2,
      min_classes_week: 4,
      max_classes_week: 5,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Database Systems",
      isLab: false,
      hardness: "Med",
      rgb_code: "rgb(150, 206, 180)",
      min_classes_day: 1,
      max_classes_day: 2,
      min_classes_week: 3,
      max_classes_week: 4,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Computer Networks",
      isLab: false,
      hardness: "Med",
      rgb_code: "rgb(255, 234, 167)",
      min_classes_day: 1,
      max_classes_day: 2,
      min_classes_week: 3,
      max_classes_week: 4,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Programming Fundamentals",
      isLab: false,
      hardness: "High",
      rgb_code: "rgb(78, 205, 196)",
      min_classes_day: 1,
      max_classes_day: 2,
      min_classes_week: 4,
      max_classes_week: 5,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Data Structures",
      isLab: false,
      hardness: "High",
      rgb_code: "rgb(69, 183, 209)",
      min_classes_day: 1,
      max_classes_day: 2,
      min_classes_week: 3,
      max_classes_week: 4,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Software Engineering",
      isLab: false,
      hardness: "Med",
      rgb_code: "rgb(152, 216, 200)",
      min_classes_day: 1,
      max_classes_day: 1,
      min_classes_week: 2,
      max_classes_week: 3,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Artificial Intelligence",
      isLab: false,
      hardness: "High",
      rgb_code: "rgb(187, 143, 206)",
      min_classes_day: 1,
      max_classes_day: 1,
      min_classes_week: 2,
      max_classes_week: 3,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Web Development",
      isLab: false,
      hardness: "Low",
      rgb_code: "rgb(247, 220, 111)",
      min_classes_day: 1,
      max_classes_day: 2,
      min_classes_week: 3,
      max_classes_week: 4,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Project Work",
      isLab: false,
      hardness: "Low",
      rgb_code: "rgb(170, 183, 184)",
      min_classes_day: 1,
      max_classes_day: 1,
      min_classes_week: 2,
      max_classes_week: 2,
      min_classes_consecutive: 1,
      max_classes_consecutive: 2,
      lab_classes: null,
    },
    {
      name: "Programming Lab",
      isLab: true,
      hardness: "Med",
      rgb_code: "rgb(49, 130, 211)",
      min_classes_day: 1,
      max_classes_day: 1,
      min_classes_week: 2,
      max_classes_week: 3,
      min_classes_consecutive: 2,
      max_classes_consecutive: 3,
      lab_classes: [9],
    },
    {
      name: "Database Lab",
      isLab: true,
      hardness: "Med",
      rgb_code: "rgb(184, 102, 225)",
      min_classes_day: 1,
      max_classes_day: 1,
      min_classes_week: 2,
      max_classes_week: 3,
      min_classes_consecutive: 2,
      max_classes_consecutive: 3,
      lab_classes: [10],
    },
    {
      name: "Network Lab",
      isLab: true,
      hardness: "Low",
      rgb_code: "rgb(47, 133, 218)",
      min_classes_day: 1,
      max_classes_day: 1,
      min_classes_week: 2,
      max_classes_week: 2,
      min_classes_consecutive: 2,
      max_classes_consecutive: 3,
      lab_classes: [9],
    },
  ],

  assignments: [
    {
      teacher_id: 10,
      class_id: 3,
      subject_id: 6,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 9,
      class_id: 3,
      subject_id: 2,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 18,
      class_id: 3,
      subject_id: 11,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 14,
      class_id: 3,
      subject_id: 7,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 2,
      class_id: 3,
      subject_id: 5,
      role: "Class_Teacher",
      morning_class_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    {
      teacher_id: 4,
      class_id: 1,
      subject_id: 1,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 1,
      class_id: 1,
      subject_id: 2,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 6,
      class_id: 1,
      subject_id: 6,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 3,
      class_id: 1,
      subject_id: 5,
      role: "Class_Teacher",
      morning_class_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    {
      teacher_id: 15,
      class_id: 1,
      subject_id: 7,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 17,
      class_id: 1,
      subject_id: 11,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 9,
      class_id: 4,
      subject_id: 2,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 8,
      class_id: 4,
      subject_id: 4,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 4,
      class_id: 4,
      subject_id: 1,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 12,
      class_id: 4,
      subject_id: 9,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 11,
      class_id: 4,
      subject_id: 12,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 13,
      class_id: 4,
      subject_id: 3,
      role: "Class_Teacher",
      morning_class_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    {
      teacher_id: 7,
      class_id: 2,
      subject_id: 3,
      role: "Class_Teacher",
      morning_class_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    {
      teacher_id: 1,
      class_id: 2,
      subject_id: 2,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 8,
      class_id: 2,
      subject_id: 4,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 12,
      class_id: 2,
      subject_id: 9,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 5,
      class_id: 2,
      subject_id: 1,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 16,
      class_id: 2,
      subject_id: 12,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 8,
      class_id: 7,
      subject_id: 4,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 10,
      class_id: 7,
      subject_id: 8,
      role: "Class_Teacher",
      morning_class_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    {
      teacher_id: 6,
      class_id: 7,
      subject_id: 3,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 12,
      class_id: 7,
      subject_id: 9,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 14,
      class_id: 7,
      subject_id: 10,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 16,
      class_id: 7,
      subject_id: 13,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 11,
      class_id: 6,
      subject_id: 3,
      role: "Class_Teacher",
      morning_class_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    {
      teacher_id: 8,
      class_id: 6,
      subject_id: 4,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 15,
      class_id: 6,
      subject_id: 10,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 12,
      class_id: 6,
      subject_id: 9,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 14,
      class_id: 6,
      subject_id: 13,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 13,
      class_id: 5,
      subject_id: 3,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 8,
      class_id: 5,
      subject_id: 4,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 9,
      class_id: 5,
      subject_id: 2,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 18,
      class_id: 5,
      subject_id: 12,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 3,
      class_id: 5,
      subject_id: 5,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 1,
      class_id: 8,
      subject_id: 8,
      role: "Class_Teacher",
      morning_class_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    {
      teacher_id: 4,
      class_id: 8,
      subject_id: 1,
      role: "Subject_Teacher",
      morning_class_days: ["Mon", "Wed", "Fri"],
    },
    {
      teacher_id: 6,
      class_id: 8,
      subject_id: 4,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 17,
      class_id: 8,
      subject_id: 9,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 17,
      class_id: 8,
      subject_id: 13,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
    {
      teacher_id: 15,
      class_id: 8,
      subject_id: 10,
      role: "Subject_Teacher",
      morning_class_days: [],
    },
  ],
};

async function handleClasses(timetableId) {
  for (const c of mockData.classes) {
    await axiosInstance.post(`/timetables/${timetableId}/classes`, c);
  }
  console.log("classes created successfully");
}

async function handleTeachers(timetableId) {
  for (const t of mockData.teachers) {
    await axiosInstance.post(`/timetables/${timetableId}/teachers`, t);
  }
  console.log("teachers created successfully");
}

async function handleSubjects(timetableId) {
  for (const s of mockData.subjects) {
    await axiosInstance.post(`/timetables/${timetableId}/subjects`, s);
  }
  console.log("subjects created successfully");
}

async function handleAssignments() {
  for (const a of mockData.assignments) {
    await axiosInstance.post(`/assignments`, a);
  }
  console.log("assignments created successfully");
}

export const initMockData = (timetableId = 1) => {
  try {
    handleClasses(timetableId);
    handleSubjects(timetableId);
    handleTeachers(timetableId);

    handleAssignments(timetableId);
  } catch(err) {
    throw new Error(err);
  }
};

initMockData();