import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    openNotification(state, action) {
      return action.payload
    },
    closeNotification() {
      return null
    }
  },
})

export const { openNotification, closeNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(openNotification(msg))

    setTimeout(() => 
       dispatch(closeNotification()), (time*1000)
    )
  }
}