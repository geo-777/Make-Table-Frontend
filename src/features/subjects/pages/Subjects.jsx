import "../../../styles/appLayout.css";
import styles from "../styles/Subjects.module.css";
import { useMemo, useState } from "react";
import createColor from "../../../shared/utils/hashColor";

import { AlertTriangle } from "lucide-react";
import ImportDialog from "../../../shared/components/importDialog/ImportDialog";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import Topbar from "../../../shared/components/topbar/Topbar";
import Loader from "../../../shared/components/loader/Loader";
import SubjectList from "../components/subjectList/SubjectList";
import SubjectDialog from "../components/dialog/SubjectDialog";

import { useSubjectsView } from "../../../shared/zustand/listingsViewStore";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import useSubjects from "../hooks/useSubjects";
import SubjectCard from "../components/subjectCard/SubjectCard";

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
    rgb_code: string,
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
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = useMemo(() => data?.data ?? [], [data]);

  const handleDeleteSubject = async (id) => {
    if (!selectedTimetableData?.id) return;

    await deleteSubject.mutateAsync(id);
  };

  const handleUpdateSubject = async (data) => {
    if (!selectedTimetableData?.id) return;

    const { id, ...payload } = data;
    await updateSubject.mutateAsync({
      id,
      data: payload,
    });
  };

  const handleCreateSubject = async (data) => {
    if (!selectedTimetableData?.id) return;

    const payload = {
      name: data.name,
      min_classes_day: data.min_classes_day,
      max_classes_day: data.max_classes_day,
      min_classes_week: data.min_classes_week,
      max_classes_week: data.max_classes_week,
      min_classes_consecutive: data.min_classes_consecutive,
      max_classes_consecutive: data.max_classes_consecutive,
      isLab: data.isLab,
      lab_classes: data.lab_classes?.length > 0 ? data.lab_classes : null,
      hardness: data.hardness,
      rgb_code: createColor(data.name),
    };

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

        {!!subjects.length && activeView === "list" && (
          <SubjectList
            subjects={subjects}
            onEdit={handleUpdateSubject}
            onDelete={handleDeleteSubject}
          />
        )}

        {!!subjects.length && activeView === "grid" && (
          <div
            className={`stagger-children fast grid-fast-stagger ${styles.gridContainer}`}
          >
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onEdit={() => {
                  setSelectedSubject(subject);
                  setOpenUpdateSubjectDialog(true);
                }}
                onDelete={handleDeleteSubject}
              />
            ))}
          </div>
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
          initialData={selectedSubject}
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
