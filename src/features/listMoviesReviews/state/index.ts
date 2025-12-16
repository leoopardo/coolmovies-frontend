export { actions as listMoviesReviewsActions } from './slice';
export { default as listMoviesReviewsReducer } from './slice';

import { fetchMoviesReviewsEpic } from './epics';

export const listMoviesReviewsEpics = [
  fetchMoviesReviewsEpic,
];
