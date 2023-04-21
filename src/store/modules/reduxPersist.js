import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'SCHOOL-APP',
      storage,
      whitelist: ['auth'],
    },
    reducers,
  );

  return persistedReducers;
};
