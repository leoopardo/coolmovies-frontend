import reducer, { actions } from './slice';
import { fetchMoviesReviewsEpic } from './epics';

export const epics = [
  fetchMoviesReviewsEpic,
];

export { reducer, actions };
