import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UDPATE_AUTHOR } from "../queries";
import { useState } from "react";
import Select from "react-select";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const [updatedAuthor] = useMutation(UDPATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  if (!props.show) {
    return null;
  }

  const submit = async (e) => {
    e.preventDefault();

    updatedAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthday</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={name}
            onChange={e => setName(e.value)}
            options={authors.map((a) => ({ value: a.name, label: a.name }))}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  );
};

export default Authors;
