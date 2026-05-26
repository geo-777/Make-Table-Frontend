import { useMemo, useState } from "react";
import ListView from "../../../shared/components/itemView/listView/listView";
import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import styles from "../styles/Teachers.module.css";

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

const MOCK_TEACHERS = {

};

const Teachers = () => {

  const { selectedTimetableData } = useTimeTableSelect();
  
  const [activeView, setActiveView] = useState("grid");
  const teachers = useMemo(() => (MOCK_TEACHERS), []);

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
          onAdd={() => {}}
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
            onEdit={(_, data) => {}}
            onDelete={(id) => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Teachers;
