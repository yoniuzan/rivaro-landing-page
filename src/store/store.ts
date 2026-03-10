import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import userListReducer from '../widgets/UserList/UserListStoreSlice';

/**
 * Root reducer
 * Combine all reducers here
 */
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  userList: userListReducer,
  // Add your other reducers here
});

/**
 * Configure store
 * Add middleware and enhancers here
 */
export const createStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [],
          // Ignore these field paths in all actions
          ignoredActionPaths: [],
          // Ignore these paths in the state
          ignoredPaths: [],
        },
      }).concat(baseApi.middleware),
  });
};

export const store = createStore();

// Infer types
export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
