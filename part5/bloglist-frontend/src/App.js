import { useState, useEffect, useRef } from "react";

import LoginForm from "./components/LoginForm";
import Bloglist from "./components/Bloglist";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setIsError(true)
      notificationHandler("wrong credentials", true)
    }
  };

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })

    notificationHandler(`A new blog "${newBlog.title}" by ${newBlog.author} added`, false)
  }

  const notificationHandler = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setMessage(null)
      setIsError(false)
    }, 5000)
  }

  const updateLikes = async (id, updatedValues) => {
    try {
      const updatedBlog = await blogService.update(id, updatedValues);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
    } catch (exception) {
      notificationHandler(`exception.response.data.error`, true);
    }
  };

/* --- RENDERING --- */
  if (user === null) {
    return (
      <div>
        <Notification message={message} isError={isError}/>
        {LoginForm({ handleLogin, username, setUsername, password, setPassword })}
      </div>
    )
  }

/* --- LOGGED USER --- */
  return (
    <div>
      <Notification message={message} isError={isError}/>
      <Bloglist blogs={blogs} username={user.name} updateLikes={updateLikes} />

      <Togglable buttonLabel="New Post" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

    </div>
    )
  }

export default App;
