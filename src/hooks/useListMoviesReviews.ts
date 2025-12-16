import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state/store';
import { features } from '../features';

export const useListMoviesReviews = () => {
  const dispatch = useAppDispatch();

  const {
    fetchData,
    total,
    hasNextPage,
    query,
  } = useAppSelector((state) => state.listMoviesReviews);

  useEffect(() => {
    dispatch(features.listMoviesReviews.actions.fetch());
  }, [dispatch, query]);

  return {
    data: fetchData,
    total,
    hasNextPage,
    query,
    setQuery: (newQuery: Partial<typeof query>) =>
      dispatch(features.listMoviesReviews.actions.updateQuery(newQuery)),
    loadMore: () =>
      dispatch(
        features.listMoviesReviews.actions.updateQuery({
          limit: query.limit + 10,
        })
      ),
  };
};
