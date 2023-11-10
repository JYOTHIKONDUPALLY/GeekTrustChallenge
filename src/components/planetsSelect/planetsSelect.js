import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "./planetsSelect.module.css";

export default function PlanetSelect({
  index,
  planets,
  selectedPlanets,
  handlePlanetSelection
}) {
  const selectedPlanet = selectedPlanets[index];

  return (
    <FormControl fullWidth>
      {selectedPlanet ? (
        <div className={styles.text}>
          <p>Selected Planet: {selectedPlanet}</p>
        </div>
      ) : (
        <div>
          <InputLabel htmlFor={`planet-${index}`}>Select a planet:</InputLabel>
          <Select
            name={`selectedplanet${index}`}
            onChange={(e) => handlePlanetSelection(e, index)}
            value={selectedPlanet}
            fullWidth
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            {planets.map((planet) => (
              <MenuItem
                key={planet.name}
                value={planet.name}
                disabled={selectedPlanets.includes(planet.name)}
              >
                {planet.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </FormControl>
  );
}
