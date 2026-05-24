import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { useState } from "react";

const Subjects = () => {

  const { selectedTimetableData } = useTimeTableSelect();
  const [activeView, setActiveView] = useState("grid");

  return (
    <div className="App">
      <div className="mainPlaceholder">
        <Topbar page={"Subjects"} />

        <PageHeader
          title={"Subjects"}
          description={
            selectedTimetableData?.name ? 
            `Define subject constraints for ${selectedTimetableData.name}` : 
            "Select a timetable to define subject constraints."}
          addButtonText={"Add Subject"}
          activeView={activeView}
          onChangeActiveView={(view) => setActiveView(view)}
          onAdd={() => {}}
          onBulkImport={() => {}}
        />


      </div>
    </div>
  );
};

export default Subjects;
