import { useState } from "react";
import ImportDialog from "../../../shared/components/importDialog/ImportDialog";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import Topbar from "../../../shared/components/topbar/Topbar";
import { useSubjectsView } from "../../../shared/zustand/listingsViewStore";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import "../../../styles/appLayout.css";

/*
  {
    name: string,
    hardness: "Low" | "Med" | "High",
    isLab: boolean,
    min_classes_day: number,
    max_classes_day: number,
    min_classes_week: number,
    max_classes_week: number,
    min_classes_consecutive: number,
    max_classes_consecutive: number,
    lab_classes: number[],
  }
*/

const MOCK_SUBJECTS = [
  {
    name: "English",
    hardness: "Low",
    isLab: false,
    min_classes_day: 0,
    max_classes_day: 1,
    min_classes_week: 9,
    max_classes_week: 12,
    min_classes_consecutive: 1,
    max_classes_consecutive: 2,
    lab_classes: [
      {
        id: 0,
        class_name: "CSE 29",
        room_name: "101 Annex",
        isLab: false,
        created_at: "2026-05-28T10:06:14.224Z",
      },
    ],
  },
];

export default function Subjects() {

  const { selectedTimetableData } = useTimeTableSelect();
  const { activeView, setActiveView } = useSubjectsView();
  
  const [openImportDialog, setOpenImportDialog] = useState(false);

  return (
    <div className="App">
      <Topbar page={"Subjects"}/>
      <div className="mainPlaceholder">

        <PageHeader
          title={"Subjects"}
          description={
            selectedTimetableData?.name 
              ? `Define subject constraints for ${selectedTimetableData.name}`
              : "Select a timetable to define subject constraints." 
          }
          addButtonText={"Add Subject"}
          activeView={activeView}
          onChangeActiveView={setActiveView}
          onAdd={() => {}}
          onBulkImport={() => {}}
        />

        {/* Import Subject Details */}
        <ImportDialog
          open={openImportDialog}
          title={"Import Subjects"}
          description={"Add all subject that need to be scheduled"}
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
}