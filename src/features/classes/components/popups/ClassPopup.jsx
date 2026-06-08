import styles from "./ClassPopup.module.css";
import RequiredInputField from "../../../../shared/components/inputfields/RequiredInputField";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import { useEffect, useState } from "react";
import CircularCheckBox from "../../../../shared/components/specialButtons/CircularCheckBox";
import useClasses from "../../hooks/useClasses";

const INITIAL_FORM = { class_name: "", room_name: "", isLab: false };
const INITIAL_ERRORS = {
  class_name: null,
  room_name: null,
};
const ClassPopup = ({ visible, closePopup, existingData = null }) => {
  const { createListing, patchListing } = useClasses();
  const isEditMode = !!existingData;

  const [form, setForm] = useState(INITIAL_FORM);
  const [errorStates, setErrorStates] = useState(INITIAL_ERRORS);
  const popupConfig = isEditMode
    ? { title: "Edit Class", buttonText: "Edit" }
    : { title: "Add Class", buttonText: "Create" };

  useEffect(() => {
    if (!visible) return;

    if (isEditMode) {
      setForm({
        class_name: existingData?.class_name ?? "",
        room_name: existingData?.room_name ?? "",
      });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [visible, existingData, isEditMode]);

  const handleCloseClicked = () => {
    setForm(INITIAL_FORM);
    setErrorStates(INITIAL_ERRORS);
    closePopup();
  };

  const validate = (form) => {
    let hasError = false;
    const newErrors = { class_name: null, room_name: null };

    const className = form.class_name.trim();
    const roomName = form.room_name.trim();
    if (!className.trim()) {
      newErrors.class_name = "Required";
      hasError = true;
    } else if (className.length >= 25) {
      newErrors.class_name = "Name is too long";
      hasError = true;
    } else {
      newErrors.class_name = null;
    }

    if (roomName.length >= 25) {
      newErrors.room_name = "Name is too long";
      hasError = true;
    } else {
      newErrors.room_name = null;
    }

    return { hasError, newErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { hasError, newErrors } = validate(form);
    setErrorStates(newErrors);
    if (hasError) return;

    const payload = { ...form };
    if (!payload.room_name.trim()) {
      payload.room_name = form.class_name;
    }

    if (isEditMode) {
      // Build object with only changed fields
      const changedFields = {};

      if (payload.class_name.trim() !== existingData?.class_name?.trim()) {
        changedFields.class_name = payload.class_name;
      }
      if (payload.room_name.trim() !== existingData?.room_name?.trim()) {
        changedFields.room_name = payload.room_name;
      }
      // If no changes, just close the popup
      if (Object.keys(changedFields).length === 0) {
        return handleCloseClicked();
      }

      // Send only changed fields
      await patchListing.mutateAsync({
        classId: existingData?.id,
        data: changedFields,
      });
    } else {
      await createListing.mutateAsync(payload);
    }

    handleCloseClicked();
  };

  const toggleLab = () => setForm((prev) => ({ ...prev, isLab: !prev.isLab }));

  return (
    <PopupBox
      visible={visible}
      handleSubmit={handleSubmit}
      closeFunction={handleCloseClicked}
      title={popupConfig.title}
      primaryBtnText={popupConfig.buttonText}
    >
      <form className={styles.popupForm}>
        <RequiredInputField
          id={"class-name"}
          type={"text"}
          label={"Class Name"}
          placeholder={"e.g. S1 CSE"}
          value={form.class_name}
          setValue={(val) => setForm((prev) => ({ ...prev, class_name: val }))}
          errorState={errorStates.class_name}
        />
        <RequiredInputField
          id={"room-name"}
          type={"text"}
          label={"Room Name (optional)"}
          placeholder={"e.g. Annex 101A"}
          value={form.room_name}
          setValue={(val) => setForm((prev) => ({ ...prev, room_name: val }))}
          errorState={errorStates.room_name}
        />

        {/*is lab cant be changed in edit mode */}
        {!isEditMode && (
          <div className={styles.formGroup}>
            <CircularCheckBox checked={form.isLab} toggleCheck={toggleLab} />
            <label onClick={toggleLab} className="unselectable">
              Mark as lab
            </label>
          </div>
        )}
      </form>
    </PopupBox>
  );
};

export default ClassPopup;
