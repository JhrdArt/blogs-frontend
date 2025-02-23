import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    author: "Author",
    title: "Title",
    url: "URL",
    likes: 0,
    user: {
      username: "Username",
      name: "Name",
    },
  };

  let component;

  const likeMockHandler = jest.fn();
  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} updateLikes={likeMockHandler} />
    );
  });

  test("renders title and author without url and likes", () => {
    expect(component.container.querySelector(".title")).toHaveTextContent(
      blog.title
    );

    expect(component.container.querySelector("author")).toHaveTextContent(
      blog.author
    );

    expect(component.queryByText(blog.url)).not.toBeInTheDocument();
    expect(component.queryByText("like")).not.toBeInTheDocument();
  });
  
  test("at start the children are not displayed", () => {
    const details = component.container.querySelector(".blog-details");

    expect(details).toEqual(null);
  });

  test("renders blog details when view button is clicked", () => {
    const button = component.container.querySelector("button");
    fireEvent.click(button);

    const blogDetails = component.container.querySelector(".blog-details");
    expect(blogDetails).toBeInTheDocument();
  });

  test("if the Like button is clicked twice, the event handler is also called twice", () => {
    const viewButton = component.getByText("show");
    fireEvent.click(viewButton);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
