const { ReadingList, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

const readingsRouter = require("express").Router();

readingsRouter.post("/", async (req, res) => {
  const { blogId, userId } = req.body;
  const ret = await ReadingList.create({
    blogId,
    userId,
  });
  res.json(ret);
});

readingsRouter.put("/:id", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const readingList = await ReadingList.findByPk(req.params.id);

  if (!(user.id === readingList.userId)) {
    return res
      .status(403)
      .json({ error: "You can only manage your own reading list" });
  }

  const updatedReadingList = await readingList.update({
    read: req.body.read
  })
  res.json(updatedReadingList)
});

module.exports = readingsRouter;
