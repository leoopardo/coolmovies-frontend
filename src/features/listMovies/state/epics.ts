import { Epic } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';

import { RootState } from '../../../state/store';
import { EpicDependencies } from '../../../state/types';

import {
  MoviesDocument,
  MoviesQuery,
  MoviesQueryVariables,
} from '../../../generated/graphql';

import { actions, Movies, SliceAction } from './slice';

export const fetchMoviesEpic: Epic<
  SliceAction['fetch'],
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const { query } = state$.value.listMovies;

        const result = await client.query<
          MoviesQuery,
          MoviesQueryVariables
        >({
          query: MoviesDocument,
          variables: {
            first: query.limit,
            after: query.after ?? null
          },
          fetchPolicy: 'network-only',
        });

        return actions.loaded({
          data: result?.data?.allMovies?.nodes as Movies[],
          total: result?.data?.allMovies?.totalCount,
          hasNextPage: result?.data?.allMovies?.pageInfo?.hasNextPage,
          after: result?.data?.allMovies?.pageInfo?.endCursor,
        });
      } catch (err) {
        return actions.loadError();
      }
    })
  );
