import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, parseArguments } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    res.status(400).send("Malformatted request");
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi,
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!(target && daily_exercises)) {
    res.status(400).send({ error: "parameter missing" });
  }

  try {
    const parsedArguments = parseArguments(target, daily_exercises);
    res.send(calculateExercises(parsedArguments));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
