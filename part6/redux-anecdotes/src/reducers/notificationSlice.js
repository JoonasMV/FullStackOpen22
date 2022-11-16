import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, id: null },
  reducers: {
    openNotification(state, action) {
      return { ...state, message: action.payload }
    },
    closeNotification() {
      return { message: null, id: null }
    },
    setNotificationTimeout(state, action) {
      state.id = action.payload
    },
    resetNotificationTimeout(state) {
      clearTimeout(state.id)
    }
  },
})

export const { openNotification, closeNotification, setNotificationTimeout, resetNotificationTimeout } =
  notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(openNotification(msg))
    dispatch(resetNotificationTimeout())
    
    const timeId = setTimeout(() => dispatch(closeNotification()), time * 1000)
    dispatch(setNotificationTimeout(timeId))
  }
}
