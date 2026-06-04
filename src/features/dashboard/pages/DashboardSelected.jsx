import "../../../styles/appLayout.css";
import styles from "../styles/DashboardSelected.module.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { Play, Zap, Link2, CheckIcon } from "lucide-react";
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
import ViolationsPanel from "../components/violationsPanel/ViolationsPanel";

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
    <div className={`${styles.wrapper} stagger-children`}>
      <div className={styles.info}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.meta}>
          <span
            className={`${styles.badge} ${isGenerating ? styles.violet : viewStatus === "Public" ? styles.green : ""}`}
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
      className={`${styles.tabList} stagger-children`}
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

function groupEntriesByDay(entries) {
  return entries.reduce((acc, entry) => {
    const day = entry.day;
    if (!acc[day]) acc[day] = [];
    acc[day].push(entry);
    return acc;
  }, {});
}

export default function DashboardSelected() {
  const { selectedTimetableData } = useTimeTableSelect();

  const { data: classes } = useClasses();
  const { data: teachers } = useTeachers();
  const { data: subjects } = useSubjects();

  const {
    classTimetables,
    teacherTimetables,
    violations,
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

  const [isLinkCopied, setIsLinkCopied] = useState(false);

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

  const classEntries = groupEntriesByDay(
    Array.isArray(classTimetables) ? classTimetables : [],
  );

  const teacherEntries = groupEntriesByDay(
    Array.isArray(teacherTimetables) ? teacherTimetables : [],
  );

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
          toast.error("Timetable failed to generate.");
        } else if (result?.data?.status === "Active") {
          toast.success("Timetable created successfully.");
          if (activeTab === "class" && selectedClass) {
            clearClassTimetables();
            fetchClassTimetable(selectedClass.id);
          } else if (activeTab === "teacher" && selectedTeacher) {
            clearTeacherTimetables();
            fetchTeacherTimetable(selectedTeacher.id);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Timetable failed to generate.");
      } finally {
        setIsGenerating(false);
      }
    },
    [
      selectedTimetableData,
      activeTab,
      selectedClass,
      selectedTeacher,
      fetchClassTimetable,
      fetchTeacherTimetable,
      clearClassTimetables,
      clearTeacherTimetables,
    ],
  );

  const handleCopyLink = async (activeTab) => {
    try {
      const base = `${window.location.origin}`;
      const selected =
        activeTab === "class" ? selectedClass.id : selectedTeacher.id;

      // output format
      // #1 -> http://localhost:5173/timetable/class/1
      // #2 -> http://localhost:5173/timetable/teacher/1
      await navigator.clipboard.writeText(
        `${base}/timetable/${activeTab}/${selected}`,
      );
      toast.success("Link copied successfully.");
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link.");
    }
  };

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
                <div className={styles.row}>
                  <Dropdown
                    options={
                      classes?.data
                        ?.filter((c) => !c.isLab)
                        .map((c) => c.class_name) ?? []
                    }
                    defaultValue={classes?.data?.[0]?.class_name ?? ""}
                    placeholder="Select a class"
                    onChange={handleClassChange}
                  />

                  {selectedTimetableData && selectedTimetableData.view_status === "Public" && (
                    <button
                      className={styles.copyLink}
                      title="Copy Link"
                      onClick={() => handleCopyLink("class")}
                    >
                      {isLinkCopied ? <CheckIcon /> : <Link2 />}
                      {isLinkCopied ? "Copied" : "Copy Link"}
                    </button>
                  )}
                </div>

                {selectedClass &&
                  classEntries &&
                  Object.keys(classEntries).length > 0 && (
                    <Table
                      entries={classEntries}
                      slotCount={selectedTimetableData?.slots ?? 0}
                      days={selectedTimetableData?.days ?? []}
                      mode="class"
                      isLoading={loading.class}
                    />
                  )}

                {Object.keys(classEntries).length === 0 && (
                  <div className={styles.emptyState}>
                    <p>
                      No generated timetable yet. Click Generate to create one.
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === "teacher" && (
              <>
                <div className={styles.row}>
                  <Dropdown
                    options={teachers?.data?.map((t) => t.name) ?? []}
                    defaultValue={teachers?.data?.[0]?.name ?? ""}
                    placeholder="Select a Teacher"
                    onChange={handleTeacherChange}
                  />

                  {selectedTimetableData && selectedTimetableData.view_status === "Public" && (
                    <button
                      className={styles.copyLink}
                      title="Copy Link"
                      onClick={() => handleCopyLink("teacher")}
                    >
                      {isLinkCopied ? <CheckIcon /> : <Link2 />}
                      {isLinkCopied ? "Copied" : "Copy Link"}
                    </button>
                  )}
                </div>

                {selectedTeacher &&
                  teacherEntries &&
                  Object.keys(teacherEntries).length > 0 && (
                    <Table
                      entries={teacherEntries}
                      slotCount={selectedTimetableData?.slots ?? 0}
                      days={selectedTimetableData?.days ?? []}
                      mode="teacher"
                      isLoading={loading.teacher}
                    />
                  )}

                {Object.keys(teacherEntries).length === 0 && (
                  <div className={styles.emptyState}>
                    <p>
                      No generated timetable yet. Click Generate to create one.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.right}>
            <ViolationsPanel violations={violations} />
          </div>
        </div>
      </div>
    </div>
  );
}
