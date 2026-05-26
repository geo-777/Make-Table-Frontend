import styles from "./TimeTablePopup.module.css";
import RequiredInputField from "../../../../shared/components/inputfields/RequiredInputField";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import { useEffect, useState } from "react";
import useTimetableListing from "../../hooks/useTimetableListing";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialForm = () => ({
  name: "",
  slots: 6,
});

const initialErrors = () => ({
  name: null,
  slots: null,
  days: null,
});

const TimeTablePopup = ({
  visible,
  closePopup,
  mode = "create",
  existingData = null,
}) => {
  const isEditMode = mode === "edit";
  const { createListing, patchListing } = useTimetableListing();

  const [selectedDays, setSelectedDays] = useState(["Mon"]);
  const [form, setForm] = useState(initialForm);
  const [errorStates, setErrorStates] = useState(initialErrors);
  const [isPatched, setIsPatched] = useState(false);

  const resetForm = () => {
    setSelectedDays(["Mon"]);
    setForm(initialForm());
    setErrorStates(initialErrors());
    setIsPatched(false);
  };

  useEffect(() => {
    if (!visible) return;

    if (isEditMode && existingData) {
      setSelectedDays(existingData.days ?? ["Mon"]);
      setForm({
        name: existingData.name ?? "",
        slots: existingData.slots ?? 6,
      });
      setErrorStates(initialErrors());
      setIsPatched(false);
      return;
    }

    resetForm();
  }, [visible, isEditMode, existingData]);

  useEffect(() => {
    if (!isEditMode || !existingData) {
      setIsPatched(false);
      return;
    }

    const daysChanged =
      JSON.stringify(selectedDays.slice().sort()) !==
      JSON.stringify((existingData.days ?? []).slice().sort());

    const hasChanges =
      form.name?.trim() !== existingData.name?.trim() ||
      form.slots !== existingData.slots ||
      daysChanged;

    setIsPatched(hasChanges);
  }, [form, selectedDays, existingData, isEditMode]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleCloseClicked = () => {
    resetForm();
    closePopup();
  };

  const validateTableCreate = (currentForm) => {
    let hasError = false;
    const newErrors = initialErrors();

    if (!currentForm.name.trim()) {
      newErrors.name = "Required";
      hasError = true;
    } else if (currentForm.name.length >= 30) {
      newErrors.name = "Name is too long";
      hasError = true;
    }

    if (!currentForm.slots) {
      newErrors.slots = "Required";
      hasError = true;
    } else if (Number(currentForm.slots) <= 0) {
      newErrors.slots = "Must be greater than 0";
      hasError = true;
    }

    if (selectedDays.length === 0) {
      newErrors.days = "Required";
      hasError = true;
    }

    return { hasError, newErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { hasError, newErrors } = validateTableCreate(form);
    setErrorStates(newErrors);

    if (hasError) return false;

    const payload = {
      ...form,
      days: selectedDays,
    };

    if (isEditMode) {
      await patchListing.mutateAsync({
        id: existingData.id,
        data: payload,
      });
      return true;
    }

    await createListing.mutateAsync({
      ...payload,
      view_status: "Private",
    });

    return true;
  };

  return (
    <PopupBox
      visible={visible}
      handleSubmit={handleSubmit}
      closeFunction={handleCloseClicked}
      title={isEditMode ? "Edit Timetable" : "Create Timetable"}
      primaryBtnText={isEditMode ? "Edit" : "Create"}
      disabled={isEditMode && !isPatched}
    >
      <form className={styles.popupForm}>
        <RequiredInputField
          id={"timetable-name"}
          type={"text"}
          label={"Timetable Name"}
          placeholder={"e.g. Timetable-2026"}
          value={form.name}
          setValue={(val) => setForm((prev) => ({ ...prev, name: val }))}
          errorState={errorStates.name}
        />
        <RequiredInputField
          id={"timetable-slots"}
          type={"number"}
          label={"Slots per day"}
          placeholder={"Number of slots"}
          value={form.slots}
          setValue={(val) =>
            setForm((prev) => ({
              ...prev,
              slots: val == "" ? "" : Number(val),
            }))
          }
          min={"0"}
          errorState={errorStates.slots}
        />
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <p>Select working days</p>
            <p
              className={`${styles.errorLabel} ${errorStates.days ? "" : styles.hidden} `}
            >
              {errorStates.days}
            </p>
          </label>
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
      </form>
    </PopupBox>
  );
};

export default TimeTablePopup;
