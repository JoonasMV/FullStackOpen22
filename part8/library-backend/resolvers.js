const Book = require("./models/Book");
const Author = require("./models/Author");
const { GraphQLError } = require("graphql");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
      return result;
    },

    me: async (root, args, ctx) => {
      return ctx.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({});
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
        await book.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
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
      console.log(args);
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
