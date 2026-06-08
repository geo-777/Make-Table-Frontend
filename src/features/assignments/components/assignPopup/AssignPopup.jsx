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

const ROLE_OPTIONS = [
  { label: "Subject Teacher", value: "Subject_Teacher" },
  { label: "Class Teacher", value: "Class_Teacher" },
];
const INITIAL_FORM = {
  teacher_id: null,
  class_id: null,
  subject_id: null,
  role: ROLE_OPTIONS[0].value,
};
const AssignPopup = ({ visible, closePopup, existingData = null }) => {
  const { createListing, patchListing } = useAssignments();
  const isEditMode = !!existingData;
  const { data: classData } = useClasses();
  const { data: teacherData } = useTeachers();
  const { data: subjectData } = useSubjects();
  const [selectedDays, setSelectedDays] = useState([]);
  const [isPatched, setIsPatched] = useState(false);

  const CLASS_OPTIONS = useMemo(
    () =>
      classData?.data.map((e) => ({ label: e?.class_name, value: e?.id })) ??
      [],
    [classData],
  );

  const TEACHER_OPTIONS = useMemo(
    () =>
      teacherData?.data.map((e) => ({ label: e?.name, value: e?.id })) ?? [],
    [teacherData],
  );

  const SUBJECT_OPTIONS = useMemo(
    () =>
      subjectData?.data.map((e) => ({ label: e?.name, value: e?.id })) ?? [],
    [subjectData],
  );
  const [form, setForm] = useState(INITIAL_FORM);

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

  const isClassTeacher = form.role === ROLE_OPTIONS[1].value;

  const submitEnabled = isEditMode
    ? isPatched
    : form.teacher_id && form.class_id && form.subject_id;

  useEffect(() => {
    if (form.role !== ROLE_OPTIONS[1].value) {
      setSelectedDays([]);
    }
  }, [form.role]);

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
    const payload = {
      ...form,
      ...(isClassTeacher && { morning_class_days: selectedDays }),
    };

    if (isEditMode) {
      if (!isPatched) return;
      await patchListing.mutateAsync({
        id: existingData.id,
        data: payload,
      });
      closePopup();
      return;
    }

    await createListing.mutateAsync(payload);
    closePopup();
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
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

        {isClassTeacher && (
          <div className={styles.field}>
            <DaySelector
              label="Morning Class Days"
              selectedDays={selectedDays}
              toggleDay={toggleDay}
            />
          </div>
        )}
      </div>
    </PopupBox>
  );
};

export default AssignPopup;
