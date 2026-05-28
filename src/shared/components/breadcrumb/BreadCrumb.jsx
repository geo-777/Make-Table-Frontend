import styles from "./BreadCrumb.module.css";
import useTimeTableSelect from "../../zustand/timetableSelectStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { ChevronRight } from "lucide-react";

const MAIN_LINKS = ["/dashboard", "/classes", "/teachers", "/subjects", ""];
const OTHER_LINKS = {
  helpsupport: "Help & Support",
  settings: "Settings",
};

const BreadCrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const { selectedTimetableData, selectTimeTableData } = useTimeTableSelect();
  const crumbs = useMemo(() => {
    let crumbs = [];

    if (!MAIN_LINKS.includes(pathname)) return [];

    crumbs.push({
      text: "Dashboard",
      active: pathname === "/dashboard" && !selectedTimetableData,
      fn: () => {
        selectTimeTableData(null);
        navigate("/dashboard");
      },
    });

    if (selectedTimetableData) {
      crumbs.push({
        text: selectedTimetableData?.name,
        active: pathname === "/dashboard",
        fn: () => navigate("/dashboard"),
      });
    }

    if (pathname != "/dashboard") {
      crumbs.push({
        text: pathname.charAt(1).toUpperCase() + pathname.slice(2),
        active: true,
        fn: () => {},
      });
    }

    return crumbs;
  }, [selectedTimetableData]);

  return (
    <div className={styles.breadCrumbContainer}>
      {!MAIN_LINKS.includes(pathname) && (
        <span className={styles.otherLinks}>
          {OTHER_LINKS?.[pathname.slice(1)] ??
            pathname.charAt(1).toUpperCase() + pathname.slice(2)}
        </span>
      )}

      {MAIN_LINKS.includes(pathname) &&
        crumbs.map((crumb, i) => (
          <span
            key={i}
            className={`${styles.crumb} ${crumb.active ? styles.active : ""}`}
          >
            <span
              onClick={() => {
                if (!crumb.active) crumb.fn();
              }}
            >
              {crumb?.text || ""}
            </span>

            {i != crumbs.length - 1 && (
              <ChevronRight
                style={{ marginInline: ".5rem" }}
                size={17}
                strokeWidth={2}
              />
            )}
          </span>
        ))}
    </div>
  );
};

export default BreadCrumb;
