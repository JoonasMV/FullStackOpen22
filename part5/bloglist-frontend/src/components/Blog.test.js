import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("b part tests", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "www.test.com",
    likes: 12,
    user: [
      {
        username: "James",
        name: "Bob",
      },
    ],
  };

  test("renders content", () => {
    // screen.debug();
    const { container } = render(<Blog blog={blog} />);

    const extraDiv = container.querySelector(".extraInfo");
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("test title");
    expect(div).toHaveTextContent("test author");
    expect(extraDiv).not.toBeVisible();
  });

  test("renders extra info", async () => {
    const { container } = render(<Blog blog={blog} />);
    const button = container.querySelector(".infoButton");
    fireEvent.click(button);
    //screen.debug();

    const extraInfo = container.querySelector(".extraInfo");
    expect(extraInfo).toBeVisible();
  });
});
