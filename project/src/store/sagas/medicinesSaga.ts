import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchMedicinesStart, fetchMedicinesSuccess, fetchMedicinesFailure } from '../slices/medicinesSlice';
import { Medicine } from '../../types';

function* handleFetchMedicines() {
  try {
    // TODO: Implement Firebase Firestore fetch
    const medicines: Medicine[] = [
      {
        id: '1',
        name: 'Paracetamol',
        description: 'Pain relief medication',
        price: 5.99,
        category: 'Pain Relief',
        inStock: true,
        requiresPrescription: false,
        imageUrl: 'https://example.com/paracetamol.jpg',
      },
    ];
    yield put(fetchMedicinesSuccess(medicines));
  } catch (error) {
    yield put(fetchMedicinesFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

export function* watchMedicines() {
  yield takeLatest(fetchMedicinesStart.type, handleFetchMedicines);
}