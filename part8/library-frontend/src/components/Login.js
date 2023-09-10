import { useApolloClient, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_USER, LOGIN } from "../queries";

const Login = ({ show, setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");

  const [error, setError] = useState("");
  const client = useApolloClient();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
      setTimeout(() => {
        setError("");
      }, 5000);
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
      setTimeout(() => {
        setError("");
      }, 5000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    createUser({ variables: { username: newUsername, favoriteGenre } });
  };

  if (!show) {
    return null;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (token) {
    return (
      <div>
        <div>Are you sure you want to logout?</div>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      New user? Create account
      <form onSubmit={createNewUser}>
        <div>
          username
          <input
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div>
          favorite genre
          <input
            value={favoriteGenre}
            onChange={(e) => setFavoriteGenre(e.target.value)}
          />
        </div>
        <button type="submit">Create user</button>
      </form>
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
};

export default Login;
