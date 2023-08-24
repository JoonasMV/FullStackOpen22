import {
  Diagnosis,
  Discharge,
  EntryWithoutId,
  HealthCheckRating,
  NewBaseEntry,
  SickLeave,
} from "../types";
import { parseString } from "./newPatient";

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return object as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (
    !object ||
    typeof object !== "object" ||
    !("date" in object) ||
    !("criteria" in object)
  ) {
    throw new Error("Incorrect or missing discharge: " + object);
  }
  return object as Discharge;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object)
  ) {
    throw new Error("Incorrect or missing sickLeave: " + object);
  }
  return object as SickLeave;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthEntry = (object: unknown): HealthCheckRating => {
  if (!isNumber(object) || !isHealthCheckRating(object)) {
    throw new Error("Incorrect or missing healthCheckRating: " + object);
  }
  return object;
};

const toNewEntry = (entry: unknown): EntryWithoutId => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("type" in entry) {
    switch (entry.type) {
      case "Hospital":
    }
  }

  if ("description" in entry && "date" in entry && "specialist" in entry) {
    const newBaseEntry: NewBaseEntry =
      "diagnosisCodes" in entry
        ? {
            description: parseString(entry.description),
            date: parseString(entry.date),
            specialist: parseString(entry.specialist),
            diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
          }
        : {
            description: parseString(entry.description),
            date: parseString(entry.date),
            specialist: parseString(entry.specialist),
          };

    if ("type" in entry) {
      switch (entry.type) {
        case "Hospital":
          if ("discharge" in entry) {
            const newEntry: EntryWithoutId = {
              ...newBaseEntry,
              type: "Hospital",
              discharge: parseDischarge(entry.discharge),
            };
            return newEntry;
          }
          throw new Error("Incorrect or missing data");

        case "OccupationalHealthcare":
          if ("employerName" in entry) {
            if ("sickLeave" in entry) {
              return {
                ...newBaseEntry,
                type: "OccupationalHealthcare",
                employerName: parseString(entry.employerName),
                sickLeave: parseSickLeave(entry.sickLeave),
              };
            }
            return {
              ...newBaseEntry,
              type: "OccupationalHealthcare",
              employerName: parseString(entry.employerName),
            };
          }
          throw new Error("Incorrect or missing data");

        case "HealthCheck":
          if ("healthCheckRating" in entry) {
            return {
              ...newBaseEntry,
              type: "HealthCheck",
              healthCheckRating: parseHealthEntry(entry.healthCheckRating),
            };
          }
          throw new Error("Incorrect or missing data");
      }
    }
  }
  throw new Error("Incorrect or missing data");
};

export default toNewEntry;
