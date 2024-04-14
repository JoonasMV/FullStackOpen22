const { ReadingList } = require("../models");

const readingsRouter = require("express").Router();

readingsRouter.post("/", async (req, res) => {
  const { blogId, userId } = req.body;
  const ret = await ReadingList.create({
    blogId,
    userId,
  });
  res.json(ret);
});

module.exports = readingsRouter;
