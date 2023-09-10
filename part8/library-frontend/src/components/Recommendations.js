import {
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { BOOKS_BY_GENRE, CURRENT_USER } from "../queries";
import { useEffect } from "react";

const Recommendations = ({ show }) => {
  const user = useQuery(CURRENT_USER);
  const [getBooks, { data: favoriteBooks }] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    if (user.data) {
      getBooks({ variables: { genre: user.data?.me?.favoriteGenre } });
    }
  }, [user.data, user.data?.me?.favoriteGenre, getBooks]);
  if (!show || !user.data) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      Books in your favorite genre{" "}
      <strong>{user.data?.me?.favoriteGenre}</strong>
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
