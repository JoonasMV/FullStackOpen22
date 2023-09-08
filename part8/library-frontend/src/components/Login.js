import { useApolloClient, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const Login = ({ show, setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  
  if (!show) {
    return null;
  }
  
    const logout = () => {
      setToken(null);
      localStorage.clear();
      client.resetStore();
    };

  console.log(token);
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
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
};

export default Login;
