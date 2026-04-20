import styles from "./TimeTableCreatePopup.module.css";
import RequiredInputField from "../../../../shared/components/inputfields/RequiredInputField";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import { useState } from "react";
import useTimetableListing from "../../hooks/useTimetableListing";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TimeTableCreatePopup = ({ visible, closePopup }) => {
  //create table mutation
  const { createListing } = useTimetableListing();

  const [selectedDays, setSelectedDays] = useState(["Mon"]);
  const [form, setForm] = useState({
    name: "",
    slots: 6,
  });
  const [errorStates, setErrorStates] = useState({
    name: null,
    slots: null,
    days: null,
  });
  //handles day selection by adding/removing
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleCloseClicked = () => {
    //clears value
    setSelectedDays(["Mon"]);
    setForm({ name: "", slots: 6 });
    setErrorStates({ name: null, slots: null, days: null });
    closePopup();
  };

  const validateTableCreate = (form) => {
    let hasError = false;
    const newErrors = { name: null, slots: null, days: null };

    if (!form.name.trim()) {
      newErrors.name = "Required";
      hasError = true;
    } else if (form.name.length >= 30) {
      newErrors.name = "Name is too long";
      hasError = true;
    } else {
      newErrors.name = null;
    }

    if (!form.slots) {
      newErrors.slots = "Required";
      hasError = true;
    } else if (Number(form.slots) <= 0) {
      newErrors.slots = "Can't be negative";
      hasError = true;
    } else {
      newErrors.slots = null;
    }

    if (selectedDays.length === 0) {
      newErrors.days = "Required";
      hasError = true;
    } else {
      newErrors.days = null;
    }

    return { hasError, newErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { hasError, newErrors } = validateTableCreate(form);
    setErrorStates(newErrors);
    if (hasError) return;
    //create table
    await createListing.mutateAsync({
      ...form,
      view_status: "Private",
      days: selectedDays,
    }); //default private table
  };

  return (
    <PopupBox
      visible={visible}
      handleSubmit={handleSubmit}
      closeFunction={handleCloseClicked}
      title={"Create Timetable"}
      primaryBtnText={"Create"}
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

export default TimeTableCreatePopup;
