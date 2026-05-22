import {
  fetchAllClasses,
  postClass,
  deleteClass,
  patchClass,
} from "../../../api/classes.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

const useClasses = (timetableId) => {
  const handleError = (status) => {
    if (!status) toast.error("Unknown error occured.");

    if (status >= 500 && status < 600) {
      toast.error("Internal Server error. Please try again later.");
    } else if (status === 429) {
      toast.error("Too many attempts. Try again in a few minutes.");
    } else {
      toast.error("Unknown error occured.");
    }
  };

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["classesListings", timetableId],
    queryFn: () => fetchAllClasses(timetableId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!timetableId,
  });

  return { ...query };
};

export default useClasses;
