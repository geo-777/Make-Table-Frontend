export const updateQueryCache = ({ queryClient, queryKey, updateFn }) => {
  queryClient.setQueryData(queryKey, (oldData) => {
    if (!oldData?.data) {
      queryClient.invalidateQueries({
        queryKey,
      });

      return oldData;
    }

    return updateFn(oldData);
  });
};
