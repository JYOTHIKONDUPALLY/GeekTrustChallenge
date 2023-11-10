import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Header from "../header/header";
import { Backend_Endpoint } from "../../config";

export default function Explore() {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const generateData = async () => {
    try {
      const response = await axios.get(`${Backend_Endpoint}/planets`);
      setPlanets(response.data);
    } catch (error) {
      setAlertMessage("Error fetching planets data.");
      setOpenAlert(true);
    }

    try {
      const response = await axios.get(`${Backend_Endpoint}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      setAlertMessage("Error fetching vehicles data.");
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    generateData();
  }, []);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div>
      <Header currentPage="explore" />
      <Grid container spacing={3} sx={{ margin: "40px" }}>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    Planet Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    Planet Distance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {planets.map((planet, index) => (
                  <TableRow key={index}>
                    <TableCell>{planet.name}</TableCell>
                    <TableCell>{planet.distance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    Vehicle Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    Vehicle Speed
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    Vehicle Count
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    Vehicle Max Distance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map((vehicle, index) => (
                  <TableRow key={index}>
                    <TableCell>{vehicle.name}</TableCell>
                    <TableCell>{vehicle.speed}</TableCell>
                    <TableCell>{vehicle.total_no}</TableCell>
                    <TableCell>{vehicle.max_distance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

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
