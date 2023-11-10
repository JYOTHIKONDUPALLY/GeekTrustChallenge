import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Explore from "./components/explore/explore";
import FindingFalcone from "./components/findingFalcone/findingFalcone";
import Home from "./components/home/home";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="findingFalcone" element={<FindingFalcone />} />
      </Routes>
    </div>
  );
}
