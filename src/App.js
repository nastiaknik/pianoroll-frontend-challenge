import { useState } from "react";
import PianoRollContainer from "./components/PianoRollContainer";
import "./App.css";
import logo from "./asserts/white.svg";

const App = () => {
  const [data, setData] = useState(null);

  async function loadPianoRollData() {
    try {
      const response = await fetch("https://pianoroll.ai/random_notes");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
      </nav>

      <h1>Welcome to PianoRoll frontend coding challenge!</h1>

      <div id="buttonContainer">
        <button id="loadCSV" onClick={loadPianoRollData}>
          Load Piano Rolls!
        </button>
      </div>

      {data && <PianoRollContainer data={data} />}
    </>
  );
};

export default App;
