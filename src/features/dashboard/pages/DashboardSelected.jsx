import "../../../styles/appLayout.css";
import styles from "../styles/DashboardSelected.module.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { 
  // Link2,
  // Share2, 
  Play, 
  Zap 
} from "lucide-react";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import useClasses from "../../../features/classes/hooks/useClasses";
import DetailsGridTimetable from "../components/detailsGrid/DetailsGridTimetable";
import useTeachers from "../../../features/teachers/hooks/useTeachers";
import useSubjects from "../../../features/subjects/hooks/useSubjects";
import { useCallback, useState } from "react";
import Dropdown from "../components/dropDown/Dropdown";
import Table from "../components/timeTables/Table";
import { mockTimetable, mockClassEntries, mockTeacherEntries } from "../components/timeTables/MOCK_DATA";
import { generate_POST } from "../../../api/generations.api";
import { toast } from "react-toastify";

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
          <span className={`${styles.badge} ${isGenerating ? styles.violet : ""}`} >
            <span className={styles.dot} />
            {viewStatus}
          </span>
          <span className={styles.metaText}>
            {days} days · {slots} slots/day · {classes} classes
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        {/* <button className={styles.btnOutline}>
          <Link2 size={16} />
          Copy link
        </button>

        <button className={styles.btnOutline}>
          <Share2 size={16} />
          Share
        </button> */}

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
}

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

  const { data: classes  } = useClasses();
  const { data: teachers } = useTeachers();
  const { data: subjects } = useSubjects();

  const [activeTab, setActiveTab] = useState("class");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTimetableGeneration = useCallback(
    async (force = false) => {
    if(!selectedTimetableData);
    try {
      setIsGenerating(true);
      const result = await generate_POST(selectedTimetableData.id, force);

      if (result?.data?.status === "Failed") {
        toast.error("Timetable Failed to generate.");
      }

      console.log(result);
    } catch (err) {
      console.error(err);
      toast.error("Timetable Failed to generate.");
    } finally {
      setIsGenerating(false);
    }
  }, [selectedTimetableData]);

  return (
    <div className="App">
      <Topbar page={"Dashboard"} />
      <div className="mainPlaceholder">
        <Header
          name={selectedTimetableData?.name || "Unknown"}
          days={selectedTimetableData?.days.length ?? 0}
          slots={selectedTimetableData?.slots ?? 0}
          classes={classes?.data?.length ?? 0}
          viewStatus={selectedTimetableData.view_status}
          isGenerating={isGenerating}
          onGenerate={handleTimetableGeneration}
          onForce={() => handleTimetableGeneration(true)}
        />

        <DetailsGridTimetable
          teachers={teachers?.data?.length}
          subjects={subjects?.data?.length}
          classes={classes?.data?.length}
        />

        <div className={styles.body}>
          <div className={styles.left}>
            <Tabs onTabChange={(tab) => setActiveTab(tab)} />

            {activeTab === "class" && (
              <>
                <Dropdown
                  options={classes?.data.map((c) => c.class_name)}
                  defaultValue={classes?.data.map((c) => c.class_name)[0] ?? ""}
                  placeholder="Select a class"
                  onChange={() => {}}
                ></Dropdown>

                <Table
                  entries={mockClassEntries}
                  slotCount={mockTimetable.slots}
                  days={mockTimetable.days}
                  mode="class"
                />
              </>
            )}

            {activeTab === "teacher" && (
              <>
                <Dropdown
                  options={teachers.data.map((t) => t.name)}
                  defaultValue={teachers.data.map((t) => t.name)[0] ?? ""}
                  placeholder="Select a Teacher"
                  onChange={() => {}}
                ></Dropdown>

                <Table
                  entries={mockTeacherEntries}
                  slotCount={mockTimetable.slots}
                  days={mockTimetable.days}
                  mode="teacher"
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