import { configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { CreateStoreOptions } from './types';
import { features } from '../features';

type ReducersMap = {
  [K in keyof typeof features]: (typeof features)[K]['reducer'];
};

const reducers = Object.keys(features).reduce((acc, key) => {
  acc[key as keyof ReducersMap] = (features as any)[key].reducer;
  return acc;
}, {} as ReducersMap);

const allEpics = Object.values(features).flatMap(
  (feature) => feature.epics as any ?? []
);

const rootEpic = combineEpics(...allEpics);

export const createStore = ({ epicDependencies }: CreateStoreOptions) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: epicDependencies,
  });

  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(epicMiddleware),
  });

  epicMiddleware.run(rootEpic);

  return store;
};

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
