import { Button, Menu, MenuItem, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Entry, EntryWithoutId, Patient, newBaseEntry } from "../../types";
import patients from "../../services/patients";
import { PaidTwoTone, QuickreplyRounded } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";

const EntryForm = ({
  patient,
  setPatient,
}: {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}) => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [entryType, setEntryType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employer, setEmployer] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(0);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type?: string) => {
    setAnchorEl(null);
    if (type !== undefined) setEntryType(type);
  };

  const submitEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: newBaseEntry = {
      description,
      date,
      specialist,
    };

    try {
      switch (entryType) {
        case "Hospital": {
          const newHospitalEntry: EntryWithoutId = {
            ...newEntry,
            type: entryType,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          const entryWithId = await patients.addEntry(
            patient.id,
            newHospitalEntry
          );
          setPatient(
            (patient = {
              ...patient,
              entries: patient.entries.concat(entryWithId),
            })
          );
          break;
        }

        case "OccupationalHealthcare": {
          const newOccupationalEntry =
            sickLeaveStartDate !== "" && sickLeaveEndDate !== ""
              ? {
                  ...newEntry,
                  type: entryType,
                  employerName: employer,
                  sickLeave: {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate,
                  },
                }
              : {
                  ...newEntry,
                  type: entryType,
                  employerName: employer,
                };
          const entryWithId = await patients.addEntry(
            patient.id,
            newOccupationalEntry
          );
          setPatient(
            (patient = {
              ...patient,
              entries: patient.entries.concat(entryWithId),
            })
          );
          break;
        }

        case "HealthCheck": {
          if (healthCheckRating === null) {
            break;
          }
          const newHealthCheckEntry = {
            ...newEntry,
            type: entryType,
            healthCheckRating,
          };
          const entryWithId = await patients.addEntry(
            patient.id,
            newHealthCheckEntry
          );
          setPatient(
            (patient = {
              ...patient,
              entries: patient.entries.concat(entryWithId),
            })
          );
          break;
        }
      }
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data;
      }
      console.log(errorMessage)
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const getFormDetails = (type: string): JSX.Element => {
    switch (type) {
      case "Hospital":
        return (
          <>
            <TextField
              label="Date"
              variant="standard"
              onChange={(e) => setDischargeDate(e.target.value)}
              value={dischargeDate}
            />
            <TextField
              label="Criteria"
              variant="standard"
              onChange={(e) => setDischargeCriteria(e.target.value)}
              value={dischargeCriteria}
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              label="Employer name"
              variant="standard"
              onChange={(e) => setEmployer(e.target.value)}
              value={employer}
            />
            <h2>Sick leave</h2>
            <TextField
              label="Start date"
              variant="standard"
              onChange={(e) => setSickLeaveStartDate(e.target.value)}
              value={sickLeaveStartDate}
            />
            <TextField
              label="End date"
              variant="standard"
              onChange={(e) => setSickLeaveEndDate(e.target.value)}
              value={sickLeaveEndDate}
            />
          </>
        );
      case "HealthCheck":
        return (
          <TextField
            label="Helth check rating"
            variant="standard"
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            value={healthCheckRating}
          />
        );

      case "Basic":
        return <></>;
    }
    return <></>;
  };

  return (
    <div style={{ border: "2px solid black", padding: "4px", margin: "4px" }}>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {!formVisibility ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFormVisibility(true)}
        >
          New entry
        </Button>
      ) : (
        <form onSubmit={submitEntry}>
          <h2>New entry</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Description"
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <TextField
              label="Date"
              variant="standard"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            <TextField
              label="Specialist"
              variant="standard"
              onChange={(e) => setSpecialist(e.target.value)}
              value={specialist}
            />
            {getFormDetails(entryType)}
          </div>

          <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
            <MenuItem onClick={() => handleClose("HealthCheck")}>
              Health check
            </MenuItem>
            <MenuItem onClick={() => handleClose("OccupationalHealthcare")}>
              Occupational
            </MenuItem>
            <MenuItem onClick={() => handleClose("Hospital")}>
              Hospital
            </MenuItem>
          </Menu>
          <div
            style={{ display: "flex", marginTop: "4px", marginBottom: "4px" }}
          >
            <Button variant="contained" color="primary" onClick={handleClick}>
              Entry type
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setFormVisibility(false)}
            >
              Cancel
            </Button>
            {entryType ? (
              <Button
                type="submit"
                style={{ marginLeft: "auto" }}
                variant="contained"
                color="inherit"
              >
                Add
              </Button>
            ) : (
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  alignItems: "center",
                }}
              >
                Choose entry type
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default EntryForm;
