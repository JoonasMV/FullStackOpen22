import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import { reduxNotification } from "./notificationSlice"

const initialState = {
  token: null,
  username: null,
  name: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      if (action.payload === null)
        return initialState
      return action.payload
    },
  },
})

export default userSlice.reducer
export const { setUser } = userSlice.actions

export const handleLogin = (username, password) => {
  return async (dispatch, useState) => {
  try {
    const user = await loginService.login({
      username,
      password,
    })
    dispatch(setUser(user))
    dispatch(reduxNotification(`Logged in as ${username}`, false))
    blogService.setToken(user.token)
    window.localStorage.setItem("user", JSON.stringify(user))
  } catch (ex) {
    console.log("log in error")
    dispatch(reduxNotification(ex.response.data.error, true))
  }
  }
}

export const handleLogout = () => {
  return (dispatch) => {
    dispatch(setUser(initialState))
    blogService.setToken(initialState)
    window.localStorage.clear()
  }
}