import styles from "../styles/PublicTimetables.module.css";
import NavigationBar from "../components/navigationBar/NavigationBar";
import { useParams } from "react-router-dom";
import usePublicTimetable from "../hooks/usePublicTimetable";
import { useMemo } from "react";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
import Table from "../../dashboard/components/timeTables/Table";

function groupEntriesByDay(entries) {
  return entries.reduce((acc, entry) => {
    const day = entry.day;
    if (!acc[day]) acc[day] = [];
    acc[day].push(entry);
    return acc;
  }, {});
}

const PublicTimetables = ({ classTable = false }) => {
  const { id } = useParams();

  const { data, isLoading, error, isError, isSuccess } = usePublicTimetable({
    id,
    isClass: classTable,
  });

  const entriesGrouped = useMemo(
    () => groupEntriesByDay(data?.entries ?? []),
    [data?.entries],
  );
  return (
    <div className={styles.main}>
      <NavigationBar />
      {isLoading && <StatusWrapper loader={true} />}
      {isError && <StatusWrapper isError={true} error={error} />}
      {isSuccess && (
        <>
          <div className={styles.pageHeader}>
            <p>
              {data?.timetable?.name.toUpperCase() ?? "TIMETABLE"} ·{" "}
              {classTable ? "CLASS" : "TEACHER"}
            </p>
            <h4>
              {classTable
                ? (data?.class_name ?? "CLASS")
                : (data?.name ?? "TEACHER")}
            </h4>
            <p>
              {classTable
                ? (data?.room_name ?? "Room name")
                : "Teacher Schedule"}
            </p>
          </div>
          <div className={styles.table}>
            {entriesGrouped && Object.keys(entriesGrouped).length > 0 && (
              <Table
                slotCount={data?.timetable?.slots ?? 0}
                days={data?.timetable?.days ?? []}
                entries={entriesGrouped ?? []}
                mode={classTable ? "class" : "teacher"}
              />
            )}

            {Object.keys(entriesGrouped).length === 0 && (
              <div className={styles.emptyState}>
                <p>
                  No generated timetable for this{" "}
                  {classTable ? "class" : "teacher"} yet.
                </p>
              </div>
            )}
          </div>

          <footer className={styles.footer}>
            Powered by <span> MakeTable</span>
          </footer>
        </>
      )}
    </div>
  );
};

export default PublicTimetables;
