import { toast } from "react-toastify";

/* add extra components here if needed */

export const Component_Type = {
  TIMETABLES: "timetable",
  CLASSES: "class",
  SUBJECTS: "subject",
  TEACHERS: "teacher",
  ASSIGNMENTS: "assignment",
};

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const handleApiError = (status, component) => {
  const item = component ?? "resource";

  if (!status) {
    return toast.error(`Unable to process ${item}. Please try again.`);
  }

  switch (status) {
    case 400:
      return toast.error(`Invalid ${item} data provided.`);

    case 401:
      return toast.error("Session expired. Please login again.");

    case 403:
      return toast.error(`You don't have permission to modify this ${item}.`);

    case 404:
      return toast.error(`${capitalize(item)} not found.`);

    case 409:
      return toast.error(`A similar ${item} already exists.`);

    case 422:
      return toast.error(`Please check the ${item} details and try again.`);

    case 429:
      return toast.error("Too many attempts. Please wait a moment.");

    default:
      if (status >= 500) {
        return toast.error(
          `Couldn't process ${item} right now. Try again later.`,
        );
      }

      return toast.error(`Something went wrong while processing ${item}.`);
  }
};

export default handleApiError;
