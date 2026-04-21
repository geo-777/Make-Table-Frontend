import styles from "./TimeTableCreatePopup.module.css";
import RequiredInputField from "../../../../shared/components/inputfields/RequiredInputField";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import { useEffect, useState, useRef } from "react";
import useTimetableListing from "../../hooks/useTimetableListing";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TimeTableEditPopup = ({ visible, closePopup, existingData }) => {
  //create table mutation
  const { patchListing } = useTimetableListing();
  // to disable the button if no change was made
  const [isPatched, setIsPatched] = useState(false);
  const [selectedDays, setSelectedDays] = useState(
    existingData?.days ?? ["Mon"],
  );
  const [form, setForm] = useState({
    name: existingData?.name ?? "",
    slots: existingData?.slots ?? 6,
  });
  const [errorStates, setErrorStates] = useState({
    name: null,
    slots: null,
    days: null,
  });

  //these two (initialized Ref and useEffect) handles setting up of existing data into form.
  //it should happen only once. so the ref act as a guard.
  useEffect(() => {
    if (visible && existingData) {
      setSelectedDays(existingData.days ?? ["Mon"]);
      setForm({
        name: existingData.name ?? "",
        slots: existingData.slots ?? 6,
      });
    }
  }, [visible, existingData]);
  //handles day selection by adding/removing
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  //handling change
  useEffect(() => {
    let changes = false;

    if (
      form.name?.trim() != existingData.name?.trim() ||
      form.slots != existingData.slots ||
      selectedDays != existingData.days
    ) {
      changes = true;
    }
    setIsPatched(changes);
  }, [form, selectedDays]);

  const handleCloseClicked = () => {
    //clears value
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
    if (hasError) return false;

    const payload = {
      ...form,
      days: selectedDays,
    };

    await patchListing.mutateAsync({
      id: existingData.id,
      data: payload,
    });
    return true;
  };

  return (
    <PopupBox
      visible={visible}
      handleSubmit={handleSubmit}
      closeFunction={handleCloseClicked}
      title={"Edit Timetable"}
      primaryBtnText={"Edit"}
      disabled={!isPatched}
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

export default TimeTableEditPopup;
