import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    nilaiToggleNavigasiMobile: "hidden",
    nilaiTogglePasswordLoginPertama: "password",
    nilaiTogglePasswordRegisterPertama: "password",
    nilaiTogglePasswordRegisterKedua: "password",
    nilaiToggleNominal: "password",
  },
  reducers: {
    toggleNavigasiMobile: (state) => {
      if (state.nilaiToggleNavigasiMobile === "hidden") {
        state.nilaiToggleNavigasiMobile = "flex";
      } else {
        state.nilaiToggleNavigasiMobile = "hidden";
      }
    },
    togglePasswordLoginPertama: (state) => {
      if (state.nilaiTogglePasswordLoginPertama === "password") {
        state.nilaiTogglePasswordLoginPertama = "text";
      } else {
        state.nilaiTogglePasswordLoginPertama = "password";
      }
    },
    togglePasswordRegisterPertama: (state) => {
      if (state.nilaiTogglePasswordRegisterPertama === "password") {
        state.nilaiTogglePasswordRegisterPertama = "text";
      } else {
        state.nilaiTogglePasswordRegisterPertama = "password";
      }
    },
    togglePasswordRegisterKedua: (state) => {
      if (state.nilaiTogglePasswordRegisterKedua === "password") {
        state.nilaiTogglePasswordRegisterKedua = "text";
      } else {
        state.nilaiTogglePasswordRegisterKedua = "password";
      }
    },
    togglePasswordNominal: (state) => {
      if (state.nilaiToggleNominal === "password") {
        state.nilaiToggleNominal = "text";
      } else {
        state.nilaiToggleNominal = "password";
      }
    },
  },
});

export const {
  toggleNavigasiMobile,
  togglePasswordLoginPertama,
  togglePasswordRegisterPertama,
  togglePasswordRegisterKedua,
  togglePasswordNominal,
} = toggleSlice.actions;
export default toggleSlice.reducer;
