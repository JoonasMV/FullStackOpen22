import { Entry, HealthCheckRating } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

const healthColor = (health: HealthCheckRating) => {
  switch (health) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    case 3:
      return "red";
  }
};

const EntryDetails = ({ entry }: { entry: Entry }) => {

  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <div>{entry.date}</div>
          <div>{entry.description}</div>
          <LocalHospitalIcon />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <div>{entry.date}</div>
          <div>{entry.description}</div>
          <WorkIcon />
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <div>{entry.date}</div>
          <div>
            <i>{entry.description}</i>
          </div>
          <FavoriteIcon sx={{ color: healthColor(entry.healthCheckRating) }} />
          <div>diagnose by {entry.specialist}</div>
        </div>
      );
  }
};

export default EntryDetails;
