import "../../../styles/appLayout.css";
import styles from "../styles/Teachers.module.css";

import { useMemo, useState } from "react";

import ListView from "../../../shared/components/itemView/listView/listView";
import Topbar from "../../../shared/components/topbar/Topbar";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import TeacherDialog from "../components/teacherDialog/TeacherDialog";
import TeacherCard from "../components/teacherCard/TeacherCard";
import ImportDialog from "../../../shared/components/importDialog/ImportDialog";
import Loader from "../../../shared/components/loader/Loader";

import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import useTeachers from "../hooks/useTeachers";


/*
  {
    "id":                       number,
    "name":                     string,
    "created_at":              "2026-05-26T09:30:02.815Z",
    "max_classes_day":         number,
    "max_classes_week":        number,
    "max_classes_consecutive": number
  }

  TODO: fix the following issues

  Known Issues:
    #1 cannot update any other attributes of teacher other than name.
      reason: the backend uses teachers name as identification which prevents any modifications to existing teachers.
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

const Teachers = () => {

  const { selectedTimetableData } = useTimeTableSelect();

  const {
    data,
    isLoading,
    isError,

    createTeacher,
    deleteTeacher,
    updateTeacher,
  } = useTeachers();
  
  const [activeView, setActiveView] = useState("grid");

  const [openAddTeacherDialog, setOpenAddTeacherDialog] = useState(false);
  const [openUpdateTeacherDialog, setOpenUpdateTeacherDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teachers = useMemo(() => (data?.data ?? []), [data]);

  const handleDeleteTeacher = async (id) => {
    if(!selectedTimetableData?.id) return;

    await deleteTeacher.mutateAsync(id);
  };

  const handleCreateTeacher = async (data) => {
    if (!selectedTimetableData?.id) return;
    
    await createTeacher.mutateAsync({
      id: selectedTimetableData.id,
      data
    });
    setOpenAddTeacherDialog(false);
  };

  const handleUpdateTeacher = async (data) => {
    if (!selectedTimetableData?.id) return;
    const {id, ...payload} = data;
    
    await updateTeacher.mutateAsync({
      id,
      data: payload
    });
    setOpenUpdateTeacherDialog(false);
  };

  if (isLoading) {
    return (
      <div className="App">
        <div className="mainPlaceholder">
          <Topbar page={"Teachers"} />

          <div className={styles.inactiveState}>
            <Loader />
            <p>Fetching teachers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="App">
        <div className="mainPlaceholder">
          <Topbar page={"Teachers"} />

          <div className={styles.inactiveState}>
            <div className={styles.largeIcon}>
              <AlertTriangle size={24} />
            </div>
            <h4>Something went wrong.</h4>
            <p>
              We couldn't load teacher details. Check your connection and try
              refreshing — if it keeps happening, the server might be down.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTimetableData) {
    return (
      <div className="App">
        <div className="mainPlaceholder">
          <Topbar page={"Teachers"} />

          <div className={styles.inactiveState}>
            <h4>No timetable selected.</h4>
            <p>
              Pick a timetable from the workspace selector at the top to start
              managing teacher details.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          onAdd={() => {
            setOpenAddTeacherDialog(true);
          }}
          onBulkImport={() => {
            setOpenImportDialog(true);
          }}
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
              handleUpdateTeacher(data);
            }}
            onDelete={handleDeleteTeacher}
          />
        )}

        {activeView === "grid" && (
          <div className={styles.gridContainer}>
            {teachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                id={teacher.id}
                name={teacher.name}
                maxPerDay={teacher.max_classes_day}
                maxPerWeek={teacher.max_classes_week}
                consecutive={teacher.max}
                onEdit={() => {
                  setSelectedTeacher(teacher);
                  setOpenUpdateTeacherDialog(true);
                }}
                onDelete={handleDeleteTeacher}
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
          onSubmit={handleCreateTeacher}
        />

        {/* Update Teacher */}
        <TeacherDialog
          open={openUpdateTeacherDialog}
          teacher={selectedTeacher}
          onClose={() => {
            setOpenUpdateTeacherDialog(false);
          }}
          onSubmit={handleUpdateTeacher}
        />

        {/* Import Teacher Details */}
        <ImportDialog
          open={openImportDialog}
          title={"Import Teachers"}
          description={"Add all teachers that need to be scheduled."}
          onClose={() => {
            setOpenImportDialog(false);
          }}
          onSelectCSV={() => {}}
          onSelectText={() => {}}
          onSelectTimetable={() => {}}
        />
      </div>
    </div>
  );
};

export default Teachers;
