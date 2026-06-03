import { useQuery } from "@tanstack/react-query";
import {
  getClassTimetable_GET,
  getTeacherTimetable_GET,
} from "../../../api/timetableEntry.api";

const usePublicTimetable = ({ id, isClass = false }) => {
  const typeKey = isClass ? "class" : "teacher";
  const queryKey = ["publicTimetables", typeKey, id];

  const queryFn = async () => {
    if (!id) return null;
    return isClass ? getClassTimetable_GET(id) : getTeacherTimetable_GET(id);
  };

  const query = useQuery({
    queryKey,
    queryFn,
    enabled: Boolean(id),
  });

  return query;
};

export default usePublicTimetable;
