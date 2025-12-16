import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state/store';
import { actions } from '../features/listMoviesReviews/state/slice';

export const useListMoviesReviews = () => {
  const dispatch = useAppDispatch();

  const {
    fetchData,
    total,
    hasNextPage,
    query,
  } = useAppSelector((state) => state.moviesReviews);

  useEffect(() => {
    dispatch(actions.fetch());
  }, [dispatch, query]);

  return {
    data: fetchData,
    total,
    hasNextPage,
    query,
    setQuery: (newQuery: Partial<typeof query>) =>
      dispatch(actions.updateQuery(newQuery)),
    loadMore: () =>
      dispatch(
        actions.updateQuery({
          limit: query.limit + 10,
        })
      ),
  };
};
