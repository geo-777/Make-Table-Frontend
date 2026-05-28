import styles from "../styles/assignments.module.css";
import ListView from "../../../shared/components/itemView/listView/listView";
import Topbar from "../../../shared/components/topbar/Topbar";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import { useState } from "react";
import { useAssignmentsView } from "../../../shared/zustand/listingsViewStore";
import AssignCard from "../components/assignCard/AssignCard";
import AssignPopup from "../components/assignPopup/AssignPopup";
import useAssignments from "../hooks/useAssignments";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
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
//todo : add loading state
const Assignments = () => {
  const { selectedTimetableData } = useTimeTableSelect();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { activeView, setActiveView } = useAssignmentsView();
  const { data, isPending, isSuccess, isError } = useAssignments();
  let assignData = data?.data ?? [];
  if (!selectedTimetableData) {
    return (
      <>
        <Topbar page={"Assignments"} />
        <div className={styles.inactiveState}>
          <h4>No timetable selected yet</h4>
          <p>Select a timetable from the workspace selector above.</p>
        </div>
      </>
    );
  }

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
        {isPending && <StatusWrapper loader={true} />}

        {!!assignData?.length && activeView === "list" && isSuccess && (
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

        {/* grid view*/}
        {activeView === "grid" &&
          isSuccess &&
          (assignData?.length > 0 ? (
            <div className={styles.gridContainer}>
              {assignData?.map((e) => <AssignCard key={e.id} data={e} />) ?? []}
            </div>
          ) : (
            <StatusWrapper isError={true}>
              <div className={styles.error404}>
                <h4>No assignments created yet</h4>
                <p>
                  Start by creating your first class to organize your schedule.
                </p>
              </div>
            </StatusWrapper>
          ))}

        {/* create popup */}
        <AssignPopup
          visible={createDialogOpen}
          closePopup={() => setCreateDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default Assignments;
