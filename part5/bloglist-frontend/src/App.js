import { useState, useEffect } from "react";

import Bloglist from "./components/Bloglist";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);

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
    //console.log("username - ", username, " password - ",password)
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
      // setErrorMessage("wrong credentials")
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log(exception);
    }
  };
  console.log(user);
  /* --- RENDERING --- */
  return (
    <div>
      {user === null
        ? LoginForm({ handleLogin, username, setUsername, password, setPassword })
        : Bloglist(blogs, user.name)}
    </div>
  );
};

export default App;
