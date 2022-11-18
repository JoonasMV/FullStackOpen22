import { configureStore } from "@reduxjs/toolkit"
import notificationSlice from "./slices/notificationSlice"
import blogSlice from "./slices/blogSlice"
import loginSlice from "./slices/loginSlice"
import userSlice from "./slices/userSlice"

export default configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
    login: loginSlice,
    users: userSlice
  },
})
