import { useState } from "react";
import ImportDialog from "../../../shared/components/importDialog/ImportDialog";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import Topbar from "../../../shared/components/topbar/Topbar";
import { useSubjectsView } from "../../../shared/zustand/listingsViewStore";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import "../../../styles/appLayout.css";
import SubjectList from "../components/subjectList/SubjectList";
import SubjectDialog from "../components/dialog/SubjectDialog";

/*
  {
    id: number,
    name: string,
    created_at: "2026-05-28T10:43:09.890Z",
    isLab: boolean,
    hardness: "Low" | "Med" | "High",
    min_classes_day: number,
    max_classes_day: number,
    min_classes_week: number,
    max_classes_week: number,
    min_classes_consecutive: number,
    max_classes_consecutive: number,
    lab_classes: [
      {
        id: number,
        class_name: string,
        room_name: string,
        isLab: true,
        created_at: "2026-05-28T10:43:09.891Z"
      }
    ]
  }
*/

// All classes are classes declared in classes page.
const ALL_CLASSES = [
  { id: 0, class_name: "CSE 29", room_name: "101 Annex", isLab: false },
  { id: 1, class_name: "CSE 31", room_name: "Lab B2", isLab: true },
  { id: 2, class_name: "PHY Lab 1", room_name: "Science Block", isLab: true },
  { id: 3, class_name: "ENG Seminar", room_name: "Room 204", isLab: false },
  { id: 4, class_name: "MAT Tutorial", room_name: "Room 108", isLab: false },
];

const MOCK_SUBJECTS = [
  {
    id: 1,
    name: "English",
    hardness: "Low",
    isLab: true,
    min_classes_day: 0,
    max_classes_day: 1,
    min_classes_week: 9,
    max_classes_week: 12,
    min_classes_consecutive: 1,
    max_classes_consecutive: 2,
    lab_classes: [{ ...ALL_CLASSES[0] }, {...ALL_CLASSES[1]}],
  },
  {
    id: 2,
    name: "Physics",
    hardness: "High",
    isLab: true,
    min_classes_day: 0,
    max_classes_day: 2,
    min_classes_week: 3,
    max_classes_week: 5,
    min_classes_consecutive: 1,
    max_classes_consecutive: 2,
    lab_classes: [{ ...ALL_CLASSES[2] }],
  },
  {
    id: 3,
    name: "CS101",
    hardness: "Medium",
    isLab: true,
    min_classes_day: 0,
    max_classes_day: 1,
    min_classes_week: 2,
    max_classes_week: 3,
    min_classes_consecutive: 1,
    max_classes_consecutive: 2,
    lab_classes: [{ ...ALL_CLASSES[1] }],
  },
  {
    id: 4,
    name: "Mathematics",
    hardness: "High",
    isLab: false,
    min_classes_day: 0,
    max_classes_day: 2,
    min_classes_week: 4,
    max_classes_week: 6,
    min_classes_consecutive: 1,
    max_classes_consecutive: 2,
    lab_classes: [],
  },
];

export default function Subjects() {

  const { selectedTimetableData } = useTimeTableSelect();
  const { activeView, setActiveView } = useSubjectsView();
  
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);

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
          onAdd={() => { setOpenSubjectDialog(true) }}
          onBulkImport={() => setOpenImportDialog(true)}
        />

        {activeView == "list" &&
          <SubjectList 
            subjects={MOCK_SUBJECTS}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        }

        <SubjectDialog
          open={openSubjectDialog}
          onClose={() => setOpenSubjectDialog(false)}
          onCreate={() => {}}
          onUpdate={() => {}}
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