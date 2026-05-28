import styles from "./AssignPopup.module.css";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import SearchableSelect from "../../../../shared/components/selectMenus/SearchableSelect";
import DropdownSelect from "../../../../shared/components/selectMenus/DropdownSelect";
import { useMemo, useState } from "react";
import useTeachers from "../../../teachers/hooks/useTeachers";
import useClasses from "../../../classes/hooks/useClasses";
import useSubjects from "../../../subjects/hooks/useSubjects";
import useAssignments from "../../hooks/useAssignments";
import useTimeTableSelect from "../../../../shared/zustand/timetableSelectStore";
const ROLE_OPTIONS = [
  { label: "Subject Teacher", value: "Subject_Teacher" },
  { label: "Class Teacher", value: "Class_Teacher" },
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AssignPopup = ({ visible, closePopup, existingData = null }) => {
  const { createListing } = useAssignments();
  const isEditMode = !!existingData;
  const { data: classData } = useClasses();
  const { data: teacherData } = useTeachers();
  const { data: subjectData } = useSubjects();
  const [selectedDays, setSelectedDays] = useState(["Mon"]);
  const { selectedTimetableData } = useTimeTableSelect();

  const CLASS_OPTIONS = useMemo(
    () =>
      classData?.data.map((e) => ({ label: e?.class_name, value: e?.id })) ??
      [],
    [classData, selectedTimetableData],
  );

  const TEACHER_OPTIONS = useMemo(
    () =>
      teacherData?.data.map((e) => ({ label: e?.name, value: e?.id })) ?? [],
    [teacherData, selectedTimetableData],
  );

  const SUBJECT_OPTIONS = useMemo(
    () =>
      subjectData?.data.map((e) => ({ label: e?.name, value: e?.id })) ?? [],
    [subjectData, selectedTimetableData],
  );

  const [form, setForm] = useState({
    teacher_id: null,
    class_id: null,
    subject_id: null,
    role: ROLE_OPTIONS[0].value,
  });

  const popupConfig = isEditMode
    ? { title: "Edit Assignment", buttonText: "Edit" }
    : { title: "Add Assignment", buttonText: "Create" };

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const submitEnabled = useMemo(
    () => form.teacher_id && form.class_id && form.subject_id,
    [form],
  );

  const handleSubmit = async () => {
    const payload = { ...form };
    if (form?.role === "Class_Teacher")
      payload.morning_class_days = selectedDays;
    if (isEditMode) {
    }

    await createListing.mutateAsync(payload);

    closePopup();
  };

  const handleClose = () => {
    setForm({
      teacher_id: null,
      class_id: null,
      subject_id: null,
      role: ROLE_OPTIONS[0].value,
    });
    setSelectedDays(["Mon"]);
    closePopup();
  };
  return (
    <PopupBox
      visible={visible}
      closeFunction={handleClose}
      handleSubmit={handleSubmit}
      title={popupConfig.title}
      primaryBtnText={popupConfig.buttonText}
      disabled={!submitEnabled}
    >
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Teacher Name</label>
          <SearchableSelect
            initialPlaceholder={"Select teacher"}
            options={TEACHER_OPTIONS}
            value={form?.teacher_id}
            setValue={(value) =>
              setForm((prev) => ({ ...prev, teacher_id: value }))
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Class Name</label>
          <SearchableSelect
            initialPlaceholder={"Select class"}
            options={CLASS_OPTIONS}
            value={form?.class_id}
            setValue={(value) =>
              setForm((prev) => ({ ...prev, class_id: value }))
            }
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Subject Name</label>
          <SearchableSelect
            initialPlaceholder={"Select subject"}
            options={SUBJECT_OPTIONS}
            value={form?.subject_id}
            setValue={(value) =>
              setForm((prev) => ({ ...prev, subject_id: value }))
            }
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Teacher Role</label>
          <DropdownSelect
            initialPlaceholder={"Select teacher role"}
            options={ROLE_OPTIONS}
            value={form?.role ?? ""}
            setValue={(value) => setForm((prev) => ({ ...prev, role: value }))}
          />
        </div>

        {form?.role === "Class_Teacher" && (
          <div className={styles.field}>
            <label className={styles.label}>Morning Class Days</label>

            <div className={styles.days}>
              {DAYS.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  className={
                    selectedDays.includes(day) ? styles.dayActive : styles.day
                  }
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PopupBox>
  );
};

export default AssignPopup;
