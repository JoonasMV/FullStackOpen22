import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const result = useQuery(ALL_BOOKS);
  
  useEffect(() => {
    if(!result.loading) {
      setFilteredBooks(result.data.allBooks)
    }
  }, []) // eslint-disable-line
  
  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }


  const books = result.data.allBooks;

  const genres = books.map((b) => b.genres).flat();
  const uniqueGenres = genres.filter(
    (value, index, array) => array.indexOf(value) === index
  );

  const filterByGenre = (genre) => {
    if(!genre) {
      return setFilteredBooks(books);
    }
    setFilteredBooks(() => books.filter(b => b.genres.includes(genre)))
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => (
        <button onClick={() => filterByGenre(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => filterByGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
