import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../services/newPatient";
import toNewEntry from "../services/newEntry";

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
  const patient = patientService.getPatientById(req.params.id);
  if (patient === undefined) {
    return res.status(404).send("Patient not found");
  }
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    return res.json(addedEntry);

  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default patientRouter;
