import storage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import docSlice from './reducers/doctor-reducer';
import userSlice from './reducers/user-reducer';
const reducers = combineReducers({
  doctor: docSlice,
  user: userSlice,
});
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist:[]
// };
const persistedReducer = persistReducer({
  key: 'root',
  storage,
  //by default whole store is persisted unitill mention in whitelist or blacklist
  whitelist: ['user'],//mention slice names that are to be persisted,
  blacklist: [],//mention slice names that are not to be persisted.
}, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;



