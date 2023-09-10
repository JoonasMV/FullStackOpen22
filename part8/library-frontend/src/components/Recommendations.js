import {
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { BOOKS_BY_GENRE, CURRENT_USER } from "../queries";
import { useEffect, useState } from "react";

const Recommendations = ({ show }) => {
  const user = useQuery(CURRENT_USER);
  console.log(user.data)
  const [getBooks, { data: favoriteBooks }] = useLazyQuery(BOOKS_BY_GENRE);

  const [favoriteGenre, setFavoriteGenre] = useState(null);

  useEffect(() => {
    if (user.data) {
      setFavoriteGenre(user?.data?.me?.favoriteGenre)
      getBooks({ variables: { genre: favoriteGenre } });
    }
  }, [user.data, favoriteGenre, getBooks]);
  
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      Books in your favorite genre
      <strong> {user.data?.me?.favoriteGenre}</strong>
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
