import reducer, { actions } from './slice';
import { fetchMoviesEpic } from './epics';

export const epics = [
  fetchMoviesEpic,
];

export { reducer, actions };
