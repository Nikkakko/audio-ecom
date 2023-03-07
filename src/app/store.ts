import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import { productApi } from '../services/audiophile';

// ...

const rootReducer = combineReducers({
  product: productReducer,
  [productApi.reducerPath]: productApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
