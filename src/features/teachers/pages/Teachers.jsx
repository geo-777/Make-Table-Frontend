import { useMemo, useState } from "react";
import ListView from "../../../shared/components/itemView/listView/listView";
import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import styles from "../styles/Teachers.module.css";
import TeacherCard from "../components/teacherCard/TeacherCard";
import TeacherDialog from "../components/teacherDialog/TeacherDialog";

/*
  {
    "id":                       number,
    "name":                     string,
    "created_at":              "2026-05-26T09:30:02.815Z",
    "max_classes_day":         number,
    "max_classes_week":        number,
    "max_classes_consecutive": number
  }
*/

const COLUMNS = [
  {
    key: "name",
    label: "Name",
    render: (value) => value,
  },
  {
    key: "max_classes_day",
    label: "Max/Day",
    render: (value) => value,
  },
  {
    key: "max_classes_week",
    label: "Max/Week",
    render: (value) => value,
  },
  {
    key: "max_classes_consecutive",
    label: "Max Consecutive",
    render: (value) => value,
  },
];

const MOCK_TEACHERS = [
  {
    id: 0,
    name: "Leonardo dica pari",
    created_at: "2026-05-26T09:30:02.815Z",
    max_classes_day: 5,
    max_classes_week: 7,
    max_classes_consecutive: 2,
  },
  {
    id: 0,
    name: "Kitler",
    created_at: "2026-05-26T09:30:02.815Z",
    max_classes_day: 5,
    max_classes_week: 7,
    max_classes_consecutive: 2,
  },
  {
    id: 0,
    name: "Superman bin Batman",
    created_at: "2026-05-26T09:30:02.815Z",
    max_classes_day: 5,
    max_classes_week: 7,
    max_classes_consecutive: 2,
  },
];

const Teachers = () => {

  const { selectedTimetableData } = useTimeTableSelect();
  
  const [activeView, setActiveView] = useState("grid");
  const teachers = useMemo(() => (MOCK_TEACHERS), []);

  const [openAddTeacherDialog, setOpenAddTeacherDialog] = useState(false);
  const [openUpdateTeacherDialog, setOpenUpdateTeacherDialog] = useState(false);

  return (
    <div className="App">
      <div className="mainPlaceholder">
        <Topbar page={"Teachers"} />

        <PageHeader
          title={"Teachers"}
          description={
            selectedTimetableData?.name
              ? `Define teacher constraints for ${selectedTimetableData.name}`
              : "Select a timetable to define teacher constraints."
          }
          addButtonText={"Add Teacher"}
          activeView={activeView}
          onChangeActiveView={setActiveView}
          onAdd={() => { setOpenAddTeacherDialog(true); }}
          onBulkImport={() => {}}
        />

        {!teachers.length && (
          <div className={styles.inactiveState}>
            <h4>No Teachers defined.</h4>
            <p>
              Add your first teacher to start defining constraints for this
              timetable.
            </p>
          </div>
        )}

        {!!teachers.length && activeView == "list" && (
          <ListView
            data={teachers}
            columns={COLUMNS}
            onEdit={(_, data) => {
              console.log(data);
            }}
            onDelete={(id) => {
              console.log(id);
            }}
          />
        )}

        {activeView === "grid" && (
          <div className={styles.gridContainer}>
            {teachers.map((teacher) => (
              <TeacherCard
                id={teacher.id}
                name={teacher.name}
                maxPerDay={teacher.max_classes_day}
                maxPerWeek={teacher.max_classes_week}
                consecutive={teacher.max}
                onEdit={() => { setOpenUpdateTeacherDialog(true); }}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}

        {/* Add Teacher */}
        <TeacherDialog
          open={openAddTeacherDialog}
          onClose={() => {
            setOpenAddTeacherDialog(false);
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
        />

        {/* Update Teacher */}
        <TeacherDialog
          open={openUpdateTeacherDialog}
          onClose={() => {
            setOpenUpdateTeacherDialog(false);
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </div>
    </div>
  );
};

export default Teachers;
