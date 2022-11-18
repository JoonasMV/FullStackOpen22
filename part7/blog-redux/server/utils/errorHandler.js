const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message })
  } else if (err.name === "CastError") {
    res.status(400).json({ error: "malformatted id" })
  } else {
    res.status(400).json({ error: `unhandled error \n${err.message}` })
    console.log(err)
  }
}

module.exports = errorHandler