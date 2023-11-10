import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop
} from "@mui/material";
import Header from "../header/header";
import PlanetSelect from "../planetsSelect/planetsSelect";
import VehicleSelect from "../vehicleSelect/vehicleSelect";
import Submit from "../submitForm/submitForm";
import styles from "./findingFalcone.module.css";
import { Backend_Endpoint } from "../../config";

export default function FindingFalcone() {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState(Array(4).fill(""));
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState(Array(4).fill(""));
  const [time, setTime] = useState(0);
  const [distances, setDistances] = useState(Array(4).fill(0));
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function-1: Fetch planets and vehicles data
  const generateData = async () => {
    try {
      const response1 = await axios.get(`${Backend_Endpoint}/planets`);
      setPlanets(response1.data);
    } catch (error) {
      console.log(error);
      setAlertMessage("Error fetching planets data.");
      setOpenAlert(true);
    }

    try {
      const response2 = await axios.get(`${Backend_Endpoint}/vehicles`);
      setVehicles(response2.data);
    } catch (error) {
      console.log(error);
      setAlertMessage("Error fetching vehicles data.");
      setOpenAlert(true);
    }
  };

  // Function-2: Handle planet selection for a specific destination
  const handlePlanetSelection = (e, index) => {
    const selected = e.target.value;
    setSelectedPlanets((prevSelectedPlanets) => {
      const updatedSelectedPlanets = [...prevSelectedPlanets];
      updatedSelectedPlanets[index] = selected;
      return updatedSelectedPlanets;
    });

    planets.forEach((planet) => {
      if (planet.name === selected) {
        setDistances((prevDistances) => {
          const updatedDistances = [...prevDistances];
          updatedDistances[index] = planet.distance;
          return updatedDistances;
        });
      }
    });
  };

  // Function-3: Handle vehicle selection for a specific destination
  const handleVehicleSelection = (e, index) => {
    const selected = e.target.value;

    const updatedSelectedVehicles = [...selectedVehicles];

    vehicles.forEach((vehicle) => {
      if (vehicle.name === selected && vehicle.total_no > 0) {
        const speed = vehicle.speed;
        vehicle.total_no -= 1;
        const duration = distances[index] / speed;
        setTime(time + duration);
        updatedSelectedVehicles[index] = selected;
      }
    });

    setSelectedVehicles(updatedSelectedVehicles);
  };

  // Function-4: Handle planet deselection for a specific destination
  const handlePlanetDeselection = (index) => {
    setSelectedPlanets((prevSelectedPlanets) => {
      const updatedSelectedPlanets = [...prevSelectedPlanets];
      updatedSelectedPlanets[index] = "";
      return updatedSelectedPlanets;
    });

    setDistances((prevDistances) => {
      const updatedDistances = [...prevDistances];
      updatedDistances[index] = 0;
      return updatedDistances;
    });
  };

  const resetSelection = () => {
    setLoading(true);
    setSelectedPlanets(Array(4).fill(""));
    setSelectedVehicles(Array(4).fill(""));
    setDistances(Array(4).fill(0));
    setTime(0);
    generateData();
    setTimeout(() => {
      setLoading(false); // Set resetting back to false
    }, 1000);
    //   window.location.href =
    //     "https://geektrustchallenge-findingfalcone.netlify.app/findingFalcone";
  };
  const Destinations = [1, 2, 3, 4];

  useEffect(() => {
    generateData();
  }, []);

  useEffect(() => {
    console.log(selectedVehicles);
  }, [selectedVehicles]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div>
      <Header currentPage="play" />
      <div className={styles.container}>
        <Grid container spacing={2}>
          {Destinations.map((destination, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ minWidth: 275, height: "100%" }}>
                <CardContent style={{ height: "100%" }}>
                  <Typography variant="h5">
                    Destination {destination}
                  </Typography>
                  <PlanetSelect
                    index={index}
                    planets={planets}
                    selectedPlanets={selectedPlanets}
                    handlePlanetSelection={handlePlanetSelection}
                  />
                  <VehicleSelect
                    index={index}
                    vehicles={vehicles}
                    selectedVehicles={selectedVehicles}
                    handleVehicleSelection={handleVehicleSelection}
                    distances={distances}
                    handlePlanetDeselection={() =>
                      handlePlanetDeselection(index)
                    }
                    selectedPlanets={selectedPlanets}
                    isPlanetSelected={!!selectedPlanets[index]}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <h3 className={styles.duration}>Duration: {time}</h3>
        <div className={styles.button}>
          <Submit
            selectedPlanets={selectedPlanets}
            selectedVehicles={selectedVehicles}
          />
          {loading ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              onClick={resetSelection}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
