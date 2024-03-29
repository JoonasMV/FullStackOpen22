import express from "express";
import diagnosesRouter from "./routes/diagnosesRoute";
import patientRouter from "./routes/patientRoute";
import cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
