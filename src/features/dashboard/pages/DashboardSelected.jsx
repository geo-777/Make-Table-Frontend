import "../../../styles/appLayout.css";
import styles from "../styles/DashboardSelected.module.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { Play, Zap } from "lucide-react";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import useClasses from "../../../features/classes/hooks/useClasses";
import DetailsGridTimetable from "../components/detailsGrid/DetailsGridTimetable";
import useTeachers from "../../../features/teachers/hooks/useTeachers";
import useSubjects from "../../../features/subjects/hooks/useSubjects";
import { useCallback, useEffect, useState } from "react";
import Dropdown from "../components/dropDown/Dropdown";
import Table from "../components/timeTables/Table";
import { generate_POST } from "../../../api/generations.api";
import { toast } from "react-toastify";
import { useTimetableEntry } from "../hooks/useTimetableEntry";

const Header = ({
  name,
  days,
  slots,
  classes,
  viewStatus,
  isGenerating,
  onGenerate,
  onForce,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.meta}>
          <span
            className={`${styles.badge} ${isGenerating ? styles.violet : ""}`}
          >
            <span className={styles.dot} />
            {viewStatus}
          </span>
          <span className={styles.metaText}>
            {days} days · {slots} slots/day · {classes} classes
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.btnPrimary}
          onClick={onGenerate}
          disabled={isGenerating}
        >
          <Play size={16} />
          {isGenerating ? "Generating..." : "Generate"}
        </button>

        <button
          className={styles.btnOutline}
          disabled={isGenerating}
          onClick={onForce}
        >
          <Zap size={16} />
          Force
        </button>
      </div>
    </div>
  );
};

const TABS = [
  { id: "class", label: "Class Timetables" },
  { id: "teacher", label: "Teacher Timetables" },
];

function Tabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState("class");

  const handleSelect = (id) => {
    setActiveTab(id);
    onTabChange?.(id);
  };

  return (
    <div
      className={styles.tabList}
      role="tablist"
      aria-orientation="horizontal"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-trigger-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`tab-content-${tab.id}`}
            data-state={isActive ? "active" : "inactive"}
            tabIndex={isActive ? 0 : -1}
            className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
            onClick={() => handleSelect(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default function DashboardSelected() {
  const { selectedTimetableData } = useTimeTableSelect();

  const { data: classes } = useClasses();
  const { data: teachers } = useTeachers();
  const { data: subjects } = useSubjects();

  const {
    classTimetables,
    teacherTimetables,
    loading,
    fetchClassTimetable,
    fetchTeacherTimetable,
    clearClassTimetables,
    clearTeacherTimetables,
  } = useTimetableEntry();

  const [activeTab, setActiveTab] = useState("class");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const firstClass = classes?.data?.[0];
    if (firstClass && !selectedClass) {
      setSelectedClass(firstClass);
      fetchClassTimetable(firstClass.id);
    }
  }, [classes, fetchClassTimetable, selectedClass]);

  useEffect(() => {
    const firstTeacher = teachers?.data?.[0];
    if (firstTeacher && !selectedTeacher) {
      setSelectedTeacher(firstTeacher);
    }
  }, [teachers, selectedTeacher]);

  const handleClassChange = useCallback(
    (className) => {
      const found = classes?.data?.find((c) => c.class_name === className);
      if (!found) return;
      setSelectedClass(found);
      clearClassTimetables();
      fetchClassTimetable(found.id);
    },
    [classes, fetchClassTimetable, clearClassTimetables],
  );

  const handleTeacherChange = useCallback(
    (teacherName) => {
      const found = teachers?.data?.find((t) => t.name === teacherName);
      if (!found) return;
      setSelectedTeacher(found);
      clearTeacherTimetables();
      fetchTeacherTimetable(found.id);
    },
    [teachers, fetchTeacherTimetable, clearTeacherTimetables],
  );

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      if (
        tab === "teacher" &&
        selectedTeacher &&
        teacherTimetables.length === 0
      ) {
        fetchTeacherTimetable(selectedTeacher.id);
      }
      if (tab === "class" && selectedClass && classTimetables.length === 0) {
        fetchClassTimetable(selectedClass.id);
      }
    },
    [
      selectedTeacher,
      selectedClass,
      classTimetables,
      teacherTimetables,
      fetchClassTimetable,
      fetchTeacherTimetable,
    ],
  );

  const handleTimetableGeneration = useCallback(
    async (force = false) => {
      if (!selectedTimetableData) return;
      try {
        setIsGenerating(true);
        const result = await generate_POST(selectedTimetableData.id, force);

        if (result?.data?.status === "Failed") {
          toast.error("Timetable Failed to generate.");
        } else if (result?.data?.status === "Active") {
          toast.success("Timetable was created successfully.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Timetable Failed to generate.");
      } finally {
        setIsGenerating(false);
      }
    },
    [selectedTimetableData],
  );

  const classEntries = classTimetables.flatMap((tt) => tt.entries);
  const teacherEntries = teacherTimetables.flatMap((tt) => tt.entries);

  return (
    <div className="App">
      <Topbar page={"Dashboard"} />
      <div className="mainPlaceholder">
        <Header
          name={selectedTimetableData?.name || "Unknown"}
          days={selectedTimetableData?.days.length ?? 0}
          slots={selectedTimetableData?.slots ?? 0}
          classes={classes?.data?.length ?? 0}
          viewStatus={selectedTimetableData?.view_status}
          isGenerating={isGenerating}
          onGenerate={() => handleTimetableGeneration(false)}
          onForce={() => handleTimetableGeneration(true)}
        />

        <DetailsGridTimetable
          teachers={teachers?.data?.length}
          subjects={subjects?.data?.length}
          classes={classes?.data?.length}
        />

        <div className={styles.body}>
          <div className={styles.left}>
            <Tabs onTabChange={handleTabChange} />

            {activeTab === "class" && (
              <>
                <Dropdown
                  options={classes?.data?.map((c) => c.class_name) ?? []}
                  defaultValue={classes?.data?.[0]?.class_name ?? ""}
                  placeholder="Select a class"
                  onChange={handleClassChange}
                />

                <Table
                  entries={classEntries}
                  slotCount={selectedTimetableData?.slots ?? 0}
                  days={selectedTimetableData?.days ?? []}
                  mode="class"
                  isLoading={loading.class}
                />
              </>
            )}

            {activeTab === "teacher" && (
              <>
                <Dropdown
                  options={teachers?.data?.map((t) => t.name) ?? []}
                  defaultValue={teachers?.data?.[0]?.name ?? ""}
                  placeholder="Select a Teacher"
                  onChange={handleTeacherChange}
                />

                <Table
                  entries={teacherEntries}
                  slotCount={selectedTimetableData?.slots ?? 0}
                  days={selectedTimetableData?.days ?? []}
                  mode="teacher"
                  isLoading={loading.teacher}
                />
              </>
            )}
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </div>
  );
}