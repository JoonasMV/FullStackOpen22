import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Blog components tests", () => {
  const dummyFunc = () => {}
  const mockLikeHandler = jest.fn()

  const user = userEvent.setup()

  const blogUser = {
    user: "Tester",
    username: "Testy"
  }

  const blog = {
    title: "Title",
    author: "Author",
    url: "Url",
    user: {
      username: "Testy",
    },
    likes: 123,
  }

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        user={blogUser}
        sendLike={mockLikeHandler}
        deleteBlog={dummyFunc}
      />
    )
  })

  test("Blog renders title and author", () => {
    screen.getByText("Title")
    screen.getByText("Author")
  })

  test("Extra content shows after button press", async () => {
    expect(screen.queryByText(blog)).toBeNull()
    const button = screen.getByText(blog.title)
    await user.click(button)
    screen.getByText(blog.likes)
    screen.getAllByText(blog.url)
    screen.getAllByText(blog.author)
  })

  test("Event handler get called the right amount", async () => {
    const extraContentButton = screen.getByText(blog.title)
    await user.click(extraContentButton)
    const button = screen.getByText("like")
    await user.click(button)
    expect(mockLikeHandler.mock.calls).toHaveLength(1)
    await user.click(button)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
