import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjectMap: {},   // id -> name
  loading: false,
  error: null,
  reloadSignal: 0, 
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects(state, action) {
      state.subjectMap = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearSubjects() {
      return initialState;
    },
    triggerSubjectsReload(state) {
      state.reloadSignal = Date.now();
    },
  },
});

export const {
  setSubjects,
  setLoading,
  setError,
  clearSubjects,
  triggerSubjectsReload, // 👈 export this
} = subjectSlice.actions;

export default subjectSlice.reducer;
