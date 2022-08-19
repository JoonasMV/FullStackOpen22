import { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import Bloglist from "./components/Bloglist";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)



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

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle("")
        setAuthor("")
        setUrl("")
      })

    notificationHandler(`A new blog "${title}" by ${author} added`, false)
  }

  const notificationHandler = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setMessage(null)
      setIsError(false)
    }, 5000)
  }

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
      <Bloglist blogs={blogs} username={user.name} />

      <BlogForm 
      addBlog={addBlog}
      title={title} setTitle={setTitle} 
      author={author} setAuthor={setAuthor}
      url={url} setUrl={setUrl}
      />
    </div>
    )
  }

export default App;
