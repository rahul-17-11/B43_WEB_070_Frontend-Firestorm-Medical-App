import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import authReducer from './slices/authSlice';
import medicinesReducer from './slices/medicinesSlice';
import cartReducer from './slices/cartSlice';
import { watchAuth } from './sagas/authSaga';
import { watchMedicines } from './sagas/medicinesSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    watchAuth(),
    watchMedicines(),
  ]);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicines: medicinesReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;