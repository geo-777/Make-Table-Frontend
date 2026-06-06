import { useMemo } from "react";
import useClasses from "../../features/classes/hooks/useClasses";

export default function useLabClasses() {
  const { data: classes } = useClasses();

  return useMemo(() => classes?.data?.filter((c) => c.isLab) ?? [], [classes]);
}