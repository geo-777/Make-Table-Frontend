import styles from "./ClassPopup.module.css";
import RequiredInputField from "../../../../shared/components/inputfields/RequiredInputField";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import { useState } from "react";
import CircularCheckBox from "../../../../shared/components/specialButtons/CircularCheckBox";
const CreateClassPopup = ({ visible, closePopup }) => {
  const [form, setForm] = useState({
    class_name: "",
    room_name: "",
    isLab: false,
  });
  const [errorStates, setErrorStates] = useState({
    class_name: null,
    room_name: null,
  });

  const handleCloseClicked = () => {
    setForm({
      class_name: "",
      room_name: "",
    });
    setErrorStates({
      class_name: null,
      room_name: null,
    });
    closePopup();
  };

  const validate = (form) => {
    let hasError = false;
    const newErrors = { class_name: null, room_name: null, isLab: null };

    if (!form.class_name.trim()) {
      newErrors.class_name = "Required";
      hasError = true;
    } else if (form.class_name.length >= 30) {
      newErrors.class_name = "Name is too long";
      hasError = true;
    } else {
      newErrors.class_name = null;
    }

    if (form.room_name.length >= 30) {
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
    //fill up roomname with classname
    const payload = { ...form };
    if (!payload.room_name.trim()) {
      payload.room_name = form.class_name;
    }
    console.log(payload);
  };
  return (
    <PopupBox
      visible={visible}
      handleSubmit={handleSubmit}
      closeFunction={handleCloseClicked}
      title={"Add Class"}
      primaryBtnText={"Create"}
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

        <div className={styles.formGroup}>
          <CircularCheckBox
            checked={form.isLab}
            toggleCheck={() =>
              setForm((prev) => ({ ...prev, isLab: !prev.isLab }))
            }
          />
          <label
            onClick={() => setForm((prev) => ({ ...prev, isLab: !prev.isLab }))}
            className="unselectable"
          >
            Mark as lab
          </label>
        </div>
      </form>
    </PopupBox>
  );
};

export default CreateClassPopup;
