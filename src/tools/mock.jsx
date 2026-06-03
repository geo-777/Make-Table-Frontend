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
import { MOCK_DATA } from "./MOCK_DATA";

async function handleEntries(label, items, urlFn) {
  const failed = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      await axiosInstance.post(urlFn(item), item);
    } catch (err) {
      failed.push({
        index: i,
        id: i + 1,
        data: item,
        status: err?.response?.status ?? "network error",
        message: err?.response?.data?.message ?? err.message,
      });
    }
  }

  if (failed.length === 0) {
    console.log(
      `${label}: all ${items.length} entries created successfully`,
    );
  } else {
    console.warn(
      `${label}: ${failed.length}/${items.length} entries failed`,
    );
    console.table(
      failed.map((f) => ({
        id: f.id,
        status: f.status,
        message: f.message,
        data: JSON.stringify(f.data),
      })),
    );
    console.groupCollapsed(`${label} — failed entries (full detail)`);
    failed.forEach((f) => console.error(`  [id ${f.id}]`, f));
    console.groupEnd();
  }

  return failed;
}

function handleClasses(timetableId) {
  return handleEntries(
    "Classes",
    MOCK_DATA.classes,
    () => `/timetables/${timetableId}/classes`,
  );
}

function handleTeachers(timetableId) {
  return handleEntries(
    "Teachers",
    MOCK_DATA.teachers,
    () => `/timetables/${timetableId}/teachers`,
  );
}

function handleSubjects(timetableId) {
  return handleEntries(
    "Subjects",
    MOCK_DATA.subjects,
    () => `/timetables/${timetableId}/subjects`,
  );
}

function handleAssignments() {
  return handleEntries(
    "Assignments",
    MOCK_DATA.assignments,
    () => `/assignments`,
  );
}

export const initMockData = async (timetableId = 1) => {
  console.group("Mock data initialization");

  const classFailures = await handleClasses(timetableId);
  const subjectFailures = await handleSubjects(timetableId);
  const teacherFailures = await handleTeachers(timetableId);

  if ([...classFailures, ...subjectFailures, ...teacherFailures].length > 0) {
    console.warn(
      "Upstream failures detected — assignment ids may be misaligned. Fix the above before proceeding.",
    );
  }

  const assignmentFailures = await handleAssignments(timetableId);

  const totalFailed = [
    ...classFailures,
    ...subjectFailures,
    ...teacherFailures,
    ...assignmentFailures,
  ].length;

  if (totalFailed === 0) {
    console.log("All mock data created successfully!");
  } else {
    console.error(
      `Initialization finished with ${totalFailed} failure(s). See warnings above.`,
    );
  }

  console.groupEnd();
};

initMockData();