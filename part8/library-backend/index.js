const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const typeDefs = require("./typeDefs");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

console.log("Connecting to", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(MONGO_URI)
    console.log("error connection to MongoDB:", error.message);
  });

// let books;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => {
      return Author.find({});
    },
    allBooks: async (root, args) => {
      if (Object.values(args).length === 0) {
        return await Book.find({}).populate("author");
      }

      let result;

      if (args.genre) {
        result = await Book.find({ genres: args.genre }).populate("author");
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        result = await Book.find({ author: author._id }).populate("author");
      }
      return result
    },

    me: async (root, args, ctx) => {
      console.log(ctx)
      return ctx.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      return books.filter((b) => String(b.author) === String(root.id)).length;
    },
  },

  Mutation: {
    addBook: async (root, args, ctx) => {
      let author = await Author.findOne({ name: args.author });
      const currentUser = ctx.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      }

      const book = new Book({ ...args, author: author.id });
      try {
        book.populate("author");
        return await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },

    editAuthor: async (root, { name, setBornTo }, ctx) => {
      const currentUser = ctx.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name });

      if (!author) return null;

      author.born = setBornTo;
      return await author.save();
    },

    createUser: async (root, args) => {
      console.log(args)
      const user = new User({ ...args });

      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("User creation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
  listen: { port: 4000 },

}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
