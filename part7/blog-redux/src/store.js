import { configureStore } from "@reduxjs/toolkit"
import notificationSlice from "./slices/notificationSlice"
import blogSlice from "./slices/blogSlice"

export default configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice
  },
})
