import styles from "../styles/assignments.module.css";
import ListView from "../../../shared/components/itemView/listView/listView";
import Topbar from "../../../shared/components/topbar/Topbar";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import { useState } from "react";
import { useAssignmentsView } from "../../../shared/zustand/listingsViewStore";
const COLUMNS = [
  {
    key: "teacher_name",
    label: "Teacher",
    render: (value) => value,
  },
  {
    key: "class_name",
    label: "Class",
    render: (value) => value,
  },
  {
    key: "subject_name",
    label: "Subject",
    render: (value) => value,
  },
  {
    key: "role",
    label: "Role",
    render: (value) => value,
  },
  {
    key: "morning_class_days",
    label: "Morning Days",
    render: (value) => value,
  },
];

const MOCK_DATA = [
  {
    id: 0,
    teacher_name: "John Mathew",
    class_name: "10-A",
    subject_name: "Mathematics",
    role: "Class Teacher",
    morning_class_days: ["Mon", "Tue", "Wed"],
  },
  {
    id: 1,
    teacher_name: "Sarah Joseph",
    class_name: "9-B",
    subject_name: "Physics",
    role: "Assistant Teacher",
    morning_class_days: ["Thu", "Fri"],
  },
  {
    id: 2,
    teacher_name: "David Thomas",
    class_name: "8-C",
    subject_name: "English",
    role: "Subject Teacher",
    morning_class_days: ["Mon", "Wed", "Fri"],
  },
  {
    id: 3,
    teacher_name: "Anna George",
    class_name: "12-A",
    subject_name: "Chemistry",
    role: "Class Teacher",
    morning_class_days: ["Tue"],
  },
];

const Assignments = () => {
  const { selectedTimetableData } = useTimeTableSelect();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { activeView, setActiveView } = useAssignmentsView();

  const assignData = MOCK_DATA;

  return (
    <div className="App">
      <div className="mainPlaceholder">
        <Topbar page={"Assignments"} />

        <PageHeader
          title={"Assignments"}
          description={
            selectedTimetableData?.name
              ? `Define teacher-class assignments for ${selectedTimetableData.name}`
              : "Select a timetable to define teacher-class assignments."
          }
          addButtonText={"Add Assignment"}
          activeView={activeView}
          onChangeActiveView={setActiveView}
          onAdd={() => {
            setCreateDialogOpen(true);
          }}
          onBulkImport={() => {}}
        />

        {!!assignData.length && activeView === "list" && (
          <ListView
            columns={COLUMNS}
            data={assignData}
            onEdit={(_, data) => {
              console.log(data);
            }}
            onDelete={(id) => {
              console.log(id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Assignments;
