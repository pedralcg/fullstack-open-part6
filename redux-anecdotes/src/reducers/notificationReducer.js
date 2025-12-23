import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    // Esta acción solo cambia el texto
    updateNotification(state, action) {
      return action.payload;
    },
    // Esta acción limpia el texto
    clearNotification() {
      return "";
    },
  },
});

export const { updateNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    // 1. Mostramos el mensaje
    dispatch(updateNotification(message));

    // 2. Esperamos los segundos indicados
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
