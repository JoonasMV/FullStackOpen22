import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: "", isError: false, id: null }

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    openNotification(state, action) {
      return {
        ...state,
        message: action.payload.message,
        isError: action.payload.isError,
      }
    },
    closeNotification() {
      return initialState
    },
    resetNotificationTimeout(state, action) {
      clearTimeout(state.id)
    },
    setNotificationTimeout(state, action) {
      state.id = action.payload
    },
  },
})

export default notificationSlice.reducer
export const {
  openNotification,
  resetNotificationTimeout,
  closeNotification,
  setNotificationTimeout,
} = notificationSlice.actions

export const reduxNotification = (msg, error) => {
  return (dispatch) => {
    dispatch(openNotification({ message: msg, isError: error }))
    dispatch(resetNotificationTimeout())

    const timeId = setTimeout(() => dispatch(closeNotification()), 5000)
    dispatch(setNotificationTimeout(timeId))
  }
}
