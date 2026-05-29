import styles from "./AssignPopup.module.css";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import SearchableSelect from "../../../../shared/components/selectMenus/SearchableSelect";
import DropdownSelect from "../../../../shared/components/selectMenus/DropdownSelect";
import DaySelector from "../../../../shared/components/daySelector/DaySelector";
import { useEffect, useMemo, useState } from "react";
import useTeachers from "../../../teachers/hooks/useTeachers";
import useClasses from "../../../classes/hooks/useClasses";
import useSubjects from "../../../subjects/hooks/useSubjects";
import useAssignments from "../../hooks/useAssignments";
import useTimeTableSelect from "../../../../shared/zustand/timetableSelectStore";

const ROLE_OPTIONS = [
  { label: "Subject Teacher", value: "Subject_Teacher" },
  { label: "Class Teacher", value: "Class_Teacher" },
];

const AssignPopup = ({ visible, closePopup, existingData = null }) => {
  const { createListing, patchListing } = useAssignments();
  const isEditMode = !!existingData;
  const { data: classData } = useClasses();
  const { data: teacherData } = useTeachers();
  const { data: subjectData } = useSubjects();
  const [selectedDays, setSelectedDays] = useState([]);
  const [isPatched, setIsPatched] = useState(false);
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
    teacher_id: existingData?.teacher_id ?? null,
    class_id: null,
    subject_id: null,
    role: ROLE_OPTIONS[0].value,
  });

  useEffect(() => {
    if (!visible) return;

    if (isEditMode && existingData) {
      setForm({
        teacher_id: existingData?.teacher?.id ?? null,
        class_id: existingData?.class_?.id ?? null,
        subject_id: existingData?.subject?.id ?? null,
        role: existingData?.role ?? ROLE_OPTIONS[0].value,
      });
      setSelectedDays(existingData?.morning_class_days ?? []);
      setIsPatched(false);
      return;
    }

    setForm({
      teacher_id: null,
      class_id: null,
      subject_id: null,
      role: ROLE_OPTIONS[0].value,
    });
    setSelectedDays([]);
    setIsPatched(false);
  }, [visible, isEditMode, existingData]);

  const popupConfig = isEditMode
    ? { title: "Edit Assignment", buttonText: "Edit" }
    : { title: "Add Assignment", buttonText: "Create" };

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const submitEnabled = useMemo(() => {
    if (isEditMode) return isPatched;

    if (!form.teacher_id || !form.class_id || !form.subject_id) return false;
    return true;
  }, [form, selectedDays, isEditMode, isPatched]);

  useEffect(() => {
    if (!isEditMode || !existingData) {
      setIsPatched(false);
      return;
    }

    const originalRole = existingData?.role ?? ROLE_OPTIONS[0].value;
    const originalDays = existingData?.morning_class_days ?? [];
    const roleChanged = form.role !== originalRole;
    const daysChanged =
      JSON.stringify(selectedDays.slice().sort()) !==
      JSON.stringify(originalDays.slice().sort());

    setIsPatched(roleChanged || daysChanged);
  }, [form.role, selectedDays, existingData, isEditMode]);

  const handleSubmit = async () => {
    if (isEditMode) {
      if (!isPatched) return;
      const payload = {
        role: form.role,
        morning_class_days: selectedDays,
      };

      await patchListing.mutateAsync({
        id: existingData.id,
        data: payload,
      });
      closePopup();
      return;
    }

    const payload = {
      ...form,
      morning_class_days: selectedDays,
    };

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
    setSelectedDays([]);
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
        {!isEditMode && (
          <>
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
          </>
        )}

        <div className={styles.field}>
          <label className={styles.label}>Teacher Role</label>
          <DropdownSelect
            initialPlaceholder={"Select teacher role"}
            options={ROLE_OPTIONS}
            value={form?.role ?? ""}
            setValue={(value) => setForm((prev) => ({ ...prev, role: value }))}
          />
        </div>

        <div className={styles.field}>
          <DaySelector
            label="Morning Class Days"
            selectedDays={selectedDays}
            toggleDay={toggleDay}
          />
        </div>
      </div>
    </PopupBox>
  );
};

export default AssignPopup;
