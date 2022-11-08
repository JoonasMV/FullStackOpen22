import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return `you voted ${action.payload.content}`
    },
    closeNotification(state, action) {
      state = null
      return state
    }
  },
})

export const { setNotification, closeNotification } = notificationSlice.actions
export default notificationSlice.reducer