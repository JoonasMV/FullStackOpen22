import { configureStore } from "@reduxjs/toolkit"
import anecdoteSlice from "./reducers/anecdoteSlice"
import notificationSlice from "./reducers/notificationSlice"
import filterSlice from "./reducers/filterSlice"

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    notification: notificationSlice,
    filter: filterSlice,
  },
})

export default store
