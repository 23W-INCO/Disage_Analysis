// src/App.js
import React from "react";
import Barchart from "./Barchart";
import axios from "axios";
import {
  Routes,
  Route,
  Link,
  Redirect,
  Switch,
  useNavigate,
  Navigate,
} from "react-router-dom";
import MaleChart from "./pages/MaleChart";
import FemaleChart from "./pages/FemaleChart";
import OverallChart from "./pages/OverallChart";
import Home from "./pages/Home"; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/overallChart" element={<OverallChart />}></Route>
        <Route path="/maleChart" element={<MaleChart />}></Route>
        <Route path="/femaleChart" element={<FemaleChart />}></Route>
      </Routes>
    </>
  );
}

export default App;
