import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import ListView from "../../../shared/components/itemView/listView/listView";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { useMemo, useState } from "react";
import ItemCard from "../../../shared/components/itemView/itemCard/ItemCard";
import styles from "../styles/Subjects.module.css";
import SubjectDialog from "../components/dialog/SubjectDialog";
import useSubjects from "../hooks/useSubjects";

/*
  Expected Input

  {
    id: number,                   --> i dont actually need the id (ig 😭)
    name: string,
    hardness: number (btw 1 - 10) --> more flexible approach
    isLab: boolean
    maxConsecutive: number,       --> i can change the name no issue
    maxPerday: number,            --> i can change the name no issue
    maxPerWeek: number,           --> i can change the name no issue
    minPerDay: number,            --> i can change the name no issue
    minPerWeek: number,           --> i can change the name no issue
  }

  Actual Input

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
  }
*/

const COLUMNS = [
  {
    key: "name",
    label: "Name",
    render: (value) => value,
  },
  {
    key: "type",
    label: "Type",
    type: "boolean",
    trueLabel: "Lab",
    falseLabel: "Theory",
    render: (value) => (value === "lab" ? "Lab" : "Theory"),
  },
  {
    key: "hardness",
    label: "Hardness",
    render: (value) => `${value}/10`,
  },
  {
    key: "daily",
    label: "Daily",
    render: (value) => value.join("-"),
  },
  {
    key: "weekly",
    label: "Weekly",
    render: (value) => value.join("-"),
  },
  {
    key: "consecutive",
    label: "Consec.",
    render: (value) => value,
  },
];

// --- Helpers ------------------------------------------------------------------
// TODO: remove helpers once backend is configured properly.
// i have to do this because vishy is busy and wont update the schema. 

const transformPayload = (values) => ({
  id: values.id,
  name: values.name,
  type: values.isLab ? "lab" : "theory",
  hardness: Number(values.hardness),
  daily: [Number(values.minPerDay), Number(values.maxPerDay)],
  weekly: [Number(values.minPerWeek), Number(values.maxPerWeek)],
  consecutive: Number(values.maxConsecutive),
});

export default function Subjects () {
  const { selectedTimetableData } = useTimeTableSelect();
  const timetableId = selectedTimetableData?.id;

  const {
    data,
    isLoading,
    isError,

    createSubject,
    deleteSubject,
    updateSubject,
  } = useSubjects();

  const [activeView, setActiveView] = useState("grid");
  const [openAddSubjectDialog, setOpenAddSubjectDialog] = useState(false);
  const [openEditSubjectDialog, setOpenEditSubjectDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const handleCreateSubject = async (values) => {
    if (!timetableId) return;

    const payload = transformPayload(values);

    await createSubject.mutateAsync({
      id: timetableId,
      data: payload,
    });

    setOpenAddSubjectDialog(false);
  };

  const handleUpdateSubject = async (values) => {
    if (!selectedSubject) return;

    const payload = transformPayload(values);

    await updateSubject.mutateAsync({
      id: selectedSubject.id,
      data: payload,
    });

    setOpenEditSubjectDialog(false);
    setSelectedSubject(null);
  };

  const handleDeleteSubject = async (subjectId) => {
    await deleteSubject.mutateAsync(subjectId);
  };

  const handleOpenEditDialog = (subject) => {
    setSelectedSubject(subject);

    setOpenEditSubjectDialog(true);
  };

  // this is a placeholder
  if (isLoading) {
    return (
      <div className="App">
        <div className="mainPlaceholder">
          <Topbar page={"Subjects"} />

          <div className={styles.stateMessage}>Loading subjects...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="App">
        <div className="mainPlaceholder">
          <Topbar page={"Subjects"} />

          <div className={styles.stateMessage}>Failed to load subjects.</div>
        </div>
      </div>
    );
  }

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
          onChangeActiveView={setActiveView}
          onAdd={() => setOpenAddSubjectDialog(true)}
          onBulkImport={() => {}}
        />

        {!subjects.length && (
          <div className={styles.emptyState}>No subjects added yet.</div>
        )}

        {!!subjects.length && activeView === "list" && (
          <ListView
            data={subjects}
            columns={COLUMNS}
            onEdit={(_, rowData) => handleOpenEditDialog(rowData)}
            onDelete={(rowId) => handleDeleteSubject(rowId)}
          />
        )}

        {!!subjects.length && activeView === "grid" && (
          <div className={styles.gridView__Container}>
            {subjects.map((subject) => {
              const isLab = subject.type === "lab";

              return (
                <ItemCard
                  key={subject.id}
                  onEdit={() => handleOpenEditDialog(subject)}
                  onDelete={() => handleDeleteSubject(subject.id)}
                >
                  <div className={styles.card__Header}>
                    <h3 className={styles.card__Title}>{subject.name}</h3>
                  </div>

                  <div className={styles.card__Meta}>
                    <span
                      className={`
                          ${styles.card__Badge}
                          ${
                            isLab
                              ? styles.card__Badge__lab
                              : styles.card__Badge__theory
                          }
                        `}
                    >
                      {isLab ? "Lab" : "Theory"}
                    </span>

                    <span className={styles.card__Hardness}>
                      {subject.hardness}/10 hardness
                    </span>
                  </div>

                  <div className={styles.card__Stats}>
                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>
                        {subject.daily.join("-")}
                      </span>

                      <span className={styles.card__StatLabel}>Daily</span>
                    </div>

                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>
                        {subject.weekly.join("-")}
                      </span>

                      <span className={styles.card__StatLabel}>Weekly</span>
                    </div>

                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>
                        {subject.consecutive}
                      </span>

                      <span className={styles.card__StatLabel}>Consec.</span>
                    </div>
                  </div>
                </ItemCard>
              );
            })}
          </div>
        )}
      </div>

      <SubjectDialog
        open={openAddSubjectDialog}
        loading={createSubject.isPending}
        onClose={() => {
          setOpenAddSubjectDialog(false);
        }}
        onCreate={handleCreateSubject}
      />

      <SubjectDialog
        open={openEditSubjectDialog}
        loading={updateSubject.isPending}
        onClose={() => {
          setOpenEditSubjectDialog(false);
          setSelectedSubject(null);
        }}
        onUpdate={handleUpdateSubject}
        initialData={selectedSubject}
      />
    </div>
  );
}