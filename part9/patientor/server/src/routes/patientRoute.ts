import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../services/utils";

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

export default patientRouter;
