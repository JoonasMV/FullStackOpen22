import data from "../../data/diagnoses";
import { Diagnose } from "../types";

const diagnoses: Diagnose[] = data

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
