import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "./vehicleSelect.module.css";

export default function VehicleSelect({
  index,
  vehicles,
  selectedVehicles,
  handleVehicleSelection,
  distances,
  isPlanetSelected,
  handlePlanetDeselection,
  selectedPlanets
}) {
  const allOptionsDisabled = vehicles.every(
    (vehicle) =>
      (selectedVehicles.includes(vehicle.name) && vehicle.total_no === 0) ||
      vehicle.max_distance < distances[index]
  );

  const isUndoVisible = allOptionsDisabled && selectedPlanets[index];

  return (
    <FormControl fullWidth>
      {selectedVehicles[index] ? (
        <div className={styles.text}>
          <p>Selected Vehicle: {selectedVehicles[index]}</p>
        </div>
      ) : (
        <div>
          {isPlanetSelected && (
            <div>
              <InputLabel htmlFor={`vehicle-${index}`}>
                Select a vehicle:
              </InputLabel>
              <Select
                name={`selectedvehicle${index}`}
                onChange={(e) => handleVehicleSelection(e, index)}
                value={selectedVehicles[index]}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                {vehicles.map((vehicle) => (
                  <MenuItem
                    key={vehicle.name}
                    value={vehicle.name}
                    disabled={
                      (selectedVehicles.includes(vehicle.name) &&
                        vehicle.total_no === 0) ||
                      vehicle.max_distance < distances[index]
                    }
                  >
                    {vehicle.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          {isUndoVisible && (
            <div className={styles.message}>
              <p>
                no vehicles are avaliable for this . Please select another
                planet{" "}
                <button
                  onClick={() => {
                    handlePlanetDeselection();
                  }}
                >
                  Undo
                </button>
              </p>
            </div>
          )}
        </div>
      )}
    </FormControl>
  );
}
