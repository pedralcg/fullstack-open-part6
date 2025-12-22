import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    // Aquí defines directamente la lógica del cambio de estado
    filterChange(state, action) {
      return action.payload;
    },
  },
});

// RTK crea automáticamente el action creator con el mismo nombre
export const { filterChange } = filterSlice.actions;
// Y el reducer listo para exportar
export default filterSlice.reducer;
