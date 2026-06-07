import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import { useClassesView } from "../../../shared/zustand/listingsViewStore";
import GridView from "../components/views/GridView";
import ListView from "../components/views/ListView";
import { useState } from "react";
import ClassPopup from "../components/popups/ClassPopup";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import useClasses from "../hooks/useClasses";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import ImportDialog from "../../../shared/components/importDialog/ImportDialog";
const Classes = () => {
  const [isCreateClassOpen, setCreateClassOpen] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);

  const { activeView, setActiveView } = useClassesView();

  const { selectedTimetableData } = useTimeTableSelect();

  const { data: listings, isLoading, isError, error } = useClasses();

  if (!selectedTimetableData) {
    return (
      <>
        <Topbar page={"Classes"} />
        <div className="inactiveState">
          <h4>No timetable selected yet</h4>
          <p>Select a timetable from the workspace selector above.</p>
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <ClassPopup
        closePopup={() => setCreateClassOpen(false)}
        visible={isCreateClassOpen}
      />
      {/* Import Teacher Details */}
      <ImportDialog
        open={openImportDialog}
        title={"Import classes"}
        description={"Add all classes that need to be scheduled."}
        onClose={() => {
          setOpenImportDialog(false);
        }}
        onSelectCSV={() => {}}
        onSelectText={() => {}}
        onSelectTimetable={() => {}}
      />
      <div className="mainPlaceholder">
        <Topbar page={"Classes"} />

        <PageHeader
          title={"Classes"}
          description={
            selectedTimetableData?.name
              ? `Define class entities for ${selectedTimetableData.name}`
              : "Select a timetable to define class entities."
          }
          addButtonText={"Add Class"}
          activeView={activeView}
          onChangeActiveView={setActiveView}
          onAdd={() => {
            setCreateClassOpen(true);
          }}
          onBulkImport={() => {
            setOpenImportDialog(true);
          }}
        />

        <div className={`main `}>
          {activeView === "list" && (
            <ListView data={listings?.data || []} isLoading={isLoading} />
          )}
          {activeView === "grid" && (
            <GridView data={listings?.data || []} isLoading={isLoading} />
          )}
          {isError && <StatusWrapper isError={true} error={error} />}
        </div>
      </div>
    </div>
  );
};

export default Classes;
