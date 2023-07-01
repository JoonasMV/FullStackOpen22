import data from "../../data/patients";
import { NonSensitivePatient, Patient, patientToAdd } from "../types";
import { v1 as uuid } from "uuid";

const patientData: Patient[] = data;

const getPatients = () => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,  
    gender,
    occupation,
  }));
};

const addNewPatient = (entry: patientToAdd): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addNewPatient,
};
