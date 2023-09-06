module.exports = typeDefs = `
type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int! 
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String]!
  ): Book!,
  editAuthor(name: String!, setBornTo: Int!): Author
}

  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
`;