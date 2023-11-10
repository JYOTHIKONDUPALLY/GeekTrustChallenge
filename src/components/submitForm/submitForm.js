import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Backdrop,
  Snackbar,
  Alert
} from "@mui/material";

export default function SubmitButton({ selectedPlanets, selectedVehicles }) {
  const [showResult, setShowResult] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openTokenError, setOpenTokenError] = useState(false);
  const [openSubmissionError, setOpenSubmissionError] = useState(false);

  const isSelectionComplete =
    selectedPlanets.every((planet) => planet.trim() !== "") &&
    selectedVehicles.every((vehicle) => vehicle.trim() !== "");

  const handleSubmit = async () => {
    setLoading(true);
    const headers = {
      accept: "application/json"
    };

    try {
      const response1 = await axios.post(
        "https://findfalcone.geektrust.com/token",
        {},
        { headers }
      );
      const token = response1.data.token;

      if (!token) {
        setOpenTokenError(true);
        setLoading(false);
        return;
      }

      const payload = {
        token,
        planet_names: selectedPlanets,
        vehicle_names: selectedVehicles
      };

      try {
        const response2 = await axios.post(
          "https://findfalcone.geektrust.com/find",
          payload,
          { headers }
        );
        setSubmitData(response2.data);
        setShowResult(true);
      } catch (error) {
        setOpenSubmissionError(true);
        setSubmitData(error);
      }
    } catch (error) {
      setOpenTokenError(true);
      setSubmitData(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTokenError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenTokenError(false);
  };

  const handleCloseSubmissionError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSubmissionError(false);
  };

  return (
    <div>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={!isSelectionComplete}
        >
          Submit
        </Button>
      )}
      <Dialog open={showResult} onClose={() => setShowResult(false)}>
        <DialogTitle>Result</DialogTitle>
        <DialogContent>
          <h2>{submitData.status === "success" ? "Found" : "Not Found"}</h2>
          {submitData.status === "success" ? (
            <div>
              <p>Congratulations! Falcone has been found.</p>
              <p>King Shan is pleased with your heroic efforts.</p>
            </div>
          ) : (
            <div>
              <p>The mission was not successful. Falcone is not found.</p>
            </div>
          )}
          {submitData.error && (
            <div>
              <p>There was an error in the submission:</p>
              <p>{submitData.error}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResult(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openTokenError}
        autoHideDuration={6000}
        onClose={handleCloseTokenError}
      >
        <Alert onClose={handleCloseTokenError} severity="error">
          Token is not initialized.
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSubmissionError}
        autoHideDuration={6000}
        onClose={handleCloseSubmissionError}
      >
        <Alert onClose={handleCloseSubmissionError} severity="error">
          Error submitting data.
        </Alert>
      </Snackbar>
    </div>
  );
}
