import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { features } from '../..';

export const useListMovies = () => {
  const dispatch = useAppDispatch();

  const {
    fetchData,
    total,
    hasNextPage,
    query,
  } = useAppSelector((state) => state.listMovies);

  useEffect(() => {
    dispatch(features.listMovies.actions.fetch());
  }, [dispatch, query]);

  return {
    data: fetchData,
    total,
    hasNextPage,
    query,
    setQuery: (newQuery: Partial<typeof query>) =>
      dispatch(features.listMovies.actions.updateQuery(newQuery)),
    loadMore: () =>
      dispatch(
        features.listMovies.actions.updateQuery({
          limit: query.limit + 10,
        })
      ),
  };
};
