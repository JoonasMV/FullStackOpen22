const express = require("express");
require("express-async-errors");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogRouter = require("./controllers/blogs");

const errorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeValidationError") {
    const message = [];

    error.errors.forEach((err) => {
      message.push(err.message);
    });

    return res.status(400).send({ error: message });
  }

  next(error)
};

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
  });
};

start();
