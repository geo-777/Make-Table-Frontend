import "../../../styles/appLayout.css";
import styles from "../styles/Teachers.module.css";

import { useMemo, useState } from "react";
import Topbar from "../../../shared/components/topbar/Topbar";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import TeacherDialog from "../components/teacherDialog/TeacherDialog";
import TeacherCard from "../components/teacherCard/TeacherCard";
import ImportDialog from "../../../shared/components/importDialog/ImportDialog";
import TeacherList from "../components/teacherList/TeacherList";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import useTeachers from "../hooks/useTeachers";
import { useTeachersView } from "../../../shared/zustand/listingsViewStore";
import ListSkeleton from "../../../shared/components/skeltonLoading/ListSkeleton";
import GridSkelton from "../../../shared/components/skeltonLoading/GridSkelton";

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

const Teachers = () => {
  const { selectedTimetableData } = useTimeTableSelect();
  const { activeView, setActiveView } = useTeachersView();

  const {
    data,
    isPending,
    isError,
    error,
    isSuccess,
    createTeacher,
    deleteTeacher,
    updateTeacher,
  } = useTeachers();

  const [openAddTeacherDialog, setOpenAddTeacherDialog] = useState(false);
  const [openUpdateTeacherDialog, setOpenUpdateTeacherDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teachers = useMemo(() => data?.data ?? [], [data]);

  const handleDeleteTeacher = async (id) => {
    if (!selectedTimetableData?.id) return;

    await deleteTeacher.mutateAsync(id);
  };

  const handleCreateTeacher = async (data) => {
    if (!selectedTimetableData?.id) return;

    await createTeacher.mutateAsync({
      id: selectedTimetableData.id,
      data,
    });
    setOpenAddTeacherDialog(false);
  };

  const handleUpdateTeacher = async (data) => {
    if (!selectedTimetableData?.id) return;
    const { id, ...payload } = data;

    await updateTeacher.mutateAsync({
      id,
      data: payload,
    });
    setOpenUpdateTeacherDialog(false);
  };

  if (!selectedTimetableData) {
    return (
      <>
        <Topbar page={"Teachers"} />
        <div className={"inactiveState"}>
          <h4>No timetable selected yet</h4>
          <p>Select a timetable from the workspace selector above.</p>
        </div>
      </>
    );
  }
  return (
    <div className="App">
      <Topbar page={"Teachers"} />
      <div className="mainPlaceholder">
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

        <div className="main">
          {!teachers.length && isSuccess && (
            <div className={styles.inactiveState}>
              <h4>No Teachers defined.</h4>
              <p>
                Add your first teacher to start defining constraints for this
                timetable.
              </p>
            </div>
          )}

          {activeView === "list" && (
            <>
              {isPending && <ListSkeleton />}

              {!!teachers.length && isSuccess && (
                <TeacherList
                  teachers={teachers}
                  onEdit={handleUpdateTeacher}
                  onDelete={handleDeleteTeacher}
                />
              )}
            </>
          )}

          {activeView === "grid" && (
            <>
              {isPending && (
                <GridSkelton count={12} height={200} columns={4} gap={18} />
              )}

              {isSuccess && (
                <div
                  className={`stagger-children fast grid-fast-stagger ${styles.gridContainer}`}
                >
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
            </>
          )}

          {isError && <StatusWrapper isError={true} error={error} />}

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
    </div>
  );
};

export default Teachers;
