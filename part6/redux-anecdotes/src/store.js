import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationSlice from "./reducers/notificationSlice"
import filterSlice from "./reducers/filterSlice"

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    notification: notificationSlice,
    filter: filterSlice,
  },
})

store.subscribe(() =>
  store.getState().anecdote.sort((a, b) => b.votes - a.votes)
)

export default store
