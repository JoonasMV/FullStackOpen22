const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User")
const typeDefs = require("./typeDefs");
const { GraphQLError } = require("graphql")
const jwt = require('jsonwebtoken')


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

    me: async (root, args, ctx) => {
      return ctx.currentUser
    }
  },

  Author: {
    bookCount: (root) => 420,
    // bookCount: (root) => books.filter((b) => b.author === root.name).length,
  },

  Mutation: {
    addBook: async (root, args, ctx) => {
      let author = await Author.findOne({ name: args.author });
      const currentUser = ctx.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
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
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: author.id });
      try {
        book.populate("author")
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
      const currentUser = ctx.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      // if (!author) return null;

      // const updatedAuthor = { ...author, born: setBornTo };
      // authors = authors.map((a) => (a.id === author.id ? author : a));
      // return updatedAuthor;
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        return await user.save()  
      } catch (error) {
        throw new GraphQLError("User creation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user ||args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
