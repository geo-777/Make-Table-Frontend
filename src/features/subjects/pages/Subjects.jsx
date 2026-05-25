import "../../../styles/appLayout.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import ListView from "../../../shared/components/itemView/listView/listView";
import ItemCard from "../../../shared/components/itemView/itemCard/ItemCard";
import SubjectDialog from "../components/dialog/SubjectDialog";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { useMemo, useState } from "react";
import styles from "../styles/Subjects.module.css";
import useSubjects from "../hooks/useSubjects";
import Loader from "../../../shared/components/loader/Loader";
import { AlertTriangle } from "lucide-react";

/*
  Expected Input

  {
    name: string,
    hardness: number (btw 1 - 3) --> more flexible approach
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
    min_classes_consecutive: number, --> not neccessarily needed. (for now lets pass in a value of 1 )
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
    render: (value) => `${value}/3`,
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

const HARDNESS_LABEL_TO_NUMBER = { Low: 1, Med: 2, High: 3 };

const normalizeSubject = (subject) => ({
  id: subject.id,
  name: subject.name,
  type: subject.isLab ? "lab" : "theory",
  hardness: HARDNESS_LABEL_TO_NUMBER[subject.hardness] ?? subject.hardness,
  daily: [subject.min_classes_day, subject.max_classes_day],
  weekly: [subject.min_classes_week, subject.max_classes_week],
  consecutive: subject.max_classes_consecutive,
});

const transformPayload = (values) => {
  const payload = {
    name: values.name,
    type: values.isLab ? "lab" : "theory",
    hardness: Number(values.hardness),
    daily: [Number(values.minPerDay), Number(values.maxPerDay)],
    weekly: [Number(values.minPerWeek), Number(values.maxPerWeek)],
    consecutive: Number(values.maxConsecutive),
  };

  if (values.id !== undefined) {
    payload.id = values.id;
  }

  return payload;
};

export default function Subjects() {
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
    return (data?.data ?? []).map(normalizeSubject);
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

  if (isLoading) {
    return (
      <div className="App">
        <div className="mainPlaceholder">
          <Topbar page={"Subjects"} />

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
        <div className="mainPlaceholder">
          <Topbar page={"Subjects"} />

          <div className={styles.inactiveState}>
            <div className={styles.largeIcon}>
              <AlertTriangle size={24} />
            </div>
            <h4>Something went wrong.</h4>
            <p>
              We couldn't load your subjects. Check your connection and try
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
        <div className="mainPlaceholder">
          <Topbar page={"Subjects"} />

          <div className={styles.inactiveState}>
            <h4>No timetable selected.</h4>
            <p>
              Pick a timetable from the workspace selector at the top to start
              managing its subjects.
            </p>
          </div>
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
          <div className={styles.inactiveState}>
            <h4>No subjects yet.</h4>
            <p>
              Add your first subject to start defining constraints for this
              timetable.
            </p>
          </div>
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
                      {subject.hardness}/3 hardness
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
