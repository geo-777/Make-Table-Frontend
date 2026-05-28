import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiErrorHandler, {
  Component_Type,
} from "../../../shared/utils/apiErrorHandler";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { updateQueryCache } from "../../../shared/utils/queryCacheHelper";
import { toast } from "react-toastify";

const useClasses = () => {
  const { selectedTimetableData } = useTimeTableSelect();

  const timetableId = selectedTimetableData?.id;

  const queryClient = useQueryClient();

  /*QUERY*/

  const query = useQuery({
    queryKey: ["assignments", timetableId],

    queryFn: () => fetchAllClasses(timetableId),

    enabled: !!timetableId,

    staleTime: 5 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });

  return {
    ...query,
  };
};

export default useClasses;
