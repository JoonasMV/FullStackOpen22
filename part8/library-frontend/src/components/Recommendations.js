import { useLazyQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../queries";
import { useEffect } from "react";

const Recommendations = ({ show, favoriteGenre }) => {
  const [getBooks, { data: favoriteBooks }] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    getBooks({ variables: { genre: favoriteGenre } });
  }, [favoriteGenre]); // eslint-disable-line

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      Books in your favorite genre
      <strong> {favoriteGenre}</strong>
      <table>
        <tbody>
          {favoriteBooks?.allBooks.map((b) => {
            return (
              <tr key={b.title}>
                <th>{b.title}</th>
                <th>{b.published}</th>
                <th>{b.author.name}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
