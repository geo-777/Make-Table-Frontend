import styles from "./AssignPopup.module.css";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import SearchableSelect from "../../../../shared/components/selectMenus/SearchableSelect";
import DropdownSelect from "../../../../shared/components/selectMenus/DropdownSelect";
import { useMemo, useState } from "react";
import useTeachers from "../../../teachers/hooks/useTeachers";
import useClasses from "../../../classes/hooks/useClasses";
import useSubjects from "../../../subjects/hooks/useSubjects";
const ROLE_OPTIONS = [
  { label: "Subject Teacher", value: "Subject_Teacher" },
  { label: "Class Teacher", value: "Class_Teacher" },
];

const AssignPopup = ({ visible, closePopup, existingData = null }) => {
  const isEditMode = !!existingData;
  const { data: classData } = useClasses();
  const { data: teacherData } = useTeachers();
  const { data: subjectData } = useSubjects();

  const CLASS_OPTIONS = useMemo(
    () => classData?.data.map((e) => ({ label: e?.class_name, value: e?.id })),
    [classData],
  );

  const TEACHER_OPTIONS = useMemo(
    () => teacherData?.data.map((e) => ({ label: e?.name, value: e?.id })),
    [teacherData],
  );

  const SUBJECT_OPTIONS = useMemo(
    () => subjectData?.data.map((e) => ({ label: e?.name, value: e?.id })),
    [subjectData],
  );

  const [form, setForm] = useState({
    teacher_id: null,
    class_id: null,
    subject_id: null,
    role: ROLE_OPTIONS[0].value,
  });
  const errorState = false; //change later

  const popupConfig = isEditMode
    ? { title: "Edit Assignment", buttonText: "Edit" }
    : { title: "Add Assignment", buttonText: "Create" };

  const handleSubmit = async () => {};
  return (
    <PopupBox
      visible={visible}
      closeFunction={closePopup}
      handleSubmit={handleSubmit}
      title={popupConfig.title}
      primaryBtnText={popupConfig.buttonText}
    >
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>
            <p>Teacher</p>
            <p
              className={`${styles.errorLabel} ${errorState ? "" : styles.hidden} `}
            >
              Required
            </p>
          </label>
          <SearchableSelect
            initialPlaceholder={"Select teacher"}
            options={TEACHER_OPTIONS}
            value={form?.teacher_id ?? ""}
            setValue={(value) =>
              setForm((prev) => ({ ...prev, teacher_id: value }))
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            <p>Class</p>
            <p
              className={`${styles.errorLabel} ${errorState ? "" : styles.hidden} `}
            >
              Required
            </p>
          </label>
          <SearchableSelect
            initialPlaceholder={"Select class"}
            options={CLASS_OPTIONS}
            value={form?.class_id ?? ""}
            setValue={(value) =>
              setForm((prev) => ({ ...prev, class_id: value }))
            }
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            <p>Subject</p>
            <p
              className={`${styles.errorLabel} ${errorState ? "" : styles.hidden} `}
            >
              Required
            </p>
          </label>
          <SearchableSelect
            initialPlaceholder={"Select subject"}
            options={SUBJECT_OPTIONS}
            value={form?.subject_id ?? ""}
            setValue={(value) =>
              setForm((prev) => ({ ...prev, subject_id: value }))
            }
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            <p>Teacher Role</p>
            <p
              className={`${styles.errorLabel} ${errorState ? "" : styles.hidden} `}
            >
              Required
            </p>
          </label>
          <DropdownSelect
            initialPlaceholder={"Select teacher role"}
            options={ROLE_OPTIONS}
            value={form?.role ?? ""}
            setValue={(value) => setForm((prev) => ({ ...prev, role: value }))}
          />
        </div>
      </div>
    </PopupBox>
  );
};

export default AssignPopup;
