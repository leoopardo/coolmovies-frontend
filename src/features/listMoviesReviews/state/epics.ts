import { Epic } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';

import { RootState } from '../../../state/store';
import { EpicDependencies } from '../../../state/types';

import {
  MoviesReviewsDocument,
  MoviesReviewsQuery,
  MoviesReviewsQueryVariables,
} from '../../../generated/graphql';

import { actions, MoviesReviews, SliceAction } from './slice';

export const fetchMoviesReviewsEpic: Epic<
  SliceAction['fetch'],
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const { query } = state$.value.listMoviesReviews;

        const result = await client.query<
          MoviesReviewsQuery,
          MoviesReviewsQueryVariables
        >({
          query: MoviesReviewsDocument,
          variables: {
            first: query.limit,
            after: query.after ?? null,
            ...(query as any).conditions,
          },
          fetchPolicy: 'network-only',
        });

        return actions.loaded({
          data: result?.data?.allMovieReviews?.nodes as MoviesReviews[],
          total: result?.data?.allMovieReviews?.totalCount,
          hasNextPage: result?.data?.allMovieReviews?.pageInfo?.hasNextPage,
          after: result?.data?.allMovieReviews?.pageInfo?.endCursor,
        });
      } catch (err) {
        console.error('🔥 MoviesReviews error:', err);
        return actions.loadError();
      }
    })
  );
