import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import userSercive from "../services/users"
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
    setLoggedInUser(state, action) {
      if (action.payload === null) {
        return initialState
      }
        blogService.setToken(action.payload.token)
        return action.payload
    },
    setUsers(state, action) {
      return action.payload
    },
  },
})

export default userSlice.reducer
export const { setLoggedInUser, setUsers } = userSlice.actions

export const getAll = () => {
  return async (dispatch) => {
    const users = await userSercive.getAll()
    dispatch(setUsers(users))
  }
}

export const handleLogin = (username, password) => {
  return async (dispatch, useState) => {
  try {
    const user = await loginService.login({
      username,
      password,
    })
    dispatch(setLoggedInUser(user))
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
    dispatch(setLoggedInUser(initialState))
    blogService.setToken(initialState)
    window.localStorage.clear()
  }
}