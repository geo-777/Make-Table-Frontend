import useTimetableListing from "./useTimetableListing";
// seperate hook for using the data only..
export const useTimetableData = () => {
  const { readListings } = useTimetableListing();

  const query = readListings();

  const timetableListings = query.data; // full response object
  const timetables = query.data?.data ?? []; // array of timetables

  const draftTimeTables = timetables.filter((e) => e.view_status === "Private");
  const publishedTimeTables = timetables.filter(
    (e) => e.view_status === "Public",
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
