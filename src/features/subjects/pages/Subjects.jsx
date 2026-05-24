import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import ListView from "../../../shared/components/itemView/listView/listView";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { useState } from "react";
import ItemCard from "../../../shared/components/itemView/itemCard/ItemCard";
import styles from "../styles/Subjects.module.css";

export default function Subjects () {

  const { selectedTimetableData } = useTimeTableSelect();
  const [activeView, setActiveView] = useState("grid");
  const MOCK_DATA = [
    [
      { heading: "Name",     value: "Mathematics" },
      { heading: "Type",     value: true,          trueLabel: "Lab", falseLabel: "Theory" },
      { heading: "Hardness", value: "4/10"        },
      { heading: "Daily",    value: "0-2"         },
      { heading: "Weekly",   value: "4-6"         },
      { heading: "Consec.",  value: 2             },
    ],
  ];

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
          onChangeActiveView={(view) => setActiveView(view)}
          onAdd={() => {}}
          onBulkImport={() => {}}
        />

        {activeView === "list" && (
          <ListView
            data={MOCK_DATA}
            onEdit={(rowIndex, updatedRow) => console.log(rowIndex, updatedRow)}
            onDelete={(rowIndex) => console.log("delete", rowIndex)}
          />
        )}

        {activeView === "grid" && (
          <div className={styles.gridView__Container}>
            {MOCK_DATA.map((sub, index) => {
              const name = sub.find((f) => f.heading === "Name")?.value;
              const type = sub.find((f) => f.heading === "Type");
              const hardness = sub.find((f) => f.heading === "Hardness")?.value;
              const daily = sub.find((f) => f.heading === "Daily")?.value;
              const weekly = sub.find((f) => f.heading === "Weekly")?.value;
              const consec = sub.find((f) => f.heading === "Consec.")?.value;

              const isLab = type?.value === true;
              const typeLabel = isLab ? type?.trueLabel : type?.falseLabel;

              return (
                <ItemCard key={index}>
                  <div className={styles.card__Header}>
                    <h3 className={styles.card__Title}>{name}</h3>
                  </div>

                  <div className={styles.card__Meta}>
                    <span
                      className={`${styles.card__Badge} ${isLab ? styles.card__Badge__lab : styles.card__Badge__theory}`}
                    >
                      {typeLabel}
                    </span>
                    <span className={styles.card__Hardness}>
                      {hardness} hardness
                    </span>
                  </div>

                  <div className={styles.card__Stats}>
                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>{daily}</span>
                      <span className={styles.card__StatLabel}>Daily</span>
                    </div>
                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>{weekly}</span>
                      <span className={styles.card__StatLabel}>Weekly</span>
                    </div>
                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>{consec}</span>
                      <span className={styles.card__StatLabel}>Consec.</span>
                    </div>
                  </div>
                </ItemCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

