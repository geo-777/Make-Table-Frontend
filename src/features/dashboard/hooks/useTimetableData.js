import { useMemo } from "react";
import useTimetableListing from "./useTimetableListing";

// separate hook for using the data only : read operations and calculations
export const useTimetableData = () => {
  const { readListings } = useTimetableListing();

  const query = readListings();

  const timetableListings = query.data;
  const timetables = useMemo(() => query.data?.data, [query.data?.data]);

  const draftTimeTables = useMemo(
    () => timetables?.filter((e) => e.view_status === "Private"),
    [timetables],
  );

  const publishedTimeTables = useMemo(
    () => timetables?.filter((e) => e.view_status === "Public"),
    [timetables],
  );

  return {
    // Main data
    timetableListings,
    timetables,
    draftTimeTables,
    publishedTimeTables,

    // Status
    isFetchPending: query.isPending,
    isFetchError: query.isError,
    isFetchSuccess: query.isSuccess,
    listingFetchError: query.error,

    // Extra useful things
    refetch: query.refetch,
  };
};
