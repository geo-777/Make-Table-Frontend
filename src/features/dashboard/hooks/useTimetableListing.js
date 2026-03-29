import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllTimetables } from "../../../api/timetables.auth";
const useTimetableListing = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["timetableListings"],
    queryFn: fetchAllTimetables,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { ...query };
};

export default useTimetableListing;
