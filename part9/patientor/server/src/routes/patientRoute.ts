import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../services/newPatient";
import toNewEntry from "../services/newEntry";
import { Entry } from "../types";
import { v1 as uuid } from "uuid";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

patientRouter.get("/:id", (req, res) => {
  res.send(patientService.getPatientById(req.params.id));
});

patientRouter.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);

  try {
    const newEntry = toNewEntry(req.body);
    const entryWithId: Entry = {
      ...newEntry,
      id: uuid(),
    };

    patient?.entries.push(entryWithId);
    res.json(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default patientRouter;