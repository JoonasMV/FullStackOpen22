interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (args: trainingArguments): TrainingResult => {
  const periodLength = args.actual.length;
  const targetDailyExercise = args.target;

  let success = true;
  let rating = 1;

  const trainingDays = args.actual.filter((day) => day > 0).length;
  if (trainingDays < periodLength * 0.75) success = false;
  else rating++;

  const actualExerciseHours: number = args.actual.reduce((a, b) => a + b, 0);
  if (actualExerciseHours < periodLength * targetDailyExercise) success = false;
  else rating++;

  const averageExerciseHours: number = actualExerciseHours / periodLength;

  let description = "Didn't go as planned";
  switch (rating) {
    case 2:
      description = "Not too bad but could be better";
      break;

    case 3:
      description = "Great work!";
      break;
  }

  return {
    periodLength: args.actual.length,
    trainingDays,
    success,
    rating,
    ratingDescription: description,
    target: targetDailyExercise,
    average: averageExerciseHours,
  };
};

interface trainingArguments {
  target: number;
  actual: number[];
}

export const parseArguments = (
  target: string,
  dailyHours: string[]
): trainingArguments => {
  if (
    Number.isNaN(target) ||
    dailyHours.map((hour) => Number(hour)).some(isNaN)
  ) {
    throw new Error("malformatted input");
  }

  return {
    target: Number(target),
    actual: dailyHours.map((hour) => Number(hour)),
  };
};

try {
  const parsedArguments = parseArguments(
    process.argv[3],
    process.argv.slice(3)
  );
  console.log(calculateExercises(parsedArguments));
} catch (error: unknown) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) errorMessage += "Error " + error.message;

  console.log(errorMessage);
}
