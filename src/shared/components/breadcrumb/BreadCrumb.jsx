import styles from "./BreadCrumb.module.css";
import useTimeTableSelect from "../../zustand/timetableSelectStore";
import { useLocation, Link } from "react-router-dom";
import { useMemo } from "react";

const BreadCrumb = () => {
  const location = useLocation();
  const MAIN_LINKS = ["/dashboard", "/classes", "/teachers", "/subjects", ""];
  const { selectedTimetableData, selectTimeTableData } = useTimeTableSelect();
  const crumbs = useMemo(() => {}, [selectedTimetableData]);

  return <div className={styles.breadCrumbContainer}></div>;
};

export default BreadCrumb;
