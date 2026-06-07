import styles from "../styles/assignments.module.css";
import ListView from "../components/listView/ListView";
import Topbar from "../../../shared/components/topbar/Topbar";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import { useState } from "react";
import { useAssignmentsView } from "../../../shared/zustand/listingsViewStore";
import AssignCard from "../components/assignCard/AssignCard";
import AssignPopup from "../components/assignPopup/AssignPopup";
import useAssignments from "../hooks/useAssignments";
import "../../../styles/appLayout.css";

import ImportDialog from "../../../shared/components/importDialog/ImportDialog";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
import GridSkelton from "../../../shared/components/skeltonLoading/GridSkelton";
import ListSkeleton from "../../../shared/components/skeltonLoading/ListSkeleton";

const Assignments = () => {
  const { selectedTimetableData } = useTimeTableSelect();
  const { activeView, setActiveView } = useAssignmentsView();
  // dialog controls
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogData, setEditDialogData] = useState(null);
  //edit dialog helpers
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditDialogData(null);
  };

  const openEditDialog = (data) => {
    setEditDialogData(data);
    setEditDialogOpen(true);
  };

  //query data from hook
  const { data, isPending, isSuccess, isError, deleteListing } =
    useAssignments();
  const assignData = data?.data ?? [];

  if (!selectedTimetableData) {
    return (
      <>
        <Topbar page={"Assignments"} />
        <div className={"inactiveState"}>
          <h4>No timetable selected yet</h4>
          <p>Select a timetable from the workspace selector above.</p>
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <Topbar page={"Assignments"} />
      <div className="mainPlaceholder">

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
          onBulkImport={() => {
            setOpenImportDialog(true);
          }}
        />
        <div className="main">
          {/* list view */}
          {activeView === "list" && (
            <>
              {isPending && (
                <ListSkeleton />
              )}

              {isSuccess && (
                <ListView
                  data={assignData}
                  deleteFn={(id) => deleteListing.mutateAsync(id)}
                  editFn={(data) => openEditDialog(data)}
                />
              )}
            </>
          )}

          {/* grid view*/}
          {activeView === "grid" && (
            <>
              {isPending && (
                <GridSkelton count={12} height={130} columns={5} gap={18} />
              )}

              {isSuccess &&
                (assignData?.length > 0 ? (
                  <div
                    className={`${styles.gridContainer} stagger-children fast grid-fast-stagger`}
                  >
                    {assignData.map((e) => (
                      <AssignCard
                        key={e.id}
                        data={e}
                        deleteFn={(id) => deleteListing.mutateAsync(id)}
                        editFn={(data) => openEditDialog(data)}
                      />
                    ))}
                  </div>
                ) : (
                  <StatusWrapper isError>
                    <div className={styles.error404}>
                      <h4>No assignments created yet</h4>
                      <p>
                        Start by creating your first class to organize your
                        schedule.
                      </p>
                    </div>
                  </StatusWrapper>
                ))}
            </>
          )}
        </div>

        {/* create popup */}
        <AssignPopup
          visible={createDialogOpen}
          closePopup={() => setCreateDialogOpen(false)}
        />

        {/* edit popup*/}
        <AssignPopup
          visible={editDialogOpen}
          existingData={editDialogData}
          closePopup={closeEditDialog}
        />

        {/* Import Assignment Details */}
        <ImportDialog
          open={openImportDialog}
          title={"Import Assignments"}
          description={"Add all assignments that need to be scheduled."}
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

export default Assignments;
