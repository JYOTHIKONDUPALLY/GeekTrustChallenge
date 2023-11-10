import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export default function Header({ currentPage }) {
  const navigate = useNavigate();

  // Routing functions
  const routeToPlay = () => {
    navigate("/findingFalcone");
  };
  const routeToHome = () => {
    navigate("/");
  };
  const routeToChallenge = () => {
    navigate("https://www.geektrust.com/challenge/space");
  };
  const routeToExplore = () => {
    navigate("/explore");
  };

  let content;
  switch (currentPage) {
    case "home":
      content = (
        <div className={styles.button}>
          <Button variant="contained" onClick={routeToPlay} sx={{ m: 1 }}>
            Play
          </Button>
          <Button variant="contained" onClick={routeToExplore} sx={{ m: 1 }}>
            Explore
          </Button>
        </div>
      );
      break;
    case "play":
      content = (
        <div className={styles.button}>
          <Button variant="contained" sx={{ m: 1 }} onClick={routeToHome}>
            Home
          </Button>
          <Button variant="contained" onClick={routeToExplore} sx={{ m: 1 }}>
            Explore
          </Button>
        </div>
      );
      break;
    case "explore":
      content = (
        <div className={styles.button}>
          <Button variant="contained" onClick={routeToPlay} sx={{ m: 1 }}>
            Play
          </Button>
          <Button variant="contained" onClick={routeToHome} sx={{ m: 1 }}>
            Home
          </Button>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <div className={styles.header}>
      <Typography variant="h5" sx={{ m: 2 }}>
        Finding Falcone!
      </Typography>
      {content}
    </div>
  );
}
