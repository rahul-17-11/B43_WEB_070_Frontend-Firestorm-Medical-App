import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MedicinesState, Medicine } from '../../types';

const initialState: MedicinesState = {
  items: [],
  loading: false,
  error: null,
};

const medicinesSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    fetchMedicinesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMedicinesSuccess: (state, action: PayloadAction<Medicine[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchMedicinesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMedicinesStart, fetchMedicinesSuccess, fetchMedicinesFailure } = medicinesSlice.actions;
export default medicinesSlice.reducer;