import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MoviesReviews {
  __typename?: 'MoviesReviews';
  id: string | null;
  title: string | null;
  body: string | null;
  rating: number | null;
  movieId: string | null;
  userReviewerId: string | null;
}

export interface MoviesReviewsState {
  fetchData?: MoviesReviews[];
  total?: number;
  hasNextPage?: boolean;
  after?: string | null;
  query: {
    limit: number;
    after?: string | null;
    conditions?: {
      movieId?: string;
      userReviewerId?: string;
    };
  };
}

const initialState: MoviesReviewsState = {
  query: {
    limit: 10,
  },
};

export const slice = createSlice({
  initialState,
  name: 'listMoviesReviews',
  reducers: {
    fetch: () => {},
    clearData: (state) => {
      state.fetchData = undefined;
      state.total = undefined;
      state.hasNextPage = undefined;
      state.after = undefined;
    },
    loaded: (
      state,
      action: PayloadAction<{
        data: MoviesReviews[];
        total?: number;
        hasNextPage?: boolean;
        after?: string | null;
      }>
    ) => {
      state.fetchData = action.payload.data;
      state.total = action.payload.total;
      state.hasNextPage = action.payload.hasNextPage;
      state.after = action.payload.after;
    },
    loadError: (state) => {
      state.fetchData = undefined;
    },
    updateQuery: (
      state,
      action: PayloadAction<{
        limit?: number;
        conditions?: {
          movieId?: string;
          userReviewerId?: string;
        };
      }>
    ) => {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
