import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { features } from '../..';
import { QueryI } from '../../../api/query.interface';

export const useListMoviesReviews = (
  query?: QueryI<{
    movieId?: string;
    userReviewerId?: string;
  }>
) => {
  const dispatch = useAppDispatch();
  const prevQueryRef = useRef<QueryI<{}> | undefined>(undefined);

  const { fetchData, total, hasNextPage } = useAppSelector(
    (state) => state.listMoviesReviews
  );

  useEffect(() => {
    const queryChanged =
      JSON.stringify(prevQueryRef.current) !== JSON.stringify(query);

    if (query && queryChanged) {
      dispatch(features.listMoviesReviews.actions.updateQuery(query));
      prevQueryRef.current = query;
    }

    dispatch(features.listMoviesReviews.actions.fetch());
  }, [dispatch, query]);

  return {
    data: fetchData,
    total,
    hasNextPage,
  };
};
