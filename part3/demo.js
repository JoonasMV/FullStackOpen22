const { application } = require("express")
const express = require("express")

app = express()
app.use(express.json())

const test = [
  {name: "test", number: 123},
  {name: "asd", number: 321}
]

app.get("/test", (req, res) => {
  //res.send(JSON.stringify(test))
  console.log(JSON.stringify(req)).body
  res.json(test)
})

app.listen(3002, () => {
  console.log("test port open")
})