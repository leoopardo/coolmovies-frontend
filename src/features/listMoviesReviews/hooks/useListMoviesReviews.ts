import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { features } from '../../';

export const useListMoviesReviews = () => {
  const dispatch = useAppDispatch();
  const prevQueryRef = useRef<typeof query | null>(null);

  const {
    fetchData,
    total,
    hasNextPage,
    query,
  } = useAppSelector((state) => state.listMoviesReviews);

  useEffect(() => {
    const queryChanged =
      JSON.stringify(prevQueryRef.current) !== JSON.stringify(query);

    if (queryChanged) {
      dispatch(features.listMoviesReviews.actions.fetch());
      prevQueryRef.current = query;
    }
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
