import styles from "./AssignPopup.module.css";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
const AssignPopup = ({ visible, closePopup, existingData = null }) => {
  const isEditMode = !!existingData;

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
    ></PopupBox>
  );
};

export default AssignPopup;
