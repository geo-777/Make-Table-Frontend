import { useMemo, useState } from "react";
import ImportDialog from "../../../shared/components/importDialog/ImportDialog";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import Topbar from "../../../shared/components/topbar/Topbar";
import { useSubjectsView } from "../../../shared/zustand/listingsViewStore";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import "../../../styles/appLayout.css";
import SubjectList from "../components/subjectList/SubjectList";
import SubjectDialog from "../components/dialog/SubjectDialog";
import useSubjects from "../hooks/useSubjects";
import styles from "../styles/Subjects.module.css";
import Loader from "../../../shared/components/loader/Loader";
import { AlertTriangle } from "lucide-react";

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

export default function Subjects() {

  const { selectedTimetableData } = useTimeTableSelect();
  const { activeView, setActiveView } = useSubjectsView();

  const {
    data,
    isLoading,
    isError,

    createSubject,
    deleteSubject,
    updateSubject,
  } = useSubjects();

  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [openAddSubjectDialog, setOpenAddSubjectDialog] = useState(false);
  const [openUpdateSubjectDialog, setOpenUpdateSubjectDialog] = useState(false);

  const subjects = useMemo(() => (data?.data ?? []), [data]);
  

  const handleDeleteSubject = async (data) => {
    if(!selectedTimetableData?.id) return;

    console.log(data);
    await deleteSubject.mutateAsync({
      id: selectedTimetableData.id,
      data
    });
  }

  const handleUpdateSubject = async (data) => {
    if(!selectedTimetableData?.id) return;

    console.log(data);
    const {id, ...payload} = data;
    await updateSubject.mutateAsync({
      id,
      data: payload,
    });
  }

  const handleCreateSubject = async (data) => {
    if (!selectedTimetableData?.id) return;

    if(data.lab_classes.length === null) data["lab_classes"] = null;
    
    const payload = {
      name: data.name,
      min_classes_day: data.min_classes_day,
      max_classes_day: data.max_classes_day,
      min_classes_week: data.min_classes_week,
      max_classes_week: data.max_classes_week,
      min_classes_consecutive: data.min_classes_consecutive,
      max_classes_consecutive: data.max_classes_consecutive,
      isLab: data.isLab,
      lab_classes: data.isLab.length > 0 ? data.isLab : null,
      hardness: data.hardness,
    };

    console.log(payload);
    await createSubject.mutateAsync({
      id: selectedTimetableData.id,
      payload,
    });
  };

  if (isLoading) {
    return (
      <div className="App">
        <Topbar page={"Subjects"} />
        <div className="mainPlaceholder">
          <div className={styles.inactiveState}>
            <Loader />
            <p>Fetching subjects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="App">
        <Topbar page={"Subjects"} />
        <div className="mainPlaceholder">
          <div className={styles.inactiveState}>
            <div className={styles.largeIcon}>
              <AlertTriangle size={24} />
            </div>
            <h4>Something went wrong.</h4>
            <p>
              We couldn't load subject details. Check your connection and try
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
        <Topbar page={"Subjects"} />
        <div className="mainPlaceholder">
          <div className={styles.inactiveState}>
            <h4>No timetable selected.</h4>
            <p>
              Pick a timetable from the workspace selector at the top to start
              managing subject details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Topbar page={"Subjects"} />
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
          onAdd={() => {
            setOpenAddSubjectDialog(true);
          }}
          onBulkImport={() => setOpenImportDialog(true)}
        />

        {!subjects.length && (
          <div className={styles.inactiveState}>
            <h4>No Subjects defined.</h4>
            <p>
              Add your first subject to start defining constraints for this
              timetable.
            </p>
          </div>
        )}

        {!!subjects.length && activeView == "list" && (
          <SubjectList
            subjects={subjects}
            onEdit={handleUpdateSubject}
            onDelete={handleDeleteSubject}
          />
        )}

        {/* Add Subject */}
        <SubjectDialog
          open={openAddSubjectDialog}
          onClose={() => setOpenAddSubjectDialog(false)}
          onCreate={handleCreateSubject}
        />

        {/* Update Subject */}
        <SubjectDialog
          open={openUpdateSubjectDialog}
          onClose={() => setOpenUpdateSubjectDialog(false)}
          initialData={subjects}
          onUpdate={handleUpdateSubject}
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