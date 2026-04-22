import styles from "./Timetable.module.css";
import SearchableSelect from "../../../../shared/components/searchableSelect/SearchableSelect";
const ClassTimetable = () => {
  const MOCK_DATA = [
    { label: "S! CSE", value: 1 },
    { label: "S2 CSE", value: 1 },
  ];
  return (
    <div className={styles.main}>
      <div style={{ maxWidth: "200px" }}>
        <SearchableSelect
          options={MOCK_DATA}
          initialPlaceholder={"Select class"}
          setValue={() => {}}
        />
      </div>
    </div>
  );
};

export default ClassTimetable;
