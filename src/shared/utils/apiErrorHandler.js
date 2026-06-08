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

const ERROR_MESSAGES = {
  400: (item) => `Invalid ${item} data provided.`,
  401: () => "Session expired. Please login again.",
  403: (item) => `You don't have permission to modify this ${item}.`,
  404: (item) => `${capitalize(item)} not found.`,
  409: (item) => `Conflict : A similar ${item} already exists.`,
  422: (item) => `Please check the ${item} details and try again.`,
  429: () => "Too many attempts. Please wait a moment.",
};

const handleApiError = (status, component) => {
  const item = component ?? "resource";

  const getMessage =
    ERROR_MESSAGES[status] ??
    ((i) =>
      status >= 500
        ? `Couldn't process ${i} right now. Try again later.`
        : `Something went wrong while processing ${i}`);

  toast.error(getMessage(item));
};

export default handleApiError;
