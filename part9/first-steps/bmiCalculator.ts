export const calculateBmi = (height: number, weight: number) => {
  if (Number.isNaN(height) || Number.isNaN(weight))
    return "Incorrect input values";

  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 18.5) return "Underweight";
  else if (bmi >= 18.5 && bmi <= 24.9) return "Normal (healthy weight)";
  return "Overweight";
};

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
