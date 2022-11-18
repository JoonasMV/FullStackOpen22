import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { reduxNotification } from "./notificationSlice"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateComments(state, action) {
      const updatedComments = action.payload
      return state.map(blog => blog.id === updatedComments.id ? updatedComments : blog)
    }
  },
})

export default blogSlice.reducer
export const { appendBlog, setBlogs, removeBlog, updateComments } = blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog)
      dispatch(appendBlog(createdBlog))
      dispatch(reduxNotification("Blog created", false))
    } catch (ex) {
      console.log(ex)
      dispatch(reduxNotification("Error adding blog", true))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      const status = await blogService.deleteBlog(id)
      if (status !== 204) {
        dispatch(reduxNotification("Unauthorized", true))
        return
      }

      dispatch(reduxNotification("Blog successfully deleted", false))
      dispatch(removeBlog(id))
    } catch (error) {
      dispatch(reduxNotification("Error deleting blog", true))
    }
  }
}

export const updateBlog = (blogUpdates) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.updatedBlog(
      blogUpdates,
      blogUpdates.id
    )
    const updatedBlogs = getState().blogs
    dispatch(
      setBlogs(
        updatedBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      )
    )
  }
}

export const postComment = (id, comment) => {
  return async (dispatch, getState) => {
    try {
      const commendtedBlog = await blogService.commentBlog(id, comment)
      dispatch(reduxNotification("Comment posted", false))
      dispatch(updateComments(commendtedBlog))
      return
    } catch (error) {
      console.log(error)
      dispatch(reduxNotification("Error posting comment", true))
      return
    }
  }
}
