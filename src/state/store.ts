import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { CreateStoreOptions } from './types';

import { features } from '../features';

const reducers = Object.fromEntries(
  Object.entries(features).map(([key, feature]) => [
    key,
    (feature).reducer,
  ])
);

const allEpics = Object.values(features).flatMap(
  (feature) => (feature as any).epics
);

const rootEpic = combineEpics<any, any, RootState>(...allEpics as any);

export const createStore = ({ epicDependencies }: CreateStoreOptions) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: epicDependencies,
  });

  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(epicMiddleware),
  });

  epicMiddleware.run(rootEpic as any);

  return store;
};

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
