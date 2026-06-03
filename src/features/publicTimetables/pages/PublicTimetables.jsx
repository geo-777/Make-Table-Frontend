import styles from "../styles/PublicTimetables.module.css";
import NavigationBar from "../components/navigationBar/NavigationBar";
import { useParams } from "react-router-dom";
import usePublicTimetable from "../hooks/usePublicTimetable";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
import Table from "../../dashboard/components/timeTables/Table";
const PublicTimetables = ({ classTable = false }) => {
  const { id } = useParams();

  const { data, isPending, error, isError, isSuccess } = usePublicTimetable({
    id,
    isClass: classTable,
  });

  console.log("public timetable data:", data);

  return (
    <div className={styles.main}>
      <NavigationBar />
      {isPending && <StatusWrapper loader={true} />}
      {isError && <StatusWrapper isError={true} error={error} />}
      {isSuccess && (
        <>
          <div className={styles.pageHeader}>
            <p>
              {data?.timetable?.name.toUpperCase() ?? "TIMETABLE"} ·{" "}
              {classTable ? "CLASS" : "TEACHER"}
            </p>
            <h4>{data?.class_?.name ?? "CLASS"}</h4>
            <p>{classTable ? "Room no" : "Teacher Schedule"}</p>
          </div>
          <div className={styles.table}>
            <Table
              slotCount={data?.timetable?.slots ?? 0}
              days={data?.timetable?.days ?? []}
              entries={data?.entries ?? []}
              mode={classTable ? "class" : "teacher"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PublicTimetables;
