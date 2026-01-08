import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movies {
  __typename?: 'Movies';
  id: string | null;
  title: string | null;
  movieDirectorId: string | null;
  userCreatorId: number | null;
  releaseDate: string | null;
  imgUrl: string | null;
}

export interface MoviesState {
  fetchData?: Movies[];
  total?: number;
  hasNextPage?: boolean;
  after?: string | null;
  query: {
    limit: number;
    after?: string | null;
  };
}

const initialState: MoviesState = {
  query: {
    limit: 10,
  },
};

export const slice = createSlice({
  initialState,
  name: 'movies',
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
        data: Movies[];
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
