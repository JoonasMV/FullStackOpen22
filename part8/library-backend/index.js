const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const typeDefs = require("./typeDefs");
const { GraphQLError } = require("graphql")

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

console.log("Connecting to", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      if (Object.values(args).length === 0) {
        return await Book.find({});
      }

      let result;
      
      if (args.genre) {
        result = await Book.find({ genres: args.genre });
      }
      
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        result = await Book.find({ author: author._id });
      }
      return result;
    },
  },

  Author: {
    bookCount: (root) => 420,
    // bookCount: (root) => books.filter((b) => b.author === root.name).length,
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: author.id });
      try {
        return await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        })
      }
    },
    editAuthor: (root, { name, setBornTo }) => {
      const author = authors.find((a) => a.name === name);
      if (!author) return null;

      const updatedAuthor = { ...author, born: setBornTo };
      authors = authors.map((a) => (a.id === author.id ? author : a));
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
