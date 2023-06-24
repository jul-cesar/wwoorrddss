import "./App.css";
import { Route, Routes } from "react-router-dom";
import Words from "./Components/Words";
import About from "./Components/About";

function App() {



  return (
    <Routes>
 
      <Route path="/" element={<Words />} />
      <Route path="/about" element={<About/>} />
    </Routes>
  );
}

export default App;
