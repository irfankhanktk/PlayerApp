import { createSlice } from '@reduxjs/toolkit'

type Props = {
  doctors: any[],
  spec_categories: any[],
  hospitals: any[],
  appointments: any[],
}
const initialState: Props = {
  doctors: [],
  spec_categories: [],
  hospitals: [],
  appointments: [],
}

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload
    },
    setSpecCategories: (state, action) => {
      state.spec_categories = action.payload
    },
    setHospitals: (state, action) => {
      state.hospitals = action.payload
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload
    },
    reset: (state, action) => {
      state = initialState
    },
  },
})
// Action creators are generated for each case reducer function
export const {
  setSpecCategories,
  setDoctors,
  setHospitals,
  setAppointments,
  reset,
} = doctorSlice.actions
export default doctorSlice.reducer