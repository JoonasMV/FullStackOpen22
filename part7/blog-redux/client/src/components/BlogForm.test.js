import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

describe("Blogform tests", () => {
  const createBlogMock = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    render(<BlogForm createBlog={createBlogMock} />)
  })

  test("form created and submitted correctly", async () => {
    const titleInput = screen.getByPlaceholderText("Blog title")
    const authorInput = screen.getByPlaceholderText("Blog author")
    const urlInput = screen.getByPlaceholderText("Blog url")
    const submitButton = screen.getByText("create")

    await user.type(titleInput, "Title for blog")
    await user.type(authorInput, "Author for blog")
    await user.type(urlInput, "Url for blog")
    await user.click(submitButton)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0]).toEqual({
      title: "Title for blog",
      author: "Author for blog",
      url: "Url for blog",
    })
  })
})
