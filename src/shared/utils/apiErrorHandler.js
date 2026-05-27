import { toast } from "react-toastify";

/* add extra components here if needed */

export const Component_Type = {
  CLASSES: 1,
  SUBJECTS: 2,
  TEACHERS: 3,
  ASSIGNMENTS: 4,
};

const componentMap = {
  [Component_Type.CLASSES]: "class",
  [Component_Type.SUBJECTS]: "subject",
  [Component_Type.TEACHERS]: "teacher",
  [Component_Type.ASSIGNMENTS]: "assignment",
};

const handleApiError = (status, component) => {
  const item = componentMap[component] ?? "resource";

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
      return toast.error(`${item[0].toUpperCase() + item.slice(1)} not found.`);

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
