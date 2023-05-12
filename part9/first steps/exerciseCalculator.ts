interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (actual: number[]): TrainingResult => {
  const periodLength = actual.length;
  const targetDailyExercise = 2;

  let success: boolean = true;
  let rating: number = 1;

  const trainingDays = actual.filter((day) => day > 0).length;
  if (trainingDays < periodLength * 0.75) success = false;
  else rating++;

  const actualExerciseHours: number = actual.reduce((a, b) => a + b, 0);
  if (actualExerciseHours < periodLength * targetDailyExercise) success = false;
  else rating++;

  const averageExerciseHours: number = actualExerciseHours / periodLength;

  let description: string = "Didn't go as planned";
  switch (rating) {
    case 2:
      description = "Not too bad but could be better";
      break;

    case 3:
      description = "Great work!";
      break;
  }

  return {
    periodLength: actual.length,
    trainingDays,
    success,
    rating,
    ratingDescription: description,
    target: targetDailyExercise,
    average: averageExerciseHours,
  };
};

const parseArguments = (args: string[]): number[] => {
  if (args.length < 3) throw new Error("Not enough arguments");

  const parseArguments = args.slice(3).map((hour) => Number(hour));
  parseArguments.forEach((element) => {
    if (Number.isNaN(element)) throw new Error("Invalid input");
  });
  
  return parseArguments;
};

try {
  const parsedArguments = parseArguments(process.argv);
  console.log(calculateExercises(parsedArguments));
} catch (error: unknown) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) errorMessage += "Error " + error.message;

  console.log(errorMessage);
}
