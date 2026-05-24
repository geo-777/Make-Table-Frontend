import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import ListView from "../../../shared/components/itemView/listView/listView";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { useState } from "react";

const Subjects = () => {

  const { selectedTimetableData } = useTimeTableSelect();
  const [activeView, setActiveView] = useState("grid");
  const mockData = [
    [
      { heading: "Name",     value: "Mathematics" },
      { heading: "Type",     value: true,          trueLabel: "Lab", falseLabel: "Theory" },
      { heading: "Hardness", value: "8/10"        },
      { heading: "Daily",    value: "0-2"         },
      { heading: "Weekly",   value: "4-6"         },
      { heading: "Consec.",  value: 2             },
    ],
  ];

  return (
    <div className="App">
      <div className="mainPlaceholder">
        <Topbar page={"Subjects"} />

        <PageHeader
          title={"Subjects"}
          description={
            selectedTimetableData?.name
              ? `Define subject constraints for ${selectedTimetableData.name}`
              : "Select a timetable to define subject constraints."
          }
          addButtonText={"Add Subject"}
          activeView={activeView}
          onChangeActiveView={(view) => setActiveView(view)}
          onAdd={() => {}}
          onBulkImport={() => {}}
        />

        {
          activeView == "list" &&
          <ListView
            data={mockData}
            onEdit={(rowIndex, updatedRow) => console.log(rowIndex, updatedRow)}
            onDelete={(rowIndex) => console.log("delete", rowIndex)}
          />
        }
      </div>
    </div>
  );
};

export default Subjects;
