import { configureStore } from "@reduxjs/toolkit"
import notificationSlice from "./slices/notificationSlice"
import blogSlice from "./slices/blogSlice"
import userSlice from "./slices/userSlice"

export default configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
    login: userSlice
  },
})
