import { Gender, patientToAdd } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const parseString = (text: unknown): string => {
  if (!isString(text) || !text) {
    throw new Error("invalid string");
  }
  return text;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const toNewPatient = (patient: unknown): patientToAdd => {
  if (!patient || typeof patient !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "ssn" in patient &&
    "name" in patient &&
    "dateOfBirth" in patient &&
    "gender" in patient &&
    "occupation" in patient 
  ) {
    const newPatient: patientToAdd = {
      ssn: parseString(patient.ssn),
      name: parseString(patient.name),
      dateOfBirth: parseString(patient.dateOfBirth),
      gender: parseGender(patient.gender),
      occupation: parseString(patient.occupation),
      entries: []
    };
    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatient;
